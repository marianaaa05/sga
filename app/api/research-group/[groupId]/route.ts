// import { NextResponse } from "next/server";
// import { db } from "@/lib/db";
// import { auth } from "@clerk/nextjs/server";

// export async function PATCH(
//   req: Request,
//   { params }: { params: { groupId: string } }
// ) {
//   const { userId } = await auth();
//   if (!userId) return new NextResponse("Unauthorized", { status: 401 });

//   const body = await req.json();
//   const { name } = body;

//   const group = await db.researchGroup.update({
//     where: { id: params.groupId },
//     data: { name },
//   });

//   return NextResponse.json(group);
// }


import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ groupId: string }> }
) {
  try {
    const { userId } = await auth();
    const { groupId } = await params;
    const values = await request.json();

    // Validar autenticación
    if (!userId) {
      return new NextResponse("No se ha autenticado el usuario", {
        status: 401,
      });
    }

    // Validar ID del grupo
    if (!groupId) {
      return new NextResponse("El ID del grupo no es válido", {
        status: 400,
      });
    }

    // Validar datos de entrada
    if (!values || Object.keys(values).length === 0) {
      return new NextResponse("Los datos proporcionados no son válidos", {
        status: 400,
      });
    }

    // Campos válidos para actualizar
    const allowedFields = ["name", "description"];
    const data = Object.fromEntries(
      Object.entries(values).filter(([key]) => allowedFields.includes(key))
    );

    // Logs para depurar
    console.log("PATCH groupId: ", groupId);
    console.log("PATCH values recibidos: ", values);
    console.log("PATCH data filtrada: ", data);

    // Ejecutar actualización
    const group = await db.researchGroup.update({
      where: { id: groupId },
      data,
    });

    return NextResponse.json(group);
  } catch (error: unknown) {
    console.error("[RESEARCH GROUP PATCH ERROR]", error);
    return new NextResponse("Error al actualizar el grupo de investigación", {
      status: 500,
    });
  }
}
