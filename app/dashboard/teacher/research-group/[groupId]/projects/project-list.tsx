// "use client";

// import Link from "next/link";
// import { BookIcon } from "lucide-react";
// import { Button } from "@/components/ui/button";

// interface Project {
//   id: string;
//   title: string;
//   description: string | null;
//   createdAt: Date;
//   updatedAt: Date;
// }

// interface ProjectListProps {
//   projects: Project[];
//   groupId: string;
// }

// export const ProjectList = ({ projects, groupId }: ProjectListProps) => {
//   if (projects.length === 0) {
//     return (
//       <p className="text-sm text-muted-foreground">
//         Aún no hay proyectos registrados para este semillero.
//       </p>
//     );
//   }

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
//       {projects.map((project) => (
//         <div
//           key={project.id}
//           className="border border-slate-200 rounded-xl p-4 shadow-sm bg-white"
//         >
//           <div className="flex items-center gap-x-2 mb-2">
//             <BookIcon className="w-5 h-5 text-primary" />
//             <h3 className="text-base font-semibold line-clamp-1">
//               {project.title}
//             </h3>
//           </div>

//           <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
//             {project.description || "Sin descripción"}
//           </p>

//           <div className="text-xs text-slate-500 mb-4">
//             Creado el {new Date(project.createdAt).toLocaleDateString()} - Actualizado el{" "}
//             {new Date(project.updatedAt).toLocaleDateString()}
//           </div>

//           <Link
//             href={`/dashboard/teacher/research-group/${groupId}/projects/${project.id}`}
//           >
//             <Button variant="outline" size="sm" className="w-full">
//               Ver proyecto
//             </Button>
//           </Link>
//         </div>
//       ))}
//     </div>
//   );
// };
