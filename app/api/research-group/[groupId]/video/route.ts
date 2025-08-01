// import { auth } from "@clerk/nextjs/server";
// import { db } from "@/lib/db";
// import { NextResponse } from "next/server";

// export async function POST(
//   req: Request,
//   { params }: { params: { groupId: string } }
// ) {
//   try {
//     const { userId } = await auth();

//     if (!userId) {
//       return new NextResponse("No autorizado", { status: 401 });
//     }

//     const body = await req.json();
//     const { videoUrl, name } = body;

//     if (!videoUrl || !params.groupId) {
//       return new NextResponse("Faltan datos", { status: 400 });
//     }

//     const attachment = await db.researchGroupAttachment.create({
//       data: {
//         name: name || "Video de YouTube",
//         url: videoUrl,
//         researchGroupId: params.groupId,
//       },
//     });

//     return NextResponse.json(attachment);
//   } catch (error) {
//     console.error("[RESEARCH_GROUP_ATTACHMENT_POST]", error);
//     return new NextResponse("Error interno", { status: 500 });
//   }
// }


import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ groupId: string }> }
) {
  try {
    const { userId } = await auth();
    const { groupId } = await params;
    const values = await request.json();

    if (!userId) {
      return new NextResponse("No autorizado", { status: 401 });
    }

    if (!groupId) {
      return new NextResponse("ID del grupo no válido", { status: 400 });
    }

    if (!values || Object.keys(values).length === 0) {
      return new NextResponse("No se enviaron datos", { status: 400 });
    }

    const allowedFields = ["videoUrl", "name"];
    const data = Object.fromEntries(
      Object.entries(values).filter(([key]) => allowedFields.includes(key))
    );

    if (!data.videoUrl) {
      return new NextResponse("Falta la URL del video", { status: 400 });
    }

    const attachment = await db.researchGroupAttachment.create({
      data: {
        name: typeof data.name === "string" && data.name.trim() !== "" ? data.name : "Video de YouTube",
        url: typeof data.videoUrl === "string" ? data.videoUrl : "",
        researchGroupId: groupId,
      },
    });

    return NextResponse.json(attachment);
  } catch (error: unknown) {
    console.error("[RESEARCH_GROUP_ATTACHMENT_POST]", error);
    return new NextResponse("Error al crear el archivo adjunto", {
      status: 500,
    });
  }
}

