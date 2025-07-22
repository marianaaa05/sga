//pagina principal de edicion del proyecto
import { db } from "@/lib/db";
import { FormTitle } from "./_components/form-title";
import { FormDescription } from "./_components/form-description";
import { FormCategory } from "./_components/form-category";

interface ProjectPageProps {
  params: {
    groupId: string;
    projectId: string;
  };
}

const ProjectPage = async ({ params }: ProjectPageProps) => {
  const { projectId } = params;

  const project = await db.researchProject.findUnique({
    where: {
      id: projectId,
    },
  });

  if (!project) {
    return <div className="p-4">Proyecto no encontrado</div>;
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

 return (
    <div className="p-6 space-y-4">
      <FormTitle
        projectId={project.id}
        groupId={params.groupId}
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