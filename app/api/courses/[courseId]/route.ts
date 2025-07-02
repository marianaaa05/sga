import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = await auth();
    const { courseId } = params;
    const values = await req.json();

    // Validar que el usuario esté autenticado
    if (!userId) {
      return new NextResponse("No se ha autenticado el usuario", {
        status: 401,
      });
    }
    // verifica que el ID del curso sea válido
    if (!courseId) {
      return new NextResponse("El ID del curso no es válido", {
        status: 400,
      });
    }

    // verifica si se envian datos válidos
    if (!values || Object.keys(values).length === 0) {
      return new NextResponse("Los datos proporcionados no son válidos", {
        status: 400,
      });
    }

    // filtra los campos validos que se pueden actualizar
    const allowedFields = ["title", "description", "imageUrl", "isPublished", "categoryId"];
    const data = Object.fromEntries(
      Object.entries(values).filter(([key]) => allowedFields.includes(key))
      );

      // log para depurar
      console.log("PATCH courseId: ", courseId);
      console.log("PATCH values recibidos: ", values);
      console.log("PATCH data filtrada: ", data);

      //ejecuta la actualizacion
      const course = await db.course.update({
        where: { id: courseId },
        data,
      });

      return NextResponse.json(course);
    } catch (error: unknown) {
    console.error("[COURSES PATCH ERROR]", error);
    return new NextResponse("Error al actualizar el curso", {
      status: 500,
      });
    }

  }