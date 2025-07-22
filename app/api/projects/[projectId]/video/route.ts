import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { projectId: string } }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("No autorizado", { status: 401 });
    }

    const body = await req.json();
    const { videoUrl, name } = body;

    if (!videoUrl || !params.projectId) {
      return new NextResponse("Faltan datos", { status: 400 });
    }

    const attachment = await db.researchProjectAttachment.create({
      data: {
        name: name || "Video de YouTube",
        url: videoUrl,
        projectId: params.projectId,
      },
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.error("[RESEARCH_PROJECT_ATTACHMENT_POST]", error);
    return new NextResponse("Error interno", { status: 500 });
  }
}
