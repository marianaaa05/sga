// import { db } from "@/lib/db";
// import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";

// import { UploadForm } from "./_components/form-upload";
// import { AttachmentItem } from "./_components/attachment-item";
// import { IconInsign } from "@/components/icon-insign";
// import { Paperclip } from "lucide-react";

// interface AttachmentsPageProps {
//   params: {
//     courseId: string;
//   };
// }

// export default async function AttachmentsPage({ params }: AttachmentsPageProps) {
//   const courseId = params.courseId;

//   if (!courseId) return redirect("/dashboard");

//   const { userId } = await auth();
//   if (!userId) return redirect("/dashboard");

//   const course = await db.course.findUnique({
//     where: { id: courseId },
//     include: {
//       attachments: {
//         orderBy: { createdAt: "desc" },
//       },
//     },
//   });

//   if (!course) return redirect("/dashboard");


//   return (
//     <div className="p-16">
//       <div className="flex items-center justify-between">
//         <div className="flex flex-col gap-y-2">
//           <h1 className="text-2xl font-bold text-slate-700">📍Estás en el curso: {course.title}</h1>
//           <span className="text-sm text-slate-600">
//             📎 Sube archivos PDF, imágenes, Word, ZIP u otros documentos útiles para el curso.
//           </span>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
//         {/* Subida de archivos */}
//         <div>
//           <div className="flex items-center gap-x-2 mb-4">
//             <IconInsign icon={Paperclip} variant="success" size="sm" />
//             <h2 className="text-sm font-semibold text-slate-800">
//               Agrega material de apoyo para los estudiantes.
//             </h2>
//           </div>

//           <UploadForm courseId={courseId} />
//         </div>

//         {/* Archivos subidos */}
//         <div className="space-y-4">
//           {course.attachments.length > 0 ? (
//             course.attachments.map((file) => (
//               <AttachmentItem
//                 key={file.id}
//                 id={file.id}
//                 name={file.name}
//                 url={file.url}
//                 createdAt={file.createdAt.toISOString()}
//                 updatedAt={file.updatedAt.toISOString()}
//               />
//             ))
//           ) : (
//             <p className="text-slate-500 italic">Aún no hay archivos subidos.</p>
            
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }



// app/dashboard/teacher/attachments/[courseId]/page.tsx
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server"; // Cambiado a nextjs en lugar de nextjs/server
import { redirect } from "next/navigation";
import { UploadForm } from "./_components/form-upload";
import { AttachmentItem } from "./_components/attachment-item";
import { IconInsign } from "@/components/icon-insign";
import { Paperclip } from "lucide-react";

interface AttachmentsPageProps {
  params: Promise<{
    courseId: string;
  }>;
}

export default async function AttachmentsPage({ params }: AttachmentsPageProps) {
  // 1. Resolver los parámetros de la Promise
  const { courseId } = await params;

  if (!courseId) return redirect("/dashboard");

  // 2. Autenticación con Clerk (ahora compatible con middleware)
  const { userId } = await auth(); // Se requiere await porque auth() es asíncrono
  if (!userId) return redirect("/sign-in"); // Redirigir a login

  // 3. Obtener el curso verificando propiedad
  const course = await db.course.findUnique({
    where: { 
      id: courseId,
      userId // Asegura que el usuario es el propietario
    },
    include: {
      attachments: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!course) return redirect("/dashboard");

  return (
    <div className="p-16">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-bold text-slate-700">
            📍Estás en el curso: {course.title}
          </h1>
          <span className="text-sm text-slate-600">
            📎 Sube archivos PDF, imágenes, Word, ZIP u otros documentos útiles para el curso.
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        <div>
          <div className="flex items-center gap-x-2 mb-4">
            <IconInsign icon={Paperclip} variant="success" size="sm" />
            <h2 className="text-sm font-semibold text-slate-800">
              Agrega material de apoyo para los estudiantes.
            </h2>
          </div>
          <UploadForm courseId={courseId} />
        </div>

        <div className="space-y-4">
          {course.attachments.length > 0 ? (
            course.attachments.map((file) => (
              <AttachmentItem
                key={file.id}
                id={file.id}
                name={file.name}
                url={file.url}
                createdAt={file.createdAt.toISOString()}
                updatedAt={file.updatedAt.toISOString()}
              />
            ))
          ) : (
            <p className="text-slate-500 italic">Aún no hay archivos subidos.</p>
          )}
        </div>
      </div>
    </div>
  );
}