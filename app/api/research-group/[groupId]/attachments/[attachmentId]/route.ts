import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function extractParams(pathname: string) {
  // ["", "api", "research-group", "<groupId>", "attachments", "<attachmentId>"]
  const parts = pathname.split("/");
  return {
    groupId: parts[3],
    attachmentId: parts[5],
  };
}

export async function DELETE(request: NextRequest) {
  try {
    const { attachmentId } = extractParams(new URL(request.url).pathname);

    if (!attachmentId) {
      return new NextResponse("Parámetros inválidos", { status: 400 });
    }

    await db.researchGroupAttachment.delete({
      where: { id: attachmentId },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[RESEARCH_GROUP_ATTACHMENT_DELETE]", error);
    return new NextResponse("Error al eliminar", { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { groupId, attachmentId } = extractParams(
      new URL(request.url).pathname
    );

    if (!groupId || !attachmentId) {
      return new NextResponse("Parámetros inválidos", { status: 400 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    if (!file) {
      return new NextResponse("Archivo requerido", { status: 400 });
    }

    // 1️⃣ Buscar el attachment actual
    const existing = await db.researchGroupAttachment.findUnique({
      where: { id: attachmentId },
    });
    if (!existing) {
      return new NextResponse("Archivo no encontrado", { status: 404 });
    }

    // 2️⃣ Eliminar archivo antiguo de Supabase (si existe)
    const oldPath = existing.url.split(
      "/storage/v1/object/public/attachments/"
    )[1];
    if (oldPath) {
      const { error: deleteError } = await supabase.storage
        .from("attachments")
        .remove([oldPath]);
      if (deleteError) {
        console.warn(
          "[Supabase] no se pudo eliminar archivo anterior:",
          deleteError.message
        );
      }
    }

    // 3️⃣ Subir nuevo archivo
    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = file.name.split(".").pop();
    const fileName = `${uuidv4()}.${ext}`;
    const uploadPath = `research-groups/${groupId}/${fileName}`;
    const { data, error: uploadError } = await supabase.storage
      .from("attachments")
      .upload(uploadPath, buffer, {
        contentType: file.type,
        upsert: true,
      });
    if (uploadError) {
      console.error("[Supabase] error al subir archivo:", uploadError);
      return new NextResponse("Error al subir archivo", { status: 500 });
    }

    const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/attachments/${data.path}`;

    // 4️⃣ Actualizar en base de datos
    const updated = await db.researchGroupAttachment.update({
      where: { id: attachmentId },
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
