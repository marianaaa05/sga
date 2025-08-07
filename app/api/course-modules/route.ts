import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const body = await req.json();
    const { title, description, courseId } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!title || !courseId) {
      return new NextResponse("Title and Course ID are required", { status: 400 });
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
    console.error("[COURSE_MODULE_CREATE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}


export async function PATCH(
  req: Request,
  { params }: { params: { moduleId: string } }
) {
  try {
    const { userId } = await auth();
    const body = await req.json();
    const { title, description } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const modulec = await db.courseModule.update({
      where: {
        id: params.moduleId,
      },
      data: {
        title,
        description,
      },
    });

    return NextResponse.json(modulec);
  } catch (error) {
    console.error("[COURSE_MODULE_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
