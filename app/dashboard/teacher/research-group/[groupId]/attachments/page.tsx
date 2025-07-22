// import { UploadForm } from "./form-upload";
// import { AttachmentList } from "./attachment-list";
// import { db } from "@/lib/db";

// interface Props {
//   params: {
//     groupId: string;
//   };
// }

// export default async function UploadAttachmentPage({ params }: Props) {
//   const attachments = await db.researchGroupAttachment.findMany({
//     where: {
//       researchGroupId: params.groupId,
//     },
//     orderBy: {
//       createdAt: "desc",
//     },
//   });

//   // Agregamos groupId en cada attachment
//   const formattedAttachments = attachments.map((att) => ({
//     id: att.id,
//     name: att.name,
//     url: att.url,
//     createdAt: att.createdAt.toISOString(),
//     updatedAt: att.updatedAt.toISOString(),
//     groupId: att.researchGroupId, // ✅ importante para PATCH
//   }));

//   return (
//     <div className="p-6 space-y-6">
//       <div>
//         <h1 className="text-2xl font-bold mb-2">Subir archivos al semillero</h1>
//         <UploadForm researchGroupId={params.groupId} />
//       </div>

//       <div>
//         <h2 className="text-xl font-semibold mb-2">Archivos subidos</h2>
//         <AttachmentList attachments={formattedAttachments} groupId={params.groupId} />
//       </div>
//     </div>
//   );
// }
