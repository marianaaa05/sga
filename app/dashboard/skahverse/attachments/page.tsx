import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FilePlus2 } from "lucide-react";
import Image from "next/image";

export default async function AttachmentsBasePage() {
  const { userId } = await auth();

  if (!userId) return redirect("/");

  const courses = await db.course.findMany({
    where: { userId },
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
        <div>
          <h1 className="text-xl font-bold text-slate-800">Selecciona un curso</h1>
          <p className="text-slate-500 text-sm">
            Elige el curso al que deseas subir archivos adjuntos (PDF, imágenes, Word, etc.).
          </p>
        </div>
        <Link href="/dashboard/skahverse/courses/create">
          <Button variant="neonPurple" size="sm">
            Nuevo Curso
          </Button>
        </Link>
      </div>

      {courses.length === 0 ? (
        <p className="text-slate-500 italic">No tienes cursos creados aún.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <div
              key={course.id}
              className="border bg-gradient-to-br from-slate-100 to-slate-300 dark:from-slate-800 dark:to-slate-700 rounded-md shadow-sm bg-white p-4"
            >
              <Image
                width={300}
                height={200}
                src={course.imageUrl ?? "/default.png"}
                alt={course.title}
                className="w-full h-60 object-cover rounded-md mb-3"
              />
              <h2 className="text-lg font-semibold text-slate-800">
                {course.title}
              </h2>
              <p className="text-sm text-slate-600 mb-1">
                {course.description || "Sin descripción."}
              </p>
              <p className="text-xs text-slate-500">
                Categoría: {course.category?.name || "Sin categoría"}
              </p>
              <p className="text-xs text-slate-500">
                Estado: {course.isPublished ? "Publicado" : "No publicado"}
              </p>
              <p className="text-xs text-slate-500">
                Fecha de creación: {new Date(course.createdAt).toLocaleDateString()}
              </p>

              <div className="mt-3">
                <Link href={`/dashboard/skahverse/attachments/${course.id}`}>
                  <Button 
                    variant="cyberGradient" 
                    size="sm" 
                    className="font-bold w-full"
                  >
                    <FilePlus2 className="mr-2 w-4 h-4" />
                    Subir Archivos
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
