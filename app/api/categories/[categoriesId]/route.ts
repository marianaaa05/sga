import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ categoryId: string }> }
) {
  try {
    const { userId } = await auth();
    const { categoryId } = await params;
    const body = await request.json();

    if (!userId) {
      return new NextResponse("No se ha autenticado el usuario", { status: 401 });
    }

    if (!categoryId) {
      return new NextResponse("El ID de la categoría no es válido", { status: 400 });
    }

    if (!body || typeof body.name !== "string" || !body.name.trim()) {
      return new NextResponse("Nombre de categoría inválido", { status: 400 });
    }

    const updated = await db.category.update({
      where: { id: categoryId },
      data: { name: body.name },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("[CATEGORY_PATCH_ERROR]", error);
    return new NextResponse("Error al actualizar la categoría", { status: 500 });
  }
}


// export async function PATCH(
//   req: Request,
//   context: { params: { categoryId: string } }
// ) {
//   try {
//     const { userId } = await auth();
//     const { categoryId } = context.params;
//     const body = await req.json();

//     if (!userId) {
//       return new NextResponse("No autorizado", { status: 401 });
//     }

//     const name = body.name?.trim();

//     if (!name) {
//       return new NextResponse("Nombre de categoría inválido", { status: 400 });
//     }

//     const existingCategory = await db.category.findUnique({
//       where: { id: categoryId },
//     });

//     if (!existingCategory) {
//       return new NextResponse("Categoría no encontrada", { status: 404 });
//     }

//     const updated = await db.category.update({
//       where: { id: categoryId },
//       data: { name },
//       select: { id: true, name: true },
//     });

//     return NextResponse.json(updated);
//   } catch (error) {
//     console.error("[CATEGORY_PATCH_ERROR]", error);
//     return new NextResponse("Error al actualizar categoría", { status: 500 });
//   }
// }

