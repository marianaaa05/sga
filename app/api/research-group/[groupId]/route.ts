import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function PATCH(
  req: Request,
  { params }: { params: { groupId: string } }
) {
  const { userId } = await auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  const body = await req.json();
  const { name } = body;

  const group = await db.researchGroup.update({
    where: { id: params.groupId },
    data: { name },
  });

  return NextResponse.json(group);
}
