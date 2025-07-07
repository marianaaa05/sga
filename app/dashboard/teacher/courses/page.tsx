/* eslint-disable @next/next/no-img-element */
// import { Button } from "@/components/ui/button";
// import Link from "next/link";

// const CoursesPage = () => {
//   return (
//       <div className="p-5">
//         {/* ruta para crear un curso */}
//        <Link href="/dashboard/teacher/courses/create">
//          <Button variant={"neonPurple"} size="sm">
//            Nuevo Curso
//          </Button>
//        </Link>
//       </div>
//    );
// }

// export default CoursesPage;

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { UserPen } from "lucide-react";
import Link from "next/link";

const CoursesPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/dashboard");
  }

  const courses = await db.course.findMany({
    where: {
      userId,
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
      <div className="flex justify-between items-center mb-6 ">
        <h1 className="text-xl font-bold text-slate-800">Cursos creados</h1>
        <Link href="/dashboard/teacher/courses/create">
          <Button variant={"neonPurple"} size="sm">
            Nuevo Curso
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {courses.map((course) => (
          <div
            key={course.id}
            className="border bg-gradient-to-br from-slate-100 to-slate-300 dark:from-slate-800 dark:to-slate-700 rounded-md shadow-sm bg-white p-4"
          >
            <img
              src={course.imageUrl !== null ? course.imageUrl : "/default.png"}
              alt={course.title}
              className="w-full h-80 object-cover rounded-md mb-3"
            />
            <h2 className="text-lg font-semibold text-slate-800">
              {course.title}
            </h2>
            <p className="text-sm text-slate-600 mb-1">{course.description}</p>
            <p className="text-xs text-slate-500">
              Categoría: {course.category?.name || "Sin categoría"}
            </p>
            <p className="text-xs text-slate-500">
              Estado: {course.isPublished ? "Publicado" : "No publicado"}
            </p>
            <p className="text-xs text-slate-500">
              Fecha creación: {new Date(course.createdAt).toLocaleDateString()}
            </p>

            <div className="mt-3">
              <Link href={`/dashboard/teacher/courses/${course.id}`}>
                <Button 
                   variant="cyberGradient" 
                   size="sm" 
                   className="font-bold">
                  <UserPen size={4} />
                  Editar
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;
