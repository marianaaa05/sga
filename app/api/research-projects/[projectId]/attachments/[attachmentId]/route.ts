import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createClient } from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";

const supabase = createClient();

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string; attachmentId: string }> }
) {
  try {
    const { userId } = await auth();
    const { projectId, attachmentId } = await params;
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!userId) {
      return new NextResponse("No autorizado", { status: 401 });
    }

    if (!projectId || !attachmentId) {
      return new NextResponse("ID de proyecto o adjunto no válido", { status: 400 });
    }

    if (!file) {
      return new NextResponse("Archivo requerido", { status: 400 });
    }

    const existing = await db.researchProjectAttachment.findUnique({
      where: { id: attachmentId },
    });
    if (!existing) {
      return new NextResponse("Adjunto no encontrado", { status: 404 });
    }

    const previousPath = existing.url.split(
      "/storage/v1/object/public/attachments/"
    )[1];
    if (previousPath) {
      await supabase.storage.from("attachments").remove([previousPath]);
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = file.name.split(".").pop();
    const newFileName = `${uuidv4()}.${ext}`;
    const uploadPath = `projects/${projectId}/${newFileName}`;

    const { data, error } = await supabase.storage
      .from("attachments")
      .upload(uploadPath, buffer, { contentType: file.type });

    if (error || !data?.path) {
      console.error("[SUPABASE UPLOAD ERROR]", error);
      return new NextResponse("Error al subir archivo", { status: 500 });
    }

    const { data: urlData } = supabase.storage
      .from("attachments")
      .getPublicUrl(data.path);

    const updated = await db.researchProjectAttachment.update({
      where: { id: attachmentId },
      data: { 
        name: file.name, 
        url: urlData.publicUrl,
        userId,
       },
    });

    return NextResponse.json(updated);
  } catch (error: unknown) {
    console.error("[PROJECT_ATTACHMENT_PATCH]", error);
    return new NextResponse("Error interno del servidor", { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string; attachmentId: string }> }
) {
  try {
    const { userId } = await auth();
    const { projectId, attachmentId } = await params;

    if (!userId) {
      return new NextResponse("No autorizado", { status: 401 });
    }

    if (!projectId || !attachmentId) {
      return new NextResponse("Parámetros inválidos", { status: 400 });
    }

    const attachment = await db.researchProjectAttachment.findUnique({
      where: { id: attachmentId },
    });
    if (!attachment) {
      return new NextResponse("Adjunto no encontrado", { status: 404 });
    }

    const path = attachment.url.split(
      "/storage/v1/object/public/attachments/"
    )[1];
    if (path) {
      const { error: supabaseError } = await supabase.storage
        .from("attachments")
        .remove([path]);
      if (supabaseError) {
        console.error(
          "[SUPABASE DELETE ERROR]",
          supabaseError.message
        );
        return new NextResponse("Error al eliminar archivo en Supabase", { status: 500 });
      }
    }

    await db.researchProjectAttachment.delete({
      where: { id: attachmentId },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error: unknown) {
    console.error("[PROJECT_ATTACHMENT_DELETE]", error);
    return new NextResponse("Error interno del servidor", { status: 500 });
  }
}

