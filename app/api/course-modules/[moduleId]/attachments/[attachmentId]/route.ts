import { db } from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/lib/supabase";

const supabase = createClient();

export async function DELETE(
  req: NextRequest,
  { params }: { params: { moduleId: string; attachmentId: string } }
) {
  try {
    const attachment = await db.courseModuleAttachment.findUnique({
      where: { id: params.attachmentId },
    });

    if (!attachment) {
      return new NextResponse("Attachment not found", { status: 404 });
    }

    const filePath = attachment.url.split("/").pop();

    const { error: storageError } = await supabase.storage
      .from("attachments")
      .remove([filePath!]);

    if (storageError) {
      console.error("Error removing from Supabase:", storageError.message);
      return new NextResponse("Failed to delete from storage", { status: 500 });
    }

    await db.courseModuleAttachment.delete({
      where: { id: params.attachmentId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[MODULE_ATTACHMENT_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { moduleId: string; attachmentId: string } }
) {
  try {
    const formData = await req.formData();
    const file: File | null = formData.get("file") as unknown as File;

    if (!file || !file.name) {
      return new NextResponse("File is required", { status: 400 });
    }

    const attachment = await db.courseModuleAttachment.findUnique({
      where: { id: params.attachmentId },
    });

    if (!attachment) {
      return new NextResponse("Attachment not found", { status: 404 });
    }

    const oldFilePath = attachment.url.split("/").pop();

    await supabase.storage.from("attachments").remove([oldFilePath!]);

    const buffer = Buffer.from(await file.arrayBuffer());
    const newFilePath = `${params.moduleId}-${Date.now()}-${file.name}`;

    const { data, error } = await supabase.storage
      .from("attachments")
      .upload(newFilePath, buffer, {
        contentType: file.type,
      });

    if (error || !data?.path) {
      console.error("Error uploading file:", error?.message);
      return new NextResponse("Error uploading file", { status: 500 });
    }

    const { data: publicUrlData } = supabase.storage
      .from("attachments")
      .getPublicUrl(data.path);

    if (!publicUrlData?.publicUrl) {
      return new NextResponse("Failed to get public URL", { status: 500 });
    }

    await db.courseModuleAttachment.update({
      where: { id: params.attachmentId },
      data: {
        name: file.name,
        url: publicUrlData.publicUrl,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[MODULE_ATTACHMENT_REPLACE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
