import { db } from "@/lib/db";
import { FormTitle } from "./_components/form-title";
import { FormDescription } from "./_components/form-description";

interface CoursePageProps {
  params: Promise<{
    courseId: string;
    moduleId: string;
  }>;
}

const CoursePage = async ({ params }: CoursePageProps) => {
  const { moduleId, courseId } = await params;

  const [modulec] = await Promise.all([
    db.courseModule.findUnique({
      where: {
        id: moduleId,
      },
    }),
  ]);

  if (!modulec) {
    return <div className="p-4">Módulo no encontrado</div>;
  }

  return (
    <div className="p-6 space-y-4">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">
          ✨ Editar módulo {modulec.title}
        </h2>
        <p className="text-sm text-slate-600">
          Puedes modificar la información básica del módulo aquí.
        </p>
      </div>

      <FormTitle
        moduleId={modulec.id}
        courseId={courseId}
        initialData={{ title: modulec.title }}
      />

      <FormDescription
        moduleId={modulec.id}
        initialData={{ description: modulec.description }}
      />

    </div>
  );
};

export default CoursePage;