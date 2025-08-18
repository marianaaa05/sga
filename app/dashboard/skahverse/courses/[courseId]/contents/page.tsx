import { db } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/clerk-sdk-node";
import { redirect } from "next/navigation";
import {
  FileText,
  FileImage,
  FileArchive,
  Link as LinkIcon,
  FilePlus2,
  Anchor,
  FileChartPie,
  Text,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ContentsPageProps {
  params: Promise<{ courseId: string }>;
}

const getIconByExtension = (name: string) => {
  const ext = name.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "pdf":
      return <FileText className="text-red-600 w-5 h-5" />;
    case "pptx":
      return <FileChartPie className="text-orange-600 w-5 h-5" />;
    case "doc":
    case "docx":
      return <FileText className="text-blue-600 w-5 h-5" />;
    case "txt":  
      return <Text className="text-blue-600 w-5 h-5" />;
    case "xlsx":
    case "xls":
    case "csv":  
      return <FileText className="text-green-600 w-5 h-5" />;
    case "png":
    case "jpg":
    case "jpeg":
      return <FileImage className="text-green-600 w-5 h-5" />;
    case "zip":
    case "rar":
    case "7z":  
      return <FileArchive className="text-yellow-600 w-5 h-5" />;
    default:
      return <LinkIcon className="text-blue-600 w-5 h-5" />;
  }
};

export default async function CourseContentsPage({
  params,
}: ContentsPageProps) {
  const { courseId } = await params;
  const { userId } = await auth();
  if (!userId) return redirect("/dashboard");

  const user = await currentUser();
  const role = user?.publicMetadata?.role as string | undefined;

  const course = await db.course.findUnique({
    where: { id: courseId },
    select: {
      id: true,
      title: true,
      userId: true,
      isPublished: true,
      description: true,
      category: { select: { name: true } },
      attachments: {
        orderBy: { createdAt: "asc" },
        select: {
          id: true,
          name: true,
          url: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      modules: {
        orderBy: { createdAt: "asc" },
        select: {
          id: true,
          title: true,
          description: true,
          createdAt: true,
          attachments: {
            orderBy: { createdAt: "asc" },
            select: {
              id: true,
              name: true,
              url: true,
              createdAt: true,
              updatedAt: true,
            },
          },
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
    if (!membership && role === "STUDENT") return redirect("/dashboard");
  }

  let creatorName = "Usuario desconocido";
  let creatorEmail = "";
  if (course.userId) {
    try {
      const clerkUser = await clerkClient.users.getUser(course.userId);

      const full = [clerkUser.firstName, clerkUser.lastName]
        .filter(Boolean)
        .join(" ");
      creatorName =
        full ||
        clerkUser.username ||
        clerkUser.emailAddresses?.[0]?.emailAddress ||
        "Usuario desconocido";

      creatorEmail = clerkUser.emailAddresses?.[0]?.emailAddress || "";
    } catch (err) {
      console.warn("No se pudo obtener el usuario creador desde Clerk:", err);
      creatorName = "Usuario desconocido";
    }
  }

  function AttachmentButton({
    att,
    type,
  }: {
    att: { id: string; name: string; url: string };
    type: "course" | "module";
  }) {
    const isFile = att.url.includes("/storage/v1/object/public/attachments/");

    return isFile ? (
      <Button
        variant="ghost"
        className="text-blue-600 font-normal"
        title="Descargar archivo"
        asChild
      >
        <a href={`/api/generic-download/${type}/${att.id}/download`}>
          Descargar
        </a>
      </Button>
    ) : (
      <Button
        variant="ghost"
        className="text-blue-600 font-normal"
        title="Visualizar"
        asChild
      >
        <a href={att.url} target="_blank" rel="noopener noreferrer">
          Visualizar
        </a>
      </Button>
    );
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

      <p className="text-sm font-bold text-slate-600 dark:text-slate-300">
        {course.description || "Sin descripción"}
      </p>

      <p className="text-sm text-slate-600 font-semibold">
        Categoría:{" "}
        <span className="text-sm text-slate-600 font-normal">
        {course.category?.name || "Sin categoría"}
        </span>
      </p>

      <p className="text-sm text-slate-600 font-semibold">
        Creado por:{" "}
        <span className="text-sm text-slate-600 font-normal">
          {creatorName}
        </span> 
      </p>
      {creatorEmail && (
        <p className="text-sm text-slate-600 font-bold dark:text-slate-300">
          ¿Tienes dudas o inquietudes sobre el curso? Contáctame:{" "}
          <a
            href={`mailto:${creatorEmail}?subject=Consulta sobre el curso: ${course.title} en SKAHverse`}
            className="text-blue-600 hover:underline"
          >
            {creatorEmail}
          </a>
        </p>
      )}

      {(role === "TEACHER" ||
        role === "WEB_MASTER" ||
        course.userId === userId) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
          <Link href={`/dashboard/skahverse/attachments/${course.id}`}>
            <Button variant="neonPurple" size="sm" className="w-full font-bold">
              <Anchor className="mr-2 w-4 h-4" />
              Gestionar Archivos Anclados
            </Button>
          </Link>
          <Link href={`/dashboard/skahverse/courses/${course.id}/course-module/create`}>
            <Button variant="neonPurple" size="sm" className="w-full font-bold">
              <FilePlus2 className="mr-2 w-4 h-4" />
              Crear Módulo
            </Button>
          </Link>
        </div>
      )}
    </div>

    <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
      ⚓ Archivos anclados
    </h2>

    {course.attachments.length === 0 ? (
      <p className="italic text-slate-500">
        Este curso aún no tiene archivos anclados.
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
            <AttachmentButton att={file} type="course" />
          </div>
        ))}
      </div>
    )}

    {course.modules.length === 0 && (
      <p className="italic text-slate-500">Este curso aún no tiene módulos.</p>
    )}

    <div className="space-y-8 mt-8">
      {course.modules.map((module, index) => (
        <div key={module.id} className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
              📘 Módulo {index + 1}: {module.title}
              <span className="text-sm text-slate-600 font-normal block mt-1">
                <p className="text-sm text-slate-600 font-bold dark:text-slate-300">
                  {module.description || "Sin descripción"}
                </p>
                <div className="w-full h-0.5 bg-gradient-to-r from-[#00ccff] via-[#ff00ff] to-[#ff6600] dark:from-slate-600 dark:via-slate-500 dark:to-slate-400 rounded-full my-4 shadow-sm" />
                <p className="text-sm text-slate-600 font-semibold">
                  Creado el:{" "}
                  <span className="font-normal">
                    {new Date(module.createdAt).toLocaleDateString()}
                  </span>
                </p>
              </span>
            </h2>

            {(role === "TEACHER" || course.userId === userId) && (
              <Link
                href={`/dashboard/skahverse/courses/${courseId}/course-module/${module.id}/attachments/form-upload`}
                className="w-full sm:w-auto"
              >
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-sm text-blue-600 underline w-full sm:w-auto"
                >
                  Gestionar contenido del módulo
                </Button>
              </Link>
            )}
          </div>

          {module.attachments.length === 0 ? (
            <p className="text-sm italic text-slate-500">
              Este módulo aún no tiene archivos.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {module.attachments.map((file) => (
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
                  <AttachmentButton att={file} type="module" />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);

}
