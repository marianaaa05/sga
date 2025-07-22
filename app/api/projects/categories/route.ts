import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const { name } = await req.json();

    if (!userId) {
      return new NextResponse("No autorizado", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Nombre de la categoría requerido", { status: 400 });
    }

    const newCategory = await db.category.create({
      data: { name },
    });

    return NextResponse.json(newCategory);
  } catch (error) {
    console.log("[PROJECT_CATEGORY_POST]", error);
    return new NextResponse("Error interno", { status: 500 });
  }
}
