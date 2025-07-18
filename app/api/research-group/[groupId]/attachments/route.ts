import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(
  req: Request,
  { params }: { params: { groupId: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("No autorizado", { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return new NextResponse("Archivo no proporcionado", { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const uniqueName = `${crypto.randomUUID()}-${file.name}`;
    const filePath = `${params.groupId}/${uniqueName}`;

    const { error: uploadError } = await supabase.storage
      .from("attachments")
      .upload(filePath, buffer, {
        contentType: file.type,
      });

    if (uploadError) {
      console.error("Error al subir archivo:", uploadError);
      return new NextResponse("Error al subir archivo", { status: 500 });
    }

    const { data } = supabase.storage
      .from("attachments")
      .getPublicUrl(filePath);

    const attachment = await db.researchGroupAttachment.create({
      data: {
        name: file.name,
        url: data.publicUrl,
        researchGroupId: params.groupId,
      },
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.error("[RESEARCH_GROUP_ATTACHMENT_POST]", error);
    return new NextResponse("Error interno del servidor", { status: 500 });
  }
}


export async function GET(
  req: Request,
  { params }: { params: { groupId: string } }
) {
  try {
    const { userId } =  await auth();
    if (!userId) {
      return new NextResponse("No autorizado", { status: 401 });
    }

    const attachments = await db.researchGroupAttachment.findMany({
      where: {
        researchGroupId: params.groupId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(attachments);
  } catch (error) {
    console.error("[RESEARCH_GROUP_ATTACHMENT_GET]", error);
    return new NextResponse("Error al obtener archivos", { status: 500 });
  }
}


