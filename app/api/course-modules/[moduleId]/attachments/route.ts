import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createClient } from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";

const supabase = createClient();

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ moduleId: string }> }
): Promise<NextResponse> {
  try {
    const { moduleId } = await params;

    const attachments = await db.courseModuleAttachment.findMany({
      where: { moduleId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(attachments);
  } catch (error) {
    console.error("[MODULE_ATTACHMENTS_GET]", error);
    return new NextResponse("Error al obtener los archivos del módulo", {
      status: 500,
    });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ moduleId: string }> }
): Promise<NextResponse> {
  try {
    const { userId } = await auth();
    const { moduleId } = await params;

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!userId) {
      return new NextResponse("No autorizado", { status: 401 });
    }

    if (!moduleId || !file) {
      return new NextResponse("Parámetros inválidos o archivo requerido", {
        status: 400,
      });
    }

    console.log("[UPLOAD] file recibido:", file);

    const arrayBuffer = await file.arrayBuffer();
    if (arrayBuffer.byteLength === 0) {
      return new NextResponse("Archivo vacío", { status: 400 });
    }

    const buffer = Buffer.from(arrayBuffer);
    const ext = file.name.split(".").pop();
    const fileName = `${uuidv4()}.${ext}`;
    const filePath = `modules/${moduleId}/${fileName}`;

    const { data, error } = await supabase.storage
      .from("attachments")
      .upload(filePath, buffer, {
        contentType: file.type,
      });

    console.log("Subida Supabase:", { data, error });

    if (error || !data?.path) {
      console.error("[SUPABASE UPLOAD ERROR]", error);
      return new NextResponse("Error al subir archivo", { status: 500 });
    }

    const { data: urlData } = supabase.storage
      .from("attachments")
      .getPublicUrl(data.path);

    const exists = await db.courseModule.findUnique({
      where: { id: moduleId },
    });

    if (!exists) {
      return new NextResponse("El módulo no existe", { status: 404 });
    }

    const attachment = await db.courseModuleAttachment.create({
      data: {
        name: file.name,
        url: urlData.publicUrl,
        moduleId,
      },
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.error("[MODULE_ATTACHMENT_POST]", error);
    return new NextResponse("Error al subir archivo", { status: 500 });
  }
}
