// app/api/research-group/[groupId]/attachments/route.ts
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function GET(
  req: Request,
  { params }: { params: { groupId: string } }
) {
  try {
    const { groupId } = params;

    const attachments = await db.attachment.findMany({
      where: { researchGroupId: groupId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(attachments);
  } catch (error) {
    console.error("[GET_RESEARCH_GROUP_ATTACHMENTS_ERROR]", error);
    return new NextResponse("Error al obtener archivos", { status: 500 });
  }
}


export async function PATCH(
  req: Request,
  { params }: { params: { groupId: string } }
) {
  const { userId } = await auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const body = await req.json();
    const { name, description, imageUrl } = body;

    const updated = await db.researchGroup.update({
      where: { id: params.groupId },
      data: {
        ...(name && { name }),
        ...(description && { description }),
        ...(imageUrl && { imageUrl }),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("[RESEARCH_GROUP_PATCH]", error);
    return new NextResponse("Error al actualizar semillero", { status: 500 });
  }
}