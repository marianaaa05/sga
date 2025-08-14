import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

function isPrismaError(err: unknown): err is Prisma.PrismaClientKnownRequestError {
  return (
    typeof err === "object" &&
    err !== null &&
    "code" in err &&
    typeof (err).code === "string"
  );
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { categoryId: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) return new NextResponse("No autenticado", { status: 401 });

    const { categoryId } = params;
    if (!categoryId) return new NextResponse("categoryId faltante", { status: 400 });

    const body = await request.json();
    const name = (body?.name || "").toString().trim();

    if (!name) return new NextResponse("El nombre de la categoría es obligatorio", { status: 400 });

    const existing = await db.category.findUnique({ where: { id: categoryId } });
    if (!existing) return new NextResponse("Categoría no encontrada", { status: 404 });

    try {
      const updated = await db.category.update({
        where: { id: categoryId },
        data: { name },
      });

      return NextResponse.json(updated);
    } catch (err: unknown) {
      if (isPrismaError(err) && err.code === "P2002") {
        return new NextResponse("Ya existe una categoría con ese nombre", { status: 409 });
      }
      console.error("[CATEGORY PATCH ERROR]", err);
      return new NextResponse("Error al actualizar categoría", { status: 500 });
    }
  } catch (err: unknown) {
    console.error("[CATEGORY PATCH]", err);
    return new NextResponse("Error interno", { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { categoryId: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) return new NextResponse("No autenticado", { status: 401 });

    const { categoryId } = params;
    if (!categoryId) return new NextResponse("categoryId faltante", { status: 400 });

    const category = await db.category.findUnique({
      where: { id: categoryId },
      select: { id: true },
    });

    if (!category) return new NextResponse("Categoría no encontrada", { status: 404 });

    const coursesCount = await db.course.count({ where: { categoryId } });
    const projectsCount = await db.researchProject.count({ where: { categoryId } });

    if (coursesCount > 0 || projectsCount > 0) {
      return new NextResponse("La categoría no está vacía (tiene cursos o proyectos)", {
        status: 400,
      });
    }

    await db.category.delete({ where: { id: categoryId } });
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error("[CATEGORY DELETE ERROR]", err);
    return new NextResponse("Error al eliminar categoría", { status: 500 });
  }
}
