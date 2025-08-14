import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createClient } from "@/lib/supabase";

const supabase = createClient();

function asciiFallbackName(name: string) {
  return name
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "") // quita acentos
    .replace(/[^\x20-\x7E]/g, "") // quita no-ascii
    .replace(/["'\\\/]/g, "") // quita comillas y barras
    .replace(/\s+/g, "_")
    .slice(0, 200) || "file";
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ type: string; id: string }> }
) {
  try {
    const { type, id } = await params;

    if (!type || !id) {
      return new NextResponse("Tipo o ID faltante", { status: 400 });
    }

    let attachmentRecord:
      | { name: string; url: string }
      | null = null;

    switch (type) {
      case "course":
        attachmentRecord = await db.attachment.findUnique({ where: { id } });
        break;
      case "module":
        attachmentRecord = await db.courseModuleAttachment.findUnique({
          where: { id },
        });
        break;
      case "group":
        attachmentRecord = await db.researchGroupAttachment.findUnique({
          where: { id },
        });
        break;
      case "project":
        attachmentRecord = await db.researchProjectAttachment.findUnique({
          where: { id },
        });
        break;
      default:
        return new NextResponse("Tipo de attachment inválido", { status: 400 });
    }

    if (!attachmentRecord) {
      return new NextResponse("Archivo no encontrado", { status: 404 });
    }

    const { name: originalName, url: attachmentUrl } = attachmentRecord;

    if (!attachmentUrl.includes("/storage/v1/object/public/attachments/")) {
      return NextResponse.redirect(attachmentUrl);
    }

    const splitToken = "/storage/v1/object/public/attachments/";
    const idx = attachmentUrl.indexOf(splitToken);
    if (idx === -1) {
      return new NextResponse("Ruta de archivo inválida", { status: 500 });
    }

    let path = attachmentUrl.slice(idx + splitToken.length);

    try {
      path = decodeURIComponent(path);
    } catch (e) {
      console.warn("[DECODE_PATH_FAILED]", e);
    }

    if (!path) {
      return new NextResponse("Ruta de archivo inválida", { status: 500 });
    }

    const { data, error } = await supabase.storage
      .from("attachments")
      .download(path);

    if (error || !data) {
      console.error("[SUPABASE_DOWNLOAD_ERROR]", error);
      return new NextResponse("Error al descargar archivo", { status: 500 });
    }

    const buffer = await data.arrayBuffer();

    const fallback = asciiFallbackName(originalName);
    const filenameStar = encodeURIComponent(originalName);

    const disposition = `attachment; filename="${fallback}"; filename*=UTF-8''${filenameStar}`;

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": data.type || "application/octet-stream",
        "Content-Disposition": disposition,
      },
    });
  } catch (error) {
    console.error("[ATTACHMENT_DOWNLOAD]", error);
    return new NextResponse("Error interno del servidor", { status: 500 });
  }
}
