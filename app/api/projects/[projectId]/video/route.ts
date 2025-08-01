// import { auth } from "@clerk/nextjs/server";
// import { db } from "@/lib/db";
// import { NextResponse } from "next/server";

// export async function POST(
//   req: Request,
//   { params }: { params: { projectId: string } }
// ) {
//   try {
//     const { userId } = await auth();

//     if (!userId) {
//       return new NextResponse("No autorizado", { status: 401 });
//     }

//     const body = await req.json();
//     const { videoUrl, name } = body;

//     if (!videoUrl || !params.projectId) {
//       return new NextResponse("Faltan datos", { status: 400 });
//     }

//     const attachment = await db.researchProjectAttachment.create({
//       data: {
//         name: name || "Video de YouTube",
//         url: videoUrl,
//         projectId: params.projectId,
//       },
//     });

//     return NextResponse.json(attachment);
//   } catch (error) {
//     console.error("[RESEARCH_PROJECT_ATTACHMENT_POST]", error);
//     return new NextResponse("Error interno", { status: 500 });
//   }
// }


// app/api/projects/[projectId]/video/route.ts
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // 1️⃣ Autenticación
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("No autorizado", { status: 401 });
    }

    // 2️⃣ Extraer projectId de la URL
    const url = new URL(request.url);
    const segments = url.pathname.split("/"); 
    // La ruta es: /api/projects/[projectId]/video
    const projectId = segments.at(-2);
    if (!projectId) {
      return new NextResponse("ID de proyecto inválido", { status: 400 });
    }

    // 3️⃣ Leer y validar body
    const { videoUrl, name } = await request.json();
    if (!videoUrl) {
      return new NextResponse("Debe enviar videoUrl", { status: 400 });
    }

    // 4️⃣ Crear el adjunto en BD
    const attachment = await db.researchProjectAttachment.create({
      data: {
        name: name?.trim() || "Video de YouTube",
        url: videoUrl.trim(),
        projectId,
      },
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.error("[RESEARCH_PROJECT_ATTACHMENT_POST]", error);
    return new NextResponse("Error interno", { status: 500 });
  }
}
