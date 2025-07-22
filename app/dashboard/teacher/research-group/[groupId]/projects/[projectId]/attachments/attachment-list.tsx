// import { ResearchProjectAttachment, ResearchProject } from "@prisma/client";

// type ExtendedAttachment = ResearchProjectAttachment & {
//   project: ResearchProject;
// };

// interface AttachmentWithProject extends ResearchProjectAttachment {
//   project: ResearchProject; // ✅ esto asegura que tenga el proyecto incluido
// }

// interface AttachmentListProps {
//   items: AttachmentWithProject[];
// }

// export const AttachmentList = ({ items }: AttachmentListProps) => {
//   // Agrupar archivos por proyecto
//   const groupedByProject = items.reduce<Record<string, ExtendedAttachment[]>>((acc, item) => {
//     const projectTitle = item.project.title;
//     if (!acc[projectTitle]) {
//       acc[projectTitle] = [];
//     }
//     acc[projectTitle].push(item);
//     return acc;
//   }, {});

//   return (
//     <div className="space-y-6">
//       {Object.entries(groupedByProject).map(([projectTitle, attachments]) => (
//         <div key={projectTitle}>
//           <h3 className="text-lg font-semibold text-slate-700 dark:text-white">
//             Proyecto: {projectTitle}
//           </h3>
//           <ul className="space-y-2 mt-2">
//             {attachments.map((attachment) => (
//               <li
//                 key={attachment.id}
//                 className="border p-2 rounded-md bg-slate-100 dark:bg-slate-800 text-sm flex justify-between items-center"
//               >
//                 <span>{attachment.name}</span>
//                 <a
//                   href={attachment.url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-500 hover:underline"
//                 >
//                   Descargar
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// };
