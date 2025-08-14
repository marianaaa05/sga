import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { projectId: string } }
) {
  try {
    const { userId } = await auth();
    const { projectId } = params;
    const values = await request.json();

    if (!userId) return new NextResponse("No auth", { status: 401 });
    if (!projectId) return new NextResponse("projectId inválido", { status: 400 });
    if (!values || Object.keys(values).length === 0) {
      return new NextResponse("Body vacío", { status: 400 });
    }

    const allowedFields = ["title", "description", "isPublished", "categoryId"];
    const data = Object.fromEntries(
      Object.entries(values).filter(([k]) => allowedFields.includes(k))
    );

    console.log("PATCH /api/projects/:projectId", { projectId, data });

    const project = await db.researchProject.update({
      where: { id: projectId },
      data,
    });

    return NextResponse.json(project);
  } catch (err) {
    console.error("[PROJECT PATCH ERROR]", err);
    return new NextResponse("Error interno", { status: 500 });
  }
}
