import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("No autorizado", { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const courseId = formData.get("courseId") as string | null;

    if (!file || !courseId) {
      return new NextResponse("Archivo o courseId faltante", { status: 400 });
    }

    const safeCourseId = courseId.replace(/[^a-zA-Z0-9-_]/g, "_");

    const extMatch = file.name.match(/\.[^.\s]+$/);
    const extension = extMatch ? extMatch[0] : "";

    const safeKey = `${crypto.randomUUID()}${extension}`;

    const filePath = `${safeCourseId}/${safeKey}`;

    const fileBuffer = Buffer.from(await file.arrayBuffer());

    const { error: uploadError } = await supabase.storage
      .from("attachments")
      .upload(filePath, fileBuffer, {
        contentType: file.type || undefined,
        upsert: false,
      });

    if (uploadError) {
      console.error("Error al subir a Supabase:", uploadError);
      return new NextResponse(
        `Fallo al subir archivo: ${uploadError.message}`,
        { status: 500 }
      );
    }

    const { data: publicUrlData } = supabase.storage
      .from("attachments")
      .getPublicUrl(filePath);

    const publicUrl = publicUrlData.publicUrl;

    const cleanedOriginalName = file.name.replace(/[\u0000-\u001F\u007F]/g, "");

    const attachment = await db.attachment.create({
      data: {
        name: cleanedOriginalName,
        url: publicUrl,
        courseId: courseId,
      },
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.error("[UPLOAD_ERROR]", error);
    return new NextResponse("Error interno", { status: 500 });
  }
}
