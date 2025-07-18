import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Eliminar archivo
export async function DELETE(
  req: Request,
  context: { params: { attachmentId: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) return new NextResponse("No autorizado", { status: 401 });

    const { attachmentId } = context.params;

    const attachment = await db.attachment.findUnique({
      where: { id: attachmentId },
    });

    if (!attachment) return new NextResponse("Archivo no encontrado", { status: 404 });

    const pathInStorage = attachment.url.split("/attachments/")[1];

    const { error: storageError } = await supabase.storage
      .from("attachments")
      .remove([pathInStorage]);

    if (storageError) {
      console.error("Error al eliminar de Supabase:", storageError);
      return new NextResponse("Error al eliminar archivo en Supabase", { status: 500 });
    }

    await db.attachment.delete({ where: { id: attachmentId } });

    return new NextResponse("Archivo eliminado correctamente", { status: 200 });
  } catch (error) {
    console.error("[DELETE_ATTACHMENT_ERROR]", error);
    return new NextResponse("Error al eliminar archivo", { status: 500 });
  }
}

// Reemplazar archivo
export async function PATCH(
  req: Request,
  context: { params: { attachmentId: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) return new NextResponse("No autorizado", { status: 401 });

    const { attachmentId } = context.params;

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) return new NextResponse("Archivo no proporcionado", { status: 400 });

    const attachment = await db.attachment.findUnique({
      where: { id: attachmentId },
    });

    if (!attachment) return new NextResponse("Archivo no encontrado", { status: 404 });

    const buffer = Buffer.from(await file.arrayBuffer());
    const newName = `${crypto.randomUUID()}-${file.name}`;

    // ✅ Usa carpeta según el origen del archivo
    const folder =
      attachment.courseId ??
      attachment.researchGroupId ??
      "generales";

    const newPath = `${folder}/${newName}`;

    const { error: uploadError } = await supabase.storage
      .from("attachments")
      .upload(newPath, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (uploadError) {
      console.error("Error al subir nuevo archivo:", uploadError);
      return new NextResponse("Error al subir el nuevo archivo", { status: 500 });
    }

    // ✅ Elimina el archivo anterior
    const oldPath = attachment.url.split("/attachments/")[1];
    if (oldPath) {
      await supabase.storage.from("attachments").remove([oldPath]);
    }

    const { data: publicData } = supabase.storage
      .from("attachments")
      .getPublicUrl(newPath);

    const updatedAttachment = await db.attachment.update({
      where: { id: attachmentId },
      data: {
        name: file.name,
        url: publicData.publicUrl,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(updatedAttachment);
  } catch (error) {
    console.error("[PATCH_ATTACHMENT_ERROR]", error);
    return new NextResponse("Error al actualizar el archivo", { status: 500 });
  }
}


export async function POST(
  req: Request,
  { params }: { params: { groupId: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) return new NextResponse("No autorizado", { status: 401 });

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return new NextResponse("Archivo no proporcionado", { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const uniqueName = `${crypto.randomUUID()}-${file.name}`;
    const filePath = `${params.groupId}/${uniqueName}`;

    const { error: uploadError } = await supabase.storage
      .from("attachments")
      .upload(filePath, buffer, {
        contentType: file.type,
      });

    if (uploadError) {
      console.error("Error al subir archivo:", uploadError);
      return new NextResponse("Error al subir archivo", { status: 500 });
    }

    const { data } = supabase.storage
      .from("attachments")
      .getPublicUrl(filePath);

    const attachment = await db.attachment.create({
      data: {
        name: file.name,
        url: data.publicUrl,
        researchGroupId: params.groupId,
      },
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.error("[ATTACHMENTS_POST]", error);
    return new NextResponse("Error al subir archivo", { status: 500 });
  }
}
