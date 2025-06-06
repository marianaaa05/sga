/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const CourseIdPage = async({
  params,
}: {
  params: {
    courseId: string;
  };
}) => {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/dashboard");
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
  });

  if (!course) {
    return redirect("/dashboard");
  }

  const requiredFields= [
    course.title,
    course.description,
    course.imageUrl,
    course.categoryId
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completedText = `${completedFields} / ${totalFields}`;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-bold">Curso en construcción</h1>
          <span className="text-sm text-slate-600">
            Complete todos los campos requeridos para publicar el curso {" "}
            {completedText}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CourseIdPage;