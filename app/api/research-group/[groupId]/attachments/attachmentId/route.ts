// /app/api/research-group/[groupId]/attachments/[attachmentId]/route.ts

import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
  _req: Request,
  {
    params,
  }: {
    params: { groupId: string; attachmentId: string };
  }
) {
  try {
    await db.researchGroupAttachment.delete({
      where: { id: params.attachmentId },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[RESEARCH_GROUP_ATTACHMENT_DELETE]", error);
    return new NextResponse("Error al eliminar", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: { groupId: string; attachmentId: string };
  }
) {
  try {
    const body = await req.json();
    const { name } = body;

    if (!name) return new NextResponse("Nombre requerido", { status: 400 });

    const updated = await db.researchGroupAttachment.update({
      where: { id: params.attachmentId },
      data: { name },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("[RESEARCH_GROUP_ATTACHMENT_PATCH]", error);
    return new NextResponse("Error al actualizar", { status: 500 });
  }
}
