// app/api/research-groups/[groupId]/route.ts

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

interface Params {
  params: { groupId: string };
}

export async function PATCH(req: Request, { params }: Params) {
  try {
    const { userId } = await auth();
    const { groupId } = params;
    const body = await req.json();

    const { name, description, imageUrl } = body;

    if (!userId) {
      return new NextResponse("No autorizado", { status: 401 });
    }

    const updated = await db.researchGroup.update({
      where: { id: groupId },
      data: {
        name,
        description,
        imageUrl,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("[RESEARCH_GROUP_PATCH_ERROR]", error);
    return new NextResponse("Error al actualizar semillero", { status: 500 });
  }
}
