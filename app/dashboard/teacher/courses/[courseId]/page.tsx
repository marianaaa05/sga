import { IconInsign } from "@/components/icon-insign";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { PanelsLeftBottom } from "lucide-react";
import { redirect } from "next/navigation";
import { FormTitle } from "./_components/form-title";

interface CourseIdPageProps {
  params: {
    courseId: string;
  };
}

// const CourseIdPage = async ({ 
//   params,
//   }: CourseIdPageProps) => {
export default async function CourseIdPage({ params }: CourseIdPageProps) {
  // Extract courseId from params
    const courseId = params.courseId;
  
  if (!courseId) {
    return redirect("/dashboard");
  }

  const { userId } = await auth();

  if (!userId) {
    return redirect("/dashboard");
  }

  const course = await db.course.findUnique({
    where: {
      id: courseId,
    },
  });

  if (!course) {
    return redirect("/dashboard");
  }

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.categoryId,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completedText = `${completedFields} / ${totalFields}`;

  return (
    <div className="p-16">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-bold text-slate-700">Curso en construcción</h1>
          <span className="text-sm text-slate-600">
            🎯Complete todos los campos requeridos para publicar el curso{" "}
            {completedText}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-18">
        <div>
          <div className="flex items-center gap-x-2">
            <IconInsign icon={PanelsLeftBottom} variant="success" size="sm" />
            <h2 className="text-sm font-semibold text-slate-800">
              Personaliza tu curso para que sea único y atractivo para tus
              estudiantes.
            </h2>
          </div>
          <FormTitle 
            initialData={{title: ""}} 
            courseId={courseId} />
        </div>
      </div>
    </div>
  );
};

// export default CourseIdPage;
