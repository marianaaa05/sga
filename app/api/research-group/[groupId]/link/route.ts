import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ groupId: string }> }
) {
  try {
    const { userId } = await auth();
    const { groupId } = await params;

    if (!userId) {
      return new NextResponse("No autorizado", { status: 401 });
    }

    const body = await request.json();
    const { linkUrl } = body;

    if (!groupId) {
      return new NextResponse("ID del grupo no válido", { status: 400 });
    }

    const attachment = await db.researchGroupAttachment.create({
      data: {
        name: `Enlace externo`,
        url: linkUrl,
        researchGroupId: groupId,
      },
    });

    return NextResponse.json(attachment);
  } catch (error: unknown) {
    console.error("[RESEARCH_GROUP_ATTACHMENT_POST]", error);
    return new NextResponse("Error al crear el archivo adjunto", {
      status: 500,
    });
  }
}

