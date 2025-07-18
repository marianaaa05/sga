import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { groupId: string } }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("No autorizado", { status: 401 });
    }

    const body = await req.json();
    const { videoUrl, name } = body;

    if (!videoUrl || !params.groupId) {
      return new NextResponse("Faltan datos", { status: 400 });
    }

    const attachment = await db.researchGroupAttachment.create({
      data: {
        name: name || "Video de YouTube",
        url: videoUrl,
        researchGroupId: params.groupId,
      },
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.error("[RESEARCH_GROUP_ATTACHMENT_POST]", error);
    return new NextResponse("Error interno", { status: 500 });
  }
}
