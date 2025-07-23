import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Eye, UserPen, FilePlus2 } from "lucide-react";
import Link from "next/link";

export default async function ResearchGroupsPage() {
  const groups = await db.researchGroup.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-5 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-slate-800">
          📍 Semilleros de Investigación de Ingeniería Informática AUNAR
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {groups.map((group) => (
          <div
            key={group.id}
            className="border bg-gradient-to-br from-slate-100 to-slate-300 dark:from-slate-800 dark:to-slate-700 rounded-md shadow-sm bg-white p-4"
          >
            <img
              src={group.imageUrl || "/default.png"}
              alt={group.name}
              className="w-full h-80 object-cover rounded-md mb-3"
            />
            <h2 className="text-lg font-semibold text-slate-800">
              {group.name}
            </h2>
            <p className="text-sm text-slate-600 mb-1">
              {group.description || "Sin descripción"}
            </p>
            <p className="text-xs text-slate-500">
              Fecha de creación:{" "}
              {new Date(group.createdAt).toLocaleDateString()}
            </p>

            <div className="mt-3 space-y-2">
             
              <div className="flex flex-col md:flex-row gap-2">
                <Link href={`/dashboard/teacher/research-group/${group.id}`}>
                  <Button
                    variant="cyberGradient"
                    size="sm"
                    className="font-bold w-full md:w-auto"
                  >
                    <UserPen className="mr-2 w-4 h-4" />
                    Editar
                  </Button>
                </Link>
                <Link
                  href={`/dashboard/teacher/research-group/${group.id}/view`}
                >
                  <Button
                    variant="cyberGradient"
                    size="sm"
                    className="font-bold w-full md:w-auto"
                  >
                    <Eye className="mr-2 w-4 h-4" />
                    Ver semillero
                  </Button>
                </Link>
              </div>

             
              <div className="flex flex-col md:flex-row gap-2">
                <Link
                  href={`/dashboard/teacher/research-group/${group.id}/attachments`}
                >
                  <Button
                    variant="cyberGradient"
                    size="sm"
                    className="font-bold w-full md:w-auto"
                  >
                    <FilePlus2 className="mr-2 w-4 h-4" />
                    Subir Archivos
                  </Button>
                </Link>
                <Link
                  href={`/dashboard/teacher/research-group/${group.id}/projects/create`}
                >
                  <Button
                    variant="cyberGradient"
                    size="sm"
                    className="font-bold w-full md:w-auto"
                  >
                    <FilePlus2 className="mr-2 w-4 h-4" />
                    Crear Proyecto
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
