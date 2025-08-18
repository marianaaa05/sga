import { db } from "@/lib/db";
import { FormTitle } from "./_components/form-title";
import { FormDescription } from "./_components/form-description";
import { FormCategory } from "./_components/form-category";

interface ProjectPageProps {
  params: Promise<{
    groupId: string;
    projectId: string;
  }>;
}

const ProjectPage = async ({ params }: ProjectPageProps) => {
  // Esperar a que los parámetros se resuelvan
  const { projectId, groupId } = await params;

  // Obtener proyecto y categorías en paralelo para mejor rendimiento
  const [project, categories] = await Promise.all([
    db.researchProject.findUnique({
      where: {
        id: projectId,
      },
    }),
    db.category.findMany({
      orderBy: {
        name: "asc",
      },
    }),
  ]);

  if (!project) {
    return <div className="p-4">Proyecto no encontrado</div>;
  }

  return (
    <div className="p-6 space-y-4">
      <FormTitle
        projectId={project.id}
        groupId={groupId}
        initialData={{ title: project.title }}
      />

      <FormDescription
        projectId={project.id}
        initialData={{ description: project.description }}
      />

      <FormCategory
        projectId={project.id}
        initialData={{ categoryId: project.categoryId || "" }}
        categories={categories}
      />
    </div>
  );
};

export default ProjectPage;