import { auth } from "@clerk/nextjs/server"; 
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: { params: Promise<{ moduleId: string }> }) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("No autorizado", { status: 401 });
    }

    const { moduleId } = await params;
    if (!moduleId) {
      return new NextResponse("ID de módulo inválido", { status: 400 });
    }

    const { videoUrl, name } = await request.json();
    if (!videoUrl) {
      return new NextResponse("Debe enviar videoUrl", { status: 400 });
    }

    const attachment = await db.courseModuleAttachment.create({
      data: {
        name: name?.trim() || "Video de YouTube",
        url: videoUrl.trim(),
        moduleId,
      },
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.error("[MODULE_VIDEO_ATTACHMENT_POST]", error);
    return new NextResponse("Error interno", { status: 500 });
  }
}
