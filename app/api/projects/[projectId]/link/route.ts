import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("No autorizado", { status: 401 });
    }

    const url = new URL(request.url);
    const segments = url.pathname.split("/"); 
    const projectId = segments.at(-2);
    if (!projectId) {
      return new NextResponse("ID de proyecto inválido", { status: 400 });
    }

    const { linkUrl } = await request.json();
    if (!linkUrl) {
      return new NextResponse("Debe enviar linkUrl", { status: 400 });
    }

    const attachment = await db.researchProjectAttachment.create({
      data: {
        name:`Enlace externo`,
        url: linkUrl,
        projectId,
        userId,
      },
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.error("[RESEARCH_PROJECT_LINK_POST]", error);
    return new NextResponse("Error interno", { status: 500 });
  }
}
