// "use client";

// import { AttachmentItem } from "./attachment-item";

// interface Attachment {
//   id: string;
//   name: string;
//   url: string;
//   createdAt: string;
//   updatedAt: string;
//   groupId: string;
// }

// interface AttachmentListProps {
//   attachments: Attachment[];
//   groupId: string;
// }

// export const AttachmentList = ({ attachments }: AttachmentListProps) => {
//   if (attachments.length === 0) {
//     return (
//       <p className="text-sm text-muted-foreground">
//         No hay archivos cargados en este semillero.
//       </p>
//     );
//   }

//   return (
//     <div className="space-y-4">
//       {attachments.map((attachment) => (
//         <AttachmentItem key={attachment.id} {...attachment} />
//       ))}
//     </div>
//   );
// };

import { ResearchProjectAttachment, ResearchProject } from "@prisma/client";

interface AttachmentWithProject extends ResearchProjectAttachment {
  project: ResearchProject;
}

interface AttachmentListProps {
  attachments: AttachmentWithProject[];
}

export const AttachmentList = ({ attachments }: AttachmentListProps) => {
  
  const groupedByProject = attachments.reduce<Record<string, AttachmentWithProject[]>>((acc, item) => {
    const title = item.project.title;
    if (!acc[title]) acc[title] = [];
    acc[title].push(item);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {Object.entries(groupedByProject).map(([title, group]) => (
        <div key={title}>
          <h3 className="text-lg font-semibold text-slate-700 dark:text-white">
            Proyecto: {title}
          </h3>
          <ul className="space-y-2 mt-2">
            {group.map((attachment) => (
              <li
                key={attachment.id}
                className="border p-2 rounded-md bg-slate-100 dark:bg-slate-800 text-sm flex justify-between items-center"
              >
                <span>{attachment.name}</span>
                <a
                  href={attachment.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Descargar
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

