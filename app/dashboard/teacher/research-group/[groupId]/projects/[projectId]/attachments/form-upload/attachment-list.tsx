// import { ResearchProjectAttachment, ResearchProject } from "@prisma/client";

// interface AttachmentWithProject extends ResearchProjectAttachment {
//   project: ResearchProject;
// }

// interface AttachmentListProps {
//   attachments: AttachmentWithProject[];
// }

// export const AttachmentList = ({ attachments }: AttachmentListProps) => {
//   if (!attachments.length) {
//     return (
//       <p className="text-sm text-muted-foreground mt-4">
//         Aún no se han subido archivos a este proyecto.
//       </p>
//     );
//   }

//   return (
//     <div className="space-y-2 mt-4">
//       {attachments.map((attachment) => (
//         <div
//           key={attachment.id}
//           className="border p-2 rounded-md bg-slate-100 dark:bg-slate-800 text-sm flex justify-between items-center"
//         >
//           <span>{attachment.name}</span>
//           <a
//             href={attachment.url}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-blue-500 hover:underline"
//           >
//             Descargar
//           </a>
//         </div>
//       ))}
//     </div>
//   );
// };
