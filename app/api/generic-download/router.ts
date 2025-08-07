// import { NextRequest, NextResponse } from "next/server";
// import { db } from "@/lib/db";
// import { createClient } from "@/lib/supabase";

// const supabase = createClient();

// // Mapea cada scope al finder de Prisma correspondiente
// const attachmentFinders = {
//   course:      (id: string) => db.attachment.findUnique({ where: { id } }),
//   module:      (id: string) => db.courseModuleAttachment.findUnique({ where: { id } }),
//   "research-group":   (id: string) => db.researchGroupAttachment.findUnique({ where: { id } }),
//   "research-project": (id: string) => db.researchProjectAttachment.findUnique({ where: { id } }),
// } as const;

// export async function GET(
//   _req: NextRequest,
//   { params }: { params: { scope: keyof typeof attachmentFinders; attachmentId: string } }
// ) {
//   const { scope, attachmentId } = params;

//   // 1️⃣ Asegura que el scope sea válido
//   const finder = attachmentFinders[scope];
//   if (!finder) {
//     return new NextResponse("Scope inválido", { status: 400 });
//   }

//   try {
//     // 2️⃣ Busca el registro en la tabla correspondiente
//     const attachment = await finder(attachmentId);
//     if (!attachment) {
//       return new NextResponse("Archivo no encontrado", { status: 404 });
//     }

//     // 3️⃣ Extrae la ruta interna en Supabase del campo `url`
//     const path = attachment.url.split("/").pop()!;
//     const { data, error } = await supabase.storage
//       .from("attachments")
//       .download(path);

//     if (error || !data) {
//       console.error("[DOWNLOAD ERROR]", error);
//       return new NextResponse("Error al descargar archivo", { status: 500 });
//     }

//     // 4️⃣ Devuelve el blob con Content-Disposition usando el nombre original
//     const buffer = Buffer.from(await data.arrayBuffer());
//     return new NextResponse(buffer, {
//       status: 200,
//       headers: {
//         "Content-Type": "application/octet-stream",
//         "Content-Disposition": `attachment; filename="${attachment.name}"`,
//       },
//     });
//   } catch (err) {
//     console.error("[DOWNLOAD EXCEPTION]", err);
//     return new NextResponse("Error interno", { status: 500 });
//   }
// }
