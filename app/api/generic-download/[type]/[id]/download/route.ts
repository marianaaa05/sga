import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createClient } from "@/lib/supabase";

const supabase = createClient();

export async function GET(
  req: Request,
  { params }: { params: Promise<{ type: string; id: string }> }
) {
  try {
    const { type, id } = await params;

    if (!type || !id) {
      return new NextResponse("Tipo o ID faltante", { status: 400 });
    }

    let attachment: { name: string; url: string } | null = null;

    switch (type) {
      case "course":
        attachment = await db.attachment.findUnique({ 
          where: { id } 
        });
        break;
      case "module":
        attachment = await db.courseModuleAttachment.findUnique({
          where: { id },
        });
        break;
      case "group":
        attachment = await db.researchGroupAttachment.findUnique({
          where: { id },
        });
        break;
      case "project":
        attachment = await db.researchProjectAttachment.findUnique({
          where: { id },
        });
        break;
      default:
        return new NextResponse("Tipo de attachment inválido", { status: 400 });
    }

    if (!attachment) {
      return new NextResponse("Archivo no encontrado", { status: 404 });
    }

    if (!attachment.url.includes("/storage/v1/object/public/attachments/")) {
      return NextResponse.redirect(attachment.url);
    }

    const path = attachment.url.split(
      "/storage/v1/object/public/attachments/"
    )[1];

    if (!path) {
      return new NextResponse("Ruta de archivo inválida", { status: 500 });
    }

    const { data, error } = await supabase.storage
      .from("attachments")
      .download(path);

    if (error || !data) {
      console.error("[SUPABASE_DOWNLOAD_ERROR]", error?.message);
      return new NextResponse("Error al descargar archivo", { status: 500 });
    }

    const buffer = await data.arrayBuffer();

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": data.type || "application/octet-stream",
        "Content-Disposition": `attachment; filename="${attachment.name}"`,
      },
    });
  } catch (error) {
    console.error("[ATTACHMENT_DOWNLOAD]", error);
    return new NextResponse("Error interno del servidor", { status: 500 });
  }
}
