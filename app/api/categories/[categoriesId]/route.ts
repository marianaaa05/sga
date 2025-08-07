import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server"; //🆗

export async function PATCH(request: NextRequest, 
  {params} : {params : Promise<{ categoryId: string }>}) {
  try {
    const { userId } = await auth();
    const { categoryId } = await params;
    const values = await request.json();

    if (!userId) {
      return new NextResponse("No se ha autenticado el usuario", 
        { status: 401 });
    }

    if (!categoryId) {
      return new NextResponse("El ID de la categoría no es válido", 
        { status: 400 });
    }

    if (!values || typeof values.name !== "string" || !values.name.trim()) {
      return new NextResponse("Nombre de categoría inválido", 
        { status: 400 });
    }

    const allowedFields = [
      "name"
    ];

    const data = Object.fromEntries(
      Object.entries(values).filter(([key]) => allowedFields.includes(key))
    );

    const category = await db.category.update({
      where: { id: categoryId },
      data,
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error("[CATEGORY_PATCH_ERROR]", error);
    return new NextResponse("Error al actualizar la categoría", { status: 500 });
  }
}


