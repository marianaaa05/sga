import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

interface CourseCreateBody {
  title: string;
  description?: string;
  imageUrl?: string;
  categoryId?: string;
  researchGroupId?: string;
}

export async function POST(req: Request) {
  const { userId, sessionClaims } = await auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const body: CourseCreateBody = await req.json();
  if (!body.title) {
    return new NextResponse("Título es obligatorio", { status: 400 });
  }

  // <-- Aquí hacemos el assertion
  const metadata = sessionClaims?.metadata as { role?: string } | undefined;
  const role = metadata?.role;

  const isPublished = role === "TEACHER" || role === "WEB_MASTER";

  const course = await db.course.create({
    data: {
      title: body.title,
      description: body.description,
      imageUrl: body.imageUrl,
      categoryId: body.categoryId,
      researchGroupId: body.researchGroupId,
      userId,
      isPublished,
    },
  });

  return NextResponse.json(course);
}
