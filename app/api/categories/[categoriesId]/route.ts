// app/api/categories/[categoriesId]/route.ts
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  try {
    // 1) Autenticación
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("No autenticado", { status: 401 });
    }

    // 2) Extraer el ID desde la URL
    const url = new URL(request.url);
    const segments = url.pathname.split("/"); 
    const categoryId = segments.at(-1); // último segmento

    if (!categoryId) {
      return new NextResponse("ID de categoría inválido", { status: 400 });
    }

    // 3) Validar body
    const values = await request.json();
    if (
      !values ||
      typeof values.name !== "string" ||
      !values.name.trim()
    ) {
      return new NextResponse("Nombre inválido", { status: 400 });
    }

    // 4) Filtrar campos permitidos
    const data = { name: values.name.trim() };

    // 5) Actualizar en la BD
    const category = await db.category.update({
      where: { id: categoryId },
      data,
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error("[CATEGORY_PATCH_ERROR]", error);
    return new NextResponse("Error interno", { status: 500 });
  }
}


// import { db } from "@/lib/db";
// import { auth } from "@clerk/nextjs/server";
// import { NextRequest, NextResponse } from "next/server";

// export async function PATCH(
//   request: NextRequest,
//   { params }: { params: Promise<{ categoryId: string }> }) {
//   try {
//     const { userId } = await auth();
//     const { categoryId } = await params;
//     const values = await request.json();

//     if (!userId) {
//       return new NextResponse("No se ha autenticado el usuario", 
//         { status: 401 });
//     }

//     if (!categoryId) {
//       return new NextResponse("El ID de la categoría no es válido", 
//         { status: 400 });
//     }

//     if (!values || typeof values.name !== "string" || !values.name.trim()) {
//       return new NextResponse("Nombre de categoría inválido", 
//         { status: 400 });
//     }

//     const allowedFields = [
//       "name"
//     ];

//     const data = Object.fromEntries(
//       Object.entries(values).filter(([key]) => allowedFields.includes(key))
//     );

//     const category = await db.category.update({
//       where: { id: categoryId },
//       data,
//     });

//     return NextResponse.json(category);
//   } catch (error) {
//     console.error("[CATEGORY_PATCH_ERROR]", error);
//     return new NextResponse("Error al actualizar la categoría", { status: 500 });
//   }
// }


//    export async function PATCH(
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

