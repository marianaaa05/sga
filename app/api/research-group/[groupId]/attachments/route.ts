// import { NextResponse } from "next/server";
// import { auth } from "@clerk/nextjs/server";
// import { db } from "@/lib/db";
// import { createClient } from "@supabase/supabase-js";

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// );

// export async function POST(
//   req: Request,
//   { params }: { params: { groupId: string } }
// ) {
//   try {
//     const { userId } = await auth();
//     if (!userId) {
//       return new NextResponse("No autorizado", { status: 401 });
//     }

//     const formData = await req.formData();
//     const file = formData.get("file") as File;

//     if (!file) {
//       return new NextResponse("Archivo no proporcionado", { status: 400 });
//     }

//     const buffer = Buffer.from(await file.arrayBuffer());
//     const uniqueName = `${crypto.randomUUID()}-${file.name}`;
//     const filePath = `${params.groupId}/${uniqueName}`;

//     const { error: uploadError } = await supabase.storage
//       .from("attachments")
//       .upload(filePath, buffer, {
//         contentType: file.type,
//       });

//     if (uploadError) {
//       console.error("Error al subir archivo:", uploadError);
//       return new NextResponse("Error al subir archivo", { status: 500 });
//     }

//     const { data } = supabase.storage
//       .from("attachments")
//       .getPublicUrl(filePath);

//     const attachment = await db.researchGroupAttachment.create({
//       data: {
//         name: file.name,
//         url: data.publicUrl,
//         researchGroupId: params.groupId,
//       },
//     });

//     return NextResponse.json(attachment);
//   } catch (error) {
//     console.error("[RESEARCH_GROUP_ATTACHMENT_POST]", error);
//     return new NextResponse("Error interno del servidor", { status: 500 });
//   }
// }


// export async function GET(
//   req: Request,
//   { params }: { params: { groupId: string } }
// ) {
//   try {
//     const { userId } =  await auth();
//     if (!userId) {
//       return new NextResponse("No autorizado", { status: 401 });
//     }

//     const attachments = await db.researchGroupAttachment.findMany({
//       where: {
//         researchGroupId: params.groupId,
//       },
//       orderBy: {
//         createdAt: "desc",
//       },
//     });

//     return NextResponse.json(attachments);
//   } catch (error) {
//     console.error("[RESEARCH_GROUP_ATTACHMENT_GET]", error);
//     return new NextResponse("Error al obtener archivos", { status: 500 });
//   }
// }


// app/api/research-group/[groupId]/attachments/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function getGroupId(pathname: string) {
  // ["", "api", "research-group", "<groupId>", "attachments"]
  const parts = pathname.split("/");
  return parts[3];
}

export async function POST(request: NextRequest) {
  try {
    // 1️⃣ Autenticación
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("No autorizado", { status: 401 });
    }

    // 2️⃣ Extraer groupId
    const groupId = getGroupId(new URL(request.url).pathname);
    if (!groupId) {
      return new NextResponse("ID de grupo inválido", { status: 400 });
    }

    // 3️⃣ Leer archivo del form-data
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    if (!file) {
      return new NextResponse("Archivo no proporcionado", { status: 400 });
    }

    // 4️⃣ Subir a Supabase Storage
    const buffer = Buffer.from(await file.arrayBuffer());
    const uniqueName = `${crypto.randomUUID()}-${file.name}`;
    const filePath = `${groupId}/${uniqueName}`;
    const { error: uploadError } = await supabase.storage
      .from("attachments")
      .upload(filePath, buffer, {
        contentType: file.type,
      });
    if (uploadError) {
      console.error("[Supabase] Error al subir archivo:", uploadError);
      return new NextResponse("Error al subir archivo", { status: 500 });
    }

    // 5️⃣ Obtener URL pública
    const { data } = supabase.storage
      .from("attachments")
      .getPublicUrl(filePath);

    // 6️⃣ Crear registro en la base de datos
    const attachment = await db.researchGroupAttachment.create({
      data: {
        name: file.name,
        url: data.publicUrl,
        researchGroupId: groupId,
      },
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.error("[RESEARCH_GROUP_ATTACHMENT_POST]", error);
    return new NextResponse("Error interno del servidor", { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    // 1️⃣ Autenticación
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("No autorizado", { status: 401 });
    }

    // 2️⃣ Extraer groupId
    const groupId = getGroupId(new URL(request.url).pathname);
    if (!groupId) {
      return new NextResponse("ID de grupo inválido", { status: 400 });
    }

    // 3️⃣ Leer de la base de datos
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


