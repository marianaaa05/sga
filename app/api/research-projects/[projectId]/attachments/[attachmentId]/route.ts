// // app/api/research-projects/[projectId]/attachments/[attachmentId]/route.ts

// import { auth } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";
// import { db } from "@/lib/db";
// import { createClient } from "@/lib/supabase";
// import { v4 as uuidv4 } from "uuid";

// const supabase = createClient();

// export async function PATCH(
//   req: Request,
//   { params }: { params: { projectId: string; attachmentId: string } }
// ) {
//   try {
//     const { userId } = await auth();
//     const { projectId, attachmentId } = params;

//     if (!userId) return new NextResponse("Unauthorized", { status: 401 });

//     const formData = await req.formData();
//     const file = formData.get("file") as File;

//     if (!file || !projectId || !attachmentId) {
//       return new NextResponse("Archivo, ID de proyecto o de adjunto faltante", { status: 400 });
//     }

//     const existing = await db.researchProjectAttachment.findUnique({
//       where: { id: attachmentId },
//     });

//     if (!existing) return new NextResponse("Adjunto no encontrado", { status: 404 });

//     const previousPath = existing.url.split("/storage/v1/object/public/attachments/")[1];
//     if (previousPath) {
//       await supabase.storage.from("attachments").remove([previousPath]);
//     }

//     const buffer = Buffer.from(await file.arrayBuffer());
//     const ext = file.name.split(".").pop();
//     const newFileName = `${uuidv4()}.${ext}`;

//     const { data, error } = await supabase.storage
//       .from("attachments")
//       .upload(`projects/${projectId}/${newFileName}`, buffer, {
//         contentType: file.type,
//       });

//     if (error) return new NextResponse("Error al subir archivo", { status: 500 });

//     const urlResponse = supabase.storage
//       .from("attachments")
//       .getPublicUrl(data.path);

//     const updatedAttachment = await db.researchProjectAttachment.update({
//       where: { id: attachmentId },
//       data: {
//         name: file.name,
//         url: urlResponse.data.publicUrl,
//       },
//     });

//     return NextResponse.json(updatedAttachment);
//   } catch (error) {
//     console.error("[PROJECT_ATTACHMENT_PATCH]", error);
//     return new NextResponse("Error interno del servidor", { status: 500 });
//   }
// }




// export async function DELETE(
//   req: Request,
//   { params }: { params: { projectId: string; attachmentId: string } }
// ) {
//   try {
//     const { userId } = await auth();
//     const { projectId, attachmentId } = params;

//     if (!userId) {
//       return new NextResponse("No autorizado", { status: 401 });
//     }

//     if (!projectId || !attachmentId) {
//       return new NextResponse("Faltan parámetros", { status: 400 });
//     }

//     const attachment = await db.researchProjectAttachment.findUnique({
//       where: { id: attachmentId },
//     });

//     if (!attachment) {
//       return new NextResponse("Adjunto no encontrado", { status: 404 });
//     }

//     const path = attachment.url.split("/storage/v1/object/public/attachments/")[1];

//     if (path) {
//       const { error: supabaseError } = await supabase.storage
//         .from("attachments")
//         .remove([path]);

//       if (supabaseError) {
//         console.error("Error al eliminar archivo en Supabase:", supabaseError.message);
//         return new NextResponse("Error al eliminar archivo en Supabase", { status: 500 });
//       }
//     }

//     await db.researchProjectAttachment.delete({
//       where: { id: attachmentId },
//     });

//     return new NextResponse(null, { status: 204 }); 
//   } catch (error) {
//     console.error("[PROJECT_ATTACHMENT_DELETE]", error);
//     return new NextResponse("Error interno del servidor", { status: 500 });
//   }
// }


import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createClient } from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";

const supabase = createClient();

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string; attachmentId: string }> }
) {
  try {
    const { userId } = await auth();
    const { projectId, attachmentId } = await params;
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    // 1. Validar autenticación
    if (!userId) {
      return new NextResponse("No autorizado", { status: 401 });
    }

    // 2. Validar parámetros
    if (!projectId || !attachmentId) {
      return new NextResponse("ID de proyecto o adjunto no válido", { status: 400 });
    }

    // 3. Validar archivo
    if (!file) {
      return new NextResponse("Archivo requerido", { status: 400 });
    }

    // 4. Obtener adjunto existente
    const existing = await db.researchProjectAttachment.findUnique({
      where: { id: attachmentId },
    });
    if (!existing) {
      return new NextResponse("Adjunto no encontrado", { status: 404 });
    }

    // 5. Eliminar archivo anterior en Supabase
    const previousPath = existing.url.split(
      "/storage/v1/object/public/attachments/"
    )[1];
    if (previousPath) {
      await supabase.storage.from("attachments").remove([previousPath]);
    }

    // 6. Subir nuevo archivo
    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = file.name.split(".").pop();
    const newFileName = `${uuidv4()}.${ext}`;
    const uploadPath = `projects/${projectId}/${newFileName}`;

    const { data, error } = await supabase.storage
      .from("attachments")
      .upload(uploadPath, buffer, { contentType: file.type });

    if (error || !data?.path) {
      console.error("[SUPABASE UPLOAD ERROR]", error);
      return new NextResponse("Error al subir archivo", { status: 500 });
    }

    // 7. Obtener URL pública
    const { data: urlData } = supabase.storage
      .from("attachments")
      .getPublicUrl(data.path);

    // 8. Actualizar registro en BD
    const updated = await db.researchProjectAttachment.update({
      where: { id: attachmentId },
      data: { name: file.name, url: urlData.publicUrl },
    });

    return NextResponse.json(updated);
  } catch (error: unknown) {
    console.error("[PROJECT_ATTACHMENT_PATCH]", error);
    return new NextResponse("Error interno del servidor", { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string; attachmentId: string }> }
) {
  try {
    const { userId } = await auth();
    const { projectId, attachmentId } = await params;

    // 1. Validar autenticación
    if (!userId) {
      return new NextResponse("No autorizado", { status: 401 });
    }

    // 2. Validar parámetros
    if (!projectId || !attachmentId) {
      return new NextResponse("Parámetros inválidos", { status: 400 });
    }

    // 3. Buscar adjunto
    const attachment = await db.researchProjectAttachment.findUnique({
      where: { id: attachmentId },
    });
    if (!attachment) {
      return new NextResponse("Adjunto no encontrado", { status: 404 });
    }

    // 4. Eliminar archivo en Supabase
    const path = attachment.url.split(
      "/storage/v1/object/public/attachments/"
    )[1];
    if (path) {
      const { error: supabaseError } = await supabase.storage
        .from("attachments")
        .remove([path]);
      if (supabaseError) {
        console.error(
          "[SUPABASE DELETE ERROR]",
          supabaseError.message
        );
        return new NextResponse("Error al eliminar archivo en Supabase", { status: 500 });
      }
    }

    // 5. Borrar registro en BD
    await db.researchProjectAttachment.delete({
      where: { id: attachmentId },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error: unknown) {
    console.error("[PROJECT_ATTACHMENT_DELETE]", error);
    return new NextResponse("Error interno del servidor", { status: 500 });
  }
}

