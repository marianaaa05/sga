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
    const file = formData.get("file") as File;
    const courseId = formData.get("courseId") as string;

    if (!file || !courseId) {
      return new NextResponse("Archivo o courseId faltante", { status: 400 });
    }

    const fileBuffer = Buffer.from(await file.arrayBuffer());

    const fileName = `${crypto.randomUUID()}-${file.name}`;
    const filePath = `${courseId}/${fileName}`; // Estructura en supabase: courseId/archivo

    // Subida a Supabase
    const { error: uploadError } = await supabase.storage
      .from("attachments")
      .upload(filePath, fileBuffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error("Error al subir a Supabase:", uploadError);
      return new NextResponse("Fallo al subir archivo", { status: 500 });
    }

    // Obtener URL pública
    const { data: publicUrlData } = supabase.storage
      .from("attachments")
      .getPublicUrl(filePath);

    const publicUrl = publicUrlData.publicUrl;

    // Guardar en Neon
    const attachment = await db.attachment.create({
      data: {
        name: file.name,
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
