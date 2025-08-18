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

    const { linkUrl } = await request.json();
    if (!linkUrl) {
      return new NextResponse("Debe enviar linkUrl", { status: 400 });
    }

    const attachment = await db.courseModuleAttachment.create({
      data: {
        name: `Enlace externo`,
        url: linkUrl,
        moduleId,
      },
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.error("[MODULE_LINK_ATTACHMENT_POST]", error);
    return new NextResponse("Error interno", { status: 500 });
  }
}
