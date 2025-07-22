import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { v4 as uuidv4 } from "uuid";
import { createClient } from "@/lib/supabase";

const supabase = createClient();


export async function POST(
  req: Request,
  { params }: { params: { projectId: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file || !params.projectId) {
      return new NextResponse("Archivo o projectId faltante", { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileExtension = file.name.split(".").pop();
    const fileName = `${uuidv4()}.${fileExtension}`;

    const { data, error } = await supabase.storage
      .from("attachments")
      .upload(`projects/${params.projectId}/${fileName}`, buffer, {
        contentType: file.type,
      });

    if (error) {
      console.error("Error subiendo archivo a Supabase:", error.message);
      return new NextResponse("Error al subir archivo", { status: 500 });
    }

    const urlResponse = supabase.storage
      .from("attachments")
      .getPublicUrl(data.path);

    const attachment = await db.researchProjectAttachment.create({
      data: {
        name: file.name,
        url: urlResponse.data.publicUrl,
        projectId: params.projectId,
      },
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.error("[PROJECT_ATTACHMENT_POST]", error);
    return new NextResponse("Error interno del servidor", { status: 500 });
  }
}
