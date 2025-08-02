import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

import { FormTitle } from "./form-title";
import { FormDescription } from "./form-description";
import { FormCategory } from "./form-category";

// interface ProjectPageProps {
//   params: {
//     groupId: string;
//     projectId: string;
//   };
// }

export default async function ProjectPage({ params }: { params: { groupId: string; projectId: string } }) {
  const { groupId, projectId } = await params;

  const authResult = await auth();
  const userId = authResult?.userId;

  if (!userId) {
    redirect("/");
  }

  const project = await db.researchProject.findUnique({
    where: {
      id: projectId,
    },
  });

  if (!project) {
    redirect(`/dashboard/teacher/research-group/${groupId}`);
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">✨Editar proyecto: {project.title}</h2>
        <p className="text-sm text-slate-600">
          Puedes modificar la información básica del proyecto aquí.
        </p>
      </div>

      <FormTitle projectId={projectId} initialData={{ title: project.title }} />

      <FormDescription
        projectId={projectId}
        initialData={{ description: project.description || "" }}
      />

      <FormCategory
        projectId={projectId}
        initialData={{ categoryId: project.categoryId }}
        categories={categories}
      />
    </div>
  );
}
