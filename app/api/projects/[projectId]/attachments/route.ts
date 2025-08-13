import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { v4 as uuidv4 } from "uuid";
import { createClient } from "@/lib/supabase";

const supabase = createClient();

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const { userId } = await auth();
    const { projectId } = await params;

    if (!userId) {
      return new NextResponse("No se ha autenticado el usuario", { status: 401 });
    }

    if (!projectId) {
      return new NextResponse("Falta el ID del proyecto", { status: 400 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return new NextResponse("No se proporcionó ningún archivo", { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileExtension = file.name.split(".").pop();
    const fileName = `${uuidv4()}.${fileExtension}`;

    const { data, error } = await supabase.storage
      .from("attachments")
      .upload(`projects/${projectId}/${fileName}`, buffer, {
        contentType: file.type,
      });

    if (error) {
      console.error("[SUPABASE UPLOAD ERROR]", error.message);
      return new NextResponse("Error al subir archivo a Supabase", { status: 500 });
    }

    const urlResponse = supabase.storage
      .from("attachments")
      .getPublicUrl(data.path);

    const attachment = await db.researchProjectAttachment.create({
      data: {
        name: file.name,
        url: urlResponse.data.publicUrl,
        projectId,
      },
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.error("[PROJECT_ATTACHMENT_POST]", error);
    return new NextResponse("Error interno del servidor", { status: 500 });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await params;

    if (!projectId) {
      return new NextResponse("Falta el ID del proyecto", { status: 400 });
    }

    const attachments = await db.researchProjectAttachment.findMany({
      where: { projectId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(attachments);
  } catch (error) {
    console.error("[GET_PROJECT_ATTACHMENTS]", error);
    return new NextResponse("Error al obtener archivos", { status: 500 });
  }
}
