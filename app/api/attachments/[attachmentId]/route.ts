import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ attachmentId: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) return new NextResponse("No autorizado", { status: 401 });

    const { attachmentId } = await params;

    const attachment = await db.attachment.findUnique({
      where: { id: attachmentId },
    });

    if (!attachment) {
      return new NextResponse("Archivo no encontrado", { status: 404 });
    }

    const pathInStorage = attachment.url.split("/attachments/")[1];

    const { error: storageError } = await supabase.storage
      .from("attachments")
      .remove([pathInStorage]);

    if (storageError) {
      console.error("Error al eliminar de Supabase:", storageError);
      return new NextResponse("Error al eliminar archivo en Supabase", {
        status: 500,
      });
    }

    await db.attachment.delete({ where: { id: attachmentId } });

    return new NextResponse("Archivo eliminado correctamente", { status: 200 });
  } catch (error) {
    console.error("[DELETE_ATTACHMENT_ERROR]", error);
    return new NextResponse("Error al eliminar archivo", { status: 500 });
  }
}


export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ attachmentId: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("No autorizado", { status: 401 });
    }

    const { attachmentId } = await params;

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) {
      return new NextResponse("Archivo no proporcionado", { status: 400 });
    }

    const attachment = await db.attachment.findUnique({
      where: { id: attachmentId },
    });
    if (!attachment) {
      return new NextResponse("Archivo no encontrado", { status: 404 });
    }

    const extMatch = file.name.match(/\.[^.\s]+$/);
    const extension = extMatch ? extMatch[0] : ""; 
    const safeKey = `${crypto.randomUUID()}${extension}`;
    const filePath = `${attachment.courseId}/${safeKey}`; 

    const buffer = Buffer.from(await file.arrayBuffer());
    const { error: uploadError } = await supabase.storage
      .from("attachments")
      .upload(filePath, buffer, {
        contentType: file.type || undefined,
        upsert: true,
      });

    if (uploadError) {
      console.error("[SUPABASE_UPLOAD_ERROR]", uploadError);
      return new NextResponse(
        `Error al subir el nuevo archivo: ${uploadError.message}`,
        { status: 500 }
      );
    }

    const oldPath = attachment.url.split("/attachments/")[1];
    if (oldPath) {
      await supabase.storage.from("attachments").remove([oldPath]);
    }

    const { data: publicData } = supabase.storage
      .from("attachments")
      .getPublicUrl(filePath);

    const cleanedOriginalName = file.name.replace(/[\u0000-\u001F\u007F]/g, "");

    const updatedAttachment = await db.attachment.update({
      where: { id: attachmentId },
      data: {
        name: cleanedOriginalName,
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
