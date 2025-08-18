import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("No autorizado", { status: 401 });
    }

    const body = await req.json();
    const { linkUrl, courseId } = body;

    if (!linkUrl || !courseId) {
      return new NextResponse("Faltan datos", { status: 400 });
    }

    // guardar en neon
    const attachment = await db.attachment.create({
      data: {
        name: `Enlace externo`,
        url: linkUrl,
        courseId,
      },
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.error("[UPLOAD_LINK_ERROR]", error);
    return new NextResponse("Error interno", { status: 500 });
  }
}
