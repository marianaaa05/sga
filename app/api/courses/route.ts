import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
  req: Request
) {
  try {
    const { userId } = await auth();
    const {title} = await req.json();

    if (!userId) {
      return new Response("No se ha autenticado el usuario", {
        status: 401,
      });
    }

    if (!title || typeof title !== "string") {
      return new Response("El título es obligatorio", {
        status: 400,
      });
    }

    const course = await db.course.create({
      data: {
        userId,
        title,
      },
    });

    return NextResponse.json(course);

  } catch (error) {
    console.log("[COURSES]", error);
    return new NextResponse("Error al crear el curso", {
      status: 500,
    });
  }
}