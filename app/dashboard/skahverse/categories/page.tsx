import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { IconInsign } from "@/components/icon-insign";
import { Tags } from "lucide-react";
import { FormCategory } from "./[categoriesId]/_components/form-category";

export default async function CategoriesPage({ params }: { params: Promise<{ categoriesId: string }> }) {
  await params;
  const { userId } = await auth();

  if (!userId) return redirect("/dashboard");

  const categories = await db.category.findMany({
    orderBy: { name: "asc" },
    include: {
      courses: { select: { id: true, title: true } },
      projects: { select: { id: true, title: true } },
    },
  });

  const courses = await db.course.findMany({
    select: {
      id: true,
      title: true,
      categoryId: true,
    },
    orderBy: { title: "asc" },
  });

  const researchPeojects = await db.researchProject.findMany({
    select: {
      id: true,
      title: true,
      categoryId: true,
    },
    orderBy: { title: "asc" },
  });

  return (
  <div className="p-4 sm:p-8 lg:p-16">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
      <div className="flex flex-col gap-y-2">
        <h1 className="text-2xl font-bold text-slate-700">
          📚 Gestión de categorías
        </h1>
        <span className="text-sm text-slate-600">
          Gestiona las categorías de cursos y proyectos de investigación.
        </span>
      </div>
    </div>

    <div className="flex items-center gap-x-2 mb-4">
      <IconInsign icon={Tags} variant="success" size="sm" />
      <h2 className="text-sm font-semibold text-slate-800">
        Explora o administra las categorías existentes.
      </h2>
    </div>

    <div className="mb-10 w-full">
      <FormCategory
        initialCourses={courses}
        initialResearchProjects={researchPeojects}
        initialCategories={categories}
      />
    </div>
  </div>
);
}