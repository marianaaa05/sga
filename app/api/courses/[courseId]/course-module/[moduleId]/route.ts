import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { courseId: string } }
): Promise<NextResponse> {
  try {
    const courseId = params.courseId;

    if (!courseId) {
      return new NextResponse("Course ID is required", { status: 400 });
    }

    const modules = await db.courseModule.findMany({
      where: { courseId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(modules);
  } catch (error) {
    console.error("[COURSE_MODULE_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { courseId: string } }
): Promise<NextResponse> {
  try {
    const { userId } = await auth();
    const courseId = params.courseId;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!courseId) {
      return new NextResponse("Course ID is required", { status: 400 });
    }

    const body = await req.json();
    const { title, description } = body;

    if (!title) {
      return new NextResponse("Title is required", { status: 400 });
    }

    const modulec = await db.courseModule.create({
      data: {
        title,
        description,
        courseId,
      },
    });

    return NextResponse.json(modulec);
  } catch (error) {
    console.error("[COURSE_MODULE_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
