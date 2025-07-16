import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
// import { getUserRole } from "@/lib/get-user-role";
import { redirect } from "next/navigation";

import { IconInsign } from "@/components/icon-insign";
import { Tags } from "lucide-react";
import { FormCategory } from "./[categoriesId]/_components/form-category";

export default async function CategoriesPage() {
  const { userId } = await auth();

  if (!userId) return redirect("/");

  // const role = await getUserRole();

  // if (role !== "TEACHER" && role !== "WEB_MASTER") {
  //   return redirect("/dashboard"); // 👈 O muestra un mensaje de acceso denegado
  // }

  const categories = await db.category.findMany({
    orderBy: { name: "asc" },
  });

  const courses = await db.course.findMany({
    select: {
      id: true,
      title: true,
      categoryId: true,
    },
    orderBy: { title: "asc" },
  });

  return (
    <div className="p-16">
      <div className="flex items-center justify-between mb-8">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-bold text-slate-700">
            Categorías disponibles
          </h1>
          <span className="text-sm text-slate-600">
            📚 Lista de categorías utilizadas por los cursos
          </span>
        </div>
      </div>

      <div className="flex items-center gap-x-2 mb-4">
        <IconInsign icon={Tags} variant="success" size="sm" />
        <h2 className="text-sm font-semibold text-slate-800">
          Explora o administra las categorías existentes.
        </h2>
      </div>

      <div className="mb-10">
        <FormCategory
          initialCourses={courses}
          initialCategories={categories}
        />
      </div>
    </div>
  );
}
