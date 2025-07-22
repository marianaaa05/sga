import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { userId } = await auth(); 
    const { title, groupId } = await req.json();

    if (!userId) {
      return new NextResponse("No autorizado", { status: 401 });
    }

    if (!title || !groupId) {
      return new NextResponse("Faltan datos obligatorios", { status: 400 });
    }

    const defaultCategory = await db.category.findFirst();

    if (!defaultCategory) {
      return new NextResponse("No hay categorías disponibles", { status: 400 });
    }

    const newProject = await db.researchProject.create({
      data: {
        title,
        researchGroupId: groupId,
        categoryId: defaultCategory.id,
        createdBy: userId,
      },
    });

    return NextResponse.json(newProject);
  } catch (error) {
    console.log("[RESEARCH_PROJECT_CREATE]", error);
    return new NextResponse("Error interno del servidor", { status: 500 });
  }
}
