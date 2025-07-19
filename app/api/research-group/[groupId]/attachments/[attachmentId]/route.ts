import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function DELETE(
  _req: Request,
  {
    params,
  }: {
    params: { groupId: string; attachmentId: string };
  }
) {
  try {
    await db.researchGroupAttachment.delete({
      where: { id: params.attachmentId },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[RESEARCH_GROUP_ATTACHMENT_DELETE]", error);
    return new NextResponse("Error al eliminar", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { groupId: string; attachmentId: string } }
) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) return new NextResponse("Archivo requerido", { status: 400 });

    // 1. Buscar el attachment actual
    const existing = await db.researchGroupAttachment.findUnique({
      where: { id: params.attachmentId },
    });

    if (!existing) {
      return new NextResponse("Archivo no encontrado", { status: 404 });
    }

    // 2. Eliminar archivo antiguo de Supabase (si existe)
    const oldPath = existing.url.split("/storage/v1/object/public/attachments/")[1];

    if (oldPath) {
      const { error: deleteError } = await supabase.storage
        .from("attachments")
        .remove([oldPath]);

      if (deleteError) {
        console.warn("No se pudo eliminar archivo anterior:", deleteError.message);
      }
    }

    // 3. Subir nuevo archivo
    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = file.name.split(".").pop();
    const fileName = `${uuidv4()}.${ext}`;
    const uploadPath = `research-groups/${params.groupId}/${fileName}`;

    const { data, error } = await supabase.storage
      .from("attachments")
      .upload(uploadPath, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (error) {
      console.error("Error al subir a Supabase", error);
      return new NextResponse("Error al subir archivo", { status: 500 });
    }

    const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/attachments/${data.path}`;

    // 4. Actualizar en base de datos
    const updated = await db.researchGroupAttachment.update({
      where: { id: params.attachmentId },
      data: {
        name: file.name,
        url,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("[RESEARCH_GROUP_ATTACHMENT_PATCH]", error);
    return new NextResponse("Error al actualizar", { status: 500 });
  }
}