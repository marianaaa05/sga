import { FormTitle } from "../[moduleId]/_components/form-title";
import { FormDescription } from "../[moduleId]/_components/form-description";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface CreatePageProps {
  params: Promise<{
    moduleId: string;
    courseId: string;
  }>;
}

const CreatePage = async ({ params }: CreatePageProps) => {
  const { moduleId, courseId } = await params;
  const { userId } = await auth();

  if (!userId) {
    return redirect("/dashboard");
  }

  return (
    <div className="p-6 space-y-4">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">
          ✨ Crear nuevo módulo
        </h2>
        <p className="text-sm text-slate-600">
          Completa los campos a continuación para crear un nuevo módulo en el
          curso.
        </p>
      </div>

      <FormTitle courseId={courseId} />
      <FormDescription
        initialData={{ description: null }}
        moduleId={moduleId}
      />
    </div>
  );
};

export default CreatePage;
