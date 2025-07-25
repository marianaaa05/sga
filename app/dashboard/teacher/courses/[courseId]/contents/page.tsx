import { db } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {
  FileText,
  FileImage,
  FileArchive,
  FileCode,
  Youtube,
  FilePlus2,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ContentsPageProps {
  params: { courseId: string };
}

const getIconByExtension = (name: string) => {
  const ext = name.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "pdf":
      return <FileText className="text-red-600 w-5 h-5" />;
    case "doc":
    case "docx":
      return <FileText className="text-blue-600 w-5 h-5" />;
    case "png":
    case "jpg":
    case "jpeg":
      return <FileImage className="text-green-600 w-5 h-5" />;
    case "zip":
    case "rar":
      return <FileArchive className="text-yellow-600 w-5 h-5" />;
    case "js":
    case "ts":
    case "json":
      return <FileCode className="text-purple-600 w-5 h-5" />;
    default:
      return <Youtube className="text-red-600 w-5 h-5" />;
  }
};

export default async function CourseContentsPage({ params }: ContentsPageProps) {
  const { userId } = await auth();
  if (!userId) return redirect("/dashboard");

  const user = await currentUser();
  const role = user?.publicMetadata?.role as string | undefined;

  const course = await db.course.findUnique({
    where: { id: params.courseId },
    select: {
      id: true,
      title: true,
      userId: true,
      isPublished: true,
      attachments: {
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          url: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });
  if (!course) return redirect("/dashboard");

  if (course.userId !== userId) {
    const membership = await db.membership.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId: course.id,
        },
      },
    });
    if (!membership) return redirect("/dashboard");
  }

  return (
    <div className="p-6 space-y-8">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
          🧑‍🎓 Curso{" "}
          <span className="text-purple-700 dark:text-purple-400">
            {course.title}
          </span>
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          😊 Aquí puedes visualizar los archivos y recursos del curso.
        </p>

        {(role === "TEACHER" || role === "WEB_MASTER" || course.userId === userId) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            <Link href={`/dashboard/teacher/attachments/${course.id}`}>
              <Button
                variant="neonPurple"
                size="sm"
                className="w-full font-bold"
              >
                <FilePlus2 className="mr-2 w-4 h-4" />
                Subir Archivos
              </Button>
            </Link>
          </div>
        )}
      </div>

      {course.attachments.length === 0 ? (
        <p className="italic text-slate-500">
          Este curso no tiene contenido aún.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {course.attachments.map((file) => (
            <div
              key={file.id}
              className="border bg-gradient-to-br from-slate-100 to-slate-300 dark:from-slate-800 dark:to-slate-700 p-4 rounded-md shadow-sm"
            >
              <div className="flex items-center gap-x-2 mb-2">
                <div className="w-6 h-6 flex-shrink-0">
                  {getIconByExtension(file.name)}
                </div>
                <h2 className="text-base font-semibold truncate text-slate-800 dark:text-white">
                  {file.name}
                </h2>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Subido el {new Date(file.createdAt).toLocaleDateString()}
                <br />
                Actualizado el {new Date(file.updatedAt).toLocaleDateString()}
              </p>
              <Link
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline block mt-2"
              >
                Ver o descargar archivo
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
