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
  const { userId } = await auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const body: CourseCreateBody = await req.json();
  if (!body.title) {
    return new NextResponse("Título es obligatorio", { status: 400 });
  }

  const course = await db.course.create({
    data: {
      title: body.title,
      description: body.description,
      imageUrl: body.imageUrl,
      categoryId: body.categoryId,
      userId,
    },
  });

  return NextResponse.json(course);
}
