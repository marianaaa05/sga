import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

import { FormTitle } from "./form-title";
import { FormDescription } from "./form-description";

// interface ProjectPageProps {
//   params: {
//     groupId: string;
//     projectId: string;
//   };
// }

export default async function ProjectPage({ params }: { params: { courseId: string; moduleId: string } }) {
  const { courseId, moduleId } = await params;

  const authResult = await auth();
  const userId = authResult?.userId;

  if (!userId) {
    redirect("/");
  }

  const modulec = await db.researchProject.findUnique({
    where: {
      id: moduleId,
    },
  });

  if (!modulec) {
    redirect(`/dashboard/teacher/courses/${courseId}`);
  }


  return (
   <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">✨Editar módulo: {modulec.title}</h2>
        <p className="text-sm text-slate-600">
          Puedes modificar la información básica del módulo aquí.
        </p>
      </div>

      <FormTitle 
        moduleId={moduleId} 
        initialData={{ title: modulec.title }} 
        />

      <FormDescription
        moduleId={moduleId}
        initialData={{ description: modulec.description || "" }}
      />
    </div>
  );
}
