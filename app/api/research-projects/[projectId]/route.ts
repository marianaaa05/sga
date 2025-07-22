import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { projectId: string } }
) {
  try {
    const { userId } = await auth(); 
    const { projectId } = params;
    const values = await req.json(); 

    if (!userId) {
      return new NextResponse("No autorizado", { status: 401 });
    }

    if (!projectId) {
      return new NextResponse("ID del proyecto requerido", { status: 400 });
    }

    const updatedProject = await db.researchProject.update({
      where: { id: projectId },
      data: { ...values },
    });

    return NextResponse.json(updatedProject);
  } catch (error) {
    console.log("[PROJECT_PATCH]", error);
    return new NextResponse("Error interno", { status: 500 });
  }
}
