// import { auth } from "@clerk/nextjs/server";
// import { db } from "@/lib/db";
// import { NextResponse } from "next/server";
// import { writeFile } from "fs/promises";
// import { randomUUID } from "crypto";
// import path from "path";

// export async function POST(req: Request, { params }: { params: { courseId: string } }) {
//   try {
//     const { userId } = await auth();
//     const courseId = params.courseId;

//     if (!userId) {
//       return new NextResponse("No autorizado", { status: 401 });
//     }

//     const formData = await req.formData();
//     const file = formData.get("file") as File;

//     if (!file) {
//       return new NextResponse("Archivo no proporcionado", { status: 400 });
//     }

//     const buffer = Buffer.from(await file.arrayBuffer());

//     const filename = `${randomUUID()}-${file.name}`;
//     const filePath = path.join(process.cwd(), "public/uploads", filename);

//     await writeFile(filePath, buffer);

//     const savedAttachment = await db.attachment.create({
//       data: {
//         name: file.name,
//         url: `/uploads/${filename}`,
//         courseId,
//       },
//     });

//     return NextResponse.json(savedAttachment);
//   } catch (error) {
//     console.error("[ATTACHMENT_UPLOAD_ERROR]", error);
//     return new NextResponse("Error al subir archivo", { status: 500 });
//   }
// }
