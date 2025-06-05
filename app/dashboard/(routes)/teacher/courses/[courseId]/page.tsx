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
    <div>
      <p>Curso {params.courseId}</p>
    </div>
  );
};

export default CourseIdPage;