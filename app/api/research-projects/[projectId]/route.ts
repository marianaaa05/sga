// import { auth } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";
// import { db } from "@/lib/db";

// export async function PATCH(
//   req: Request,
//   { params }: { params: { projectId: string } }
// ) {
//   try {
//     const { userId } = await auth(); 
//     const { projectId } = params;
//     const values = await req.json(); 

//     if (!userId) {
//       return new NextResponse("No autorizado", { status: 401 });
//     }

//     if (!projectId) {
//       return new NextResponse("ID del proyecto requerido", { status: 400 });
//     }

//     const updatedProject = await db.researchProject.update({
//       where: { id: projectId },
//       data: { ...values },
//     });

//     return NextResponse.json(updatedProject);
//   } catch (error) {
//     console.log("[PROJECT_PATCH]", error);
//     return new NextResponse("Error interno", { status: 500 });
//   }
// }



import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    // 1. Resolver parámetros y autenticación
    const { projectId } = await params;
    const { userId } = await auth();
    
    if (!userId) {
      return new NextResponse("No autorizado", { status: 401 });
    }

    if (!projectId) {
      return new NextResponse("ID del proyecto requerido", { status: 400 });
    }

    // 2. Procesar y validar datos de entrada
    const rawData = await req.json();
    if (!rawData || typeof rawData !== "object") {
      return new NextResponse("Datos inválidos", { status: 400 });
    }

    // 3. Definir campos permitidos (ajusta según tu modelo Prisma)
    const allowedFields = [
      "title",
      "description",
      "categoryId",
      "isPublished",
      "imageUrl"
    ];

    // 4. Filtrar campos permitidos
    const updateData: Record<string, unknown> = {};
    Object.keys(rawData).forEach(key => {
      if (allowedFields.includes(key)) {
        updateData[key] = rawData[key];
      }
    });

    if (Object.keys(updateData).length === 0) {
      return new NextResponse("No hay campos válidos para actualizar", { 
        status: 400 
      });
    }

    // 5. Ejecutar actualización
    const updatedProject = await db.researchProject.update({
      where: { id: projectId },
      data: updateData,
    });

    return NextResponse.json(updatedProject);

  } catch (error) {
    console.error("[PROJECT_PATCH_ERROR]", error);
    return new NextResponse("Error interno", { status: 500 });
  }
}