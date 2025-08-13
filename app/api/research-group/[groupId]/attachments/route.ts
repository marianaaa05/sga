import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function getGroupId(pathname: string) {
  const parts = pathname.split("/");
  return parts[3];
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) return new NextResponse("No autorizado", { status: 401 });

    const groupId = getGroupId(new URL(request.url).pathname);
    if (!groupId) return new NextResponse("ID de grupo inválido", { status: 400 });

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    if (!file) return new NextResponse("Archivo no proporcionado", { status: 400 });

    const extMatch = file.name.match(/\.[^.\s]+$/);
    const extension = extMatch ? extMatch[0] : ""; 

    const safeKey = `${crypto.randomUUID()}${extension}`;

    const filePath = `${groupId}/${safeKey}`;

    const buffer = Buffer.from(await file.arrayBuffer());
    const { error: uploadError } = await supabase.storage
      .from("attachments")
      .upload(filePath, buffer, {
        contentType: file.type || undefined,
        upsert: false,
      });

    if (uploadError) {
      console.error("[Supabase] Error al subir archivo:", uploadError);
      return new NextResponse(`Error al subir archivo: ${uploadError.message ?? JSON.stringify(uploadError)}`, { status: 500 });
    }

    const { data } = supabase.storage.from("attachments").getPublicUrl(filePath);

    const cleanedOriginalName = file.name.replace(/[\u0000-\u001F\u007F]/g, "");

    const attachment = await db.researchGroupAttachment.create({
      data: {
        name: cleanedOriginalName, 
        url: data.publicUrl,
        researchGroupId: groupId,      },
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.error("[RESEARCH_GROUP_ATTACHMENT_POST]", error);
    return new NextResponse("Error interno del servidor", { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("No autorizado", { status: 401 });
    }

    const groupId = getGroupId(new URL(request.url).pathname);
    if (!groupId) {
      return new NextResponse("ID de grupo inválido", { status: 400 });
    }

    const attachments = await db.researchGroupAttachment.findMany({
      where: { researchGroupId: groupId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(attachments);
  } catch (error) {
    console.error("[RESEARCH_GROUP_ATTACHMENT_GET]", error);
    return new NextResponse("Error al obtener archivos", { status: 500 });
  }
}


