"use client";

// import { ProjectList } from "./project-list";
import { Button } from "@/components/ui/button";
import { FileTextIcon } from "lucide-react";
// import Link from "next/link";

interface Project {
  id: string;
  title: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface Attachment {
  id: string;
  name: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ProjectSectionProps {
  projects: Project[];
  attachments: Attachment[];
  groupId: string;
}

export const ProjectSection = ({
  // projects,
  attachments,
  // groupId,
}: ProjectSectionProps) => {
  return (
    <div className="space-y-10">
      {/* Sección de Proyectos */}
      {/* <div>
        <h2 className="text-xl font-bold mb-4">Proyectos de Investigación</h2>
        <ProjectList projects={projects} groupId={groupId} />
      </div> */}

      {/* Sección de Archivos */}
      <div>
        <h2 className="text-xl font-bold mb-4">Archivos Subidos</h2>

        {attachments.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Aún no hay archivos subidos.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {attachments.map((file) => (
              <div
                key={file.id}
                className="border border-slate-200 rounded-xl p-4 shadow-sm bg-white"
              >
                <div className="flex items-center gap-x-2 mb-2">
                  <FileTextIcon className="w-5 h-5 text-blue-600" />
                  <h3 className="text-base font-semibold line-clamp-1">
                    {file.name}
                  </h3>
                </div>

                <div className="text-xs text-slate-500 mb-4">
                  Subido el {new Date(file.createdAt).toLocaleDateString()} - Actualizado el{" "}
                  {new Date(file.updatedAt).toLocaleDateString()}
                </div>

                <a href={file.url} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="w-full">
                    Descargar
                  </Button>
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
