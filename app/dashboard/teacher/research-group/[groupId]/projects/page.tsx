//listado de proyectos del semillero
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eye, FilePlus2, UserPen } from "lucide-react";

interface ProjectsPageProps {
  params: {
    groupId: string;
  };
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { userId } = await auth();

  if (!userId) return redirect("/dashboard");

  const groupId = params.groupId;


  if (!groupId) return redirect("/dashboard");

  const projects = await db.researchProject.findMany({
    where: {
      researchGroupId: groupId,
    },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-5 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-slate-800">
          Proyectos del semillero
        </h1>
        <Link href={`/dashboard/teacher/research-group/${groupId}/projects/create`}>
          <Button variant="neonPurple" size="sm">
            Nuevo Proyecto
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="border bg-gradient-to-br from-slate-100 to-slate-300 dark:from-slate-800 dark:to-slate-700 rounded-md shadow-sm bg-white p-4"
          >

            <h2 className="text-lg font-semibold text-slate-800">
              {project.title}
            </h2>
            <p className="text-sm text-slate-600 mb-1">
              {project.description || "Sin descripción"}
            </p>
            <p className="text-xs text-slate-500">
              Categoría: {project.category?.name || "Sin categoría"}
            </p>
            <p className="text-xs text-slate-500">
              Fecha creación:{" "}
              {new Date(project.createdAt).toLocaleDateString()}
            </p>

          
            <div className="mt-3">
              <Link
                href={`/dashboard/teacher/research-group/${groupId}/projects/${project.id}`}
              >
                <Button variant="cyberGradient" size="sm" className="font-bold w-full">
                  <UserPen size={4} />
                  Editar
                </Button>
              </Link>
            </div>

         
            <div className="mt-3">
              <Link
                href={`/dashboard/teacher/research-group/${groupId}/projects/${project.id}/attachments`}
              >
                <Button variant="cyberGradient" size="sm" className="font-bold w-full">
                  <FilePlus2 className="mr-2 w-4 h-4" />
                  Subir Archivos
                </Button>
              </Link>
            </div>

           
            <div className="mt-3">
              <Link
              // http://localhost:3000/dashboard/teacher/research-group/01/projects/001
                href={`/dashboard/teacher/research-group/${groupId}/projects/${project.id}/edit`}
              >
                <Button variant="cyberGradient" size="sm" className="font-bold w-full">
                  <Eye className="mr-2 w-4 h-4" />
                  Editar proyecto
                </Button>
              </Link>
            </div>

        
            <div className="mt-3">
              <Link
                href={`/dashboard/teacher/research-group/${groupId}/projects/${project.id}/view`}
              >
                <Button variant="cyberGradient" size="sm" className="font-bold w-full">
                  <Eye className="mr-2 w-4 h-4" />
                  Ver proyecto
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
