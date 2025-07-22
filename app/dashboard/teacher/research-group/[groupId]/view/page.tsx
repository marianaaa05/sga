import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  FileText, FileImage, FileArchive, FileCode, Youtube, FilePlus2
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResearchGroupViewPageProps {
  params: {
    groupId: string;
  };
}

const getIconByExtension = (name: string) => {
  const ext = name.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "pdf": return <FileText className="text-red-600 w-5 h-5" />;
    case "doc":
    case "docx": return <FileText className="text-blue-600 w-5 h-5" />;
    case "png":
    case "jpg":
    case "jpeg": return <FileImage className="text-green-600 w-5 h-5" />;
    case "zip":
    case "rar": return <FileArchive className="text-yellow-600 w-5 h-5" />;
    case "js":
    case "ts":
    case "json": return <FileCode className="text-purple-600 w-5 h-5" />;
    default: return <Youtube className="text-red-600 w-5 h-5" />;
  }
};

export default async function ResearchGroupViewPage({ params }: ResearchGroupViewPageProps) {
  const { userId } = await auth();
  if (!userId) return redirect("/dashboard");

  const group = await db.researchGroup.findUnique({
    where: { id: params.groupId },
    include: {
      attachments: {
        orderBy: { createdAt: "desc" }
      },
      projects: {
        include: {
          attachments: {
            orderBy: { createdAt: "desc" }
          }
        }
      }
    }
  });

  if (!group) return redirect("/dashboard");

  return (
    <div className="p-6 space-y-10">
      {/* Archivos del Semillero */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
          📁 Archivos del Semillero: {group.name}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Aquí puedes visualizar o subir archivos relacionados directamente al semillero.
        </p>

        <div className="flex justify-end">
          <Link href={`/dashboard/teacher/research-group/${group.id}/attachments`}>
            <Button variant="neonPurple" size="sm" className="font-bold">
              <FilePlus2 className="mr-2 w-4 h-4" />
              Subir Archivos
            </Button>
          </Link>
        </div>

        {group.attachments.length === 0 ? (
          <p className="italic text-slate-500">
            Este semillero aún no tiene archivos.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {group.attachments.map((file) => (
              <div key={file.id} className="border bg-gradient-to-br from-slate-100 to-slate-300 dark:from-slate-800 dark:to-slate-700 p-4 rounded-md shadow-sm">
                <div className="flex items-center gap-x-2 mb-2">
                  <div className="w-6 h-6 flex-shrink-0">{getIconByExtension(file.name)}</div>
                  <h2 className="text-base font-semibold truncate text-slate-800 dark:text-white">{file.name}</h2>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Subido el {new Date(file.createdAt).toLocaleDateString()}<br />
                  Actualizado el {new Date(file.updatedAt).toLocaleDateString()}
                </p>
                <Link
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline block mt-2"
                >
                  Ver o descargar archivo
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {group.projects.map((project) => (
        <div key={project.id} className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
              📌 Proyecto: {project.title}
            </h2>
            {/* app\dashboard\teacher\research-group\[groupId]\projects\[projectId]\attachments\form-upload.tsx */}
            <Link href={`/dashboard/teacher/research-group/${group.id}/projects/${project.id}/attachments/form-upload`}>
              <Button size="sm" variant="ghost" className="text-sm text-blue-600 underline">
                Subir archivo al proyecto
              </Button>
            </Link>
          </div>

          {project.attachments.length === 0 ? (
            <p className="text-sm italic text-slate-500">
              Este proyecto no tiene archivos aún.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {project.attachments.map((file) => (
                <div key={file.id} className="border bg-gradient-to-br from-slate-100 to-slate-300 dark:from-slate-800 dark:to-slate-700 p-4 rounded-md shadow-sm">
                  <div className="flex items-center gap-x-2 mb-2">
                    <div className="w-6 h-6 flex-shrink-0">{getIconByExtension(file.name)}</div>
                    <h2 className="text-base font-semibold truncate text-slate-800 dark:text-white">{file.name}</h2>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Subido el {new Date(file.createdAt).toLocaleDateString()}<br />
                    Actualizado el {new Date(file.updatedAt).toLocaleDateString()}
                  </p>
                  <Link
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline block mt-2"
                  >
                    Ver o descargar archivo
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
