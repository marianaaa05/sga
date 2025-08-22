import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/clerk-sdk-node";
import type { User } from "@clerk/clerk-sdk-node";
import { redirect } from "next/navigation";
import Link from "next/link";
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
import { Button } from "@/components/ui/button";

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

export default async function ResearchGroupViewPage({
  params,
}: {
  params: Promise<{ groupId: string }>;
}) {
  const { groupId } = await params;
  const { userId } = await auth();
  if (!userId) return redirect("/dashboard");

  const group = await db.researchGroup.findUnique({
    where: { id: groupId },
    include: {
      attachments: { orderBy: { createdAt: "asc" } },
      projects: {
        include: {
          attachments: { orderBy: { createdAt: "asc" } },
          category: true,
        },
      },
    },
  });

  if (!group) return redirect("/dashboard");

  const creatorIds = Array.from(
    new Set(
      group.projects.map((p) => p.createdBy).filter((id): id is string => !!id)
    )
  );

  const creators: User[] = await Promise.all(
    creatorIds.map((id) => clerkClient.users.getUser(id))
  );

  const creatorInfo = new Map<string, { name: string; email: string }>();

  creators.forEach((u) => {
    const fullName = [u.firstName, u.lastName].filter(Boolean).join(" ");

    const email =
      u.emailAddresses.find((e) => e.id === u.primaryEmailAddressId)
        ?.emailAddress ||
      u.emailAddresses[0]?.emailAddress ||
      "Correo no disponible";

    creatorInfo.set(u.id, {
      name: fullName || u.username || "Usuario desconocido",
      email,
    });
  });

  const teacherEmails: Record<string, string> = {
    "01": "raul.pena@aunar.edu.co", //Kernel
    "02": "cristhian.villota@aunar.edu.co", //Sinapsis
    "03": "santiagodavidlopez02468@gmail.com", //Animus hacking
  };

  const teacherEmail = group?.id ? teacherEmails[group.id] : undefined;

  function AttachmentButton({
    att,
    type,
  }: {
    att: { id: string; name: string; url: string };
    type: "group" | "project";
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
          👾 Semillero{" "}
          <span className="text-purple-700 dark:text-purple-400">
            {group.name}
          </span>
        </h1>

        <p className="text-sm font-bold text-slate-600 dark:text-white flex items-center gap-2">
          {group.description}
        </p>

        {teacherEmail && (
          <p className="text-sm text-slate-600 font-bold dark:text-slate-300">
            ¿Tienes dudas o inquietudes sobre el semillero? Contacta al
            instructor:{" "}
            <a
              href={`mailto:${teacherEmail}?subject=Consulta sobre el semillero ${group.name} en SKAHverse`}
              className="text-blue-600 hover:underline"
            >
              {teacherEmail}
            </a>
          </p>
        )}

        <p className="text-sm text-slate-600 dark:text-slate-300">
          Aquí puedes visualizar o gestionar archivos relacionados directamente
          al semillero o un proyecto.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
          <Link
            href={`/dashboard/skahverse/research-group/${groupId}/attachments`}
          >
            <Button variant="neonPurple" size="sm" className="w-full font-bold">
              <Anchor className="mr-2 w-4 h-4" />
              Gestionar Archivos Anclados
            </Button>
          </Link>

          <Link
            href={`/dashboard/skahverse/research-group/${groupId}/projects/create`}
          >
            <Button variant="neonPurple" size="sm" className="w-full font-bold">
              <FilePlus2 className="mr-2 w-4 h-4" />
              Crear Proyecto
            </Button>
          </Link>
        </div>

        <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
          ⚓ Archivos anclados
        </h2>

        {group.attachments.length === 0 ? (
          <p className="italic text-slate-500">
            Este semillero aún no tiene archivos anclados.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {group.attachments.map((file) => (
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
                <AttachmentButton att={file} type="group" />
              </div>
            ))}
          </div>
        )}
      </div>

      {group.projects.map((project) => (
        <div key={project.id} className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
              🚀 Proyecto: {project.title}
              <span className="text-sm text-slate-600 font-normal block mt-1">
                <p className="text-sm text-slate-600 font-bold dark:text-slate-300">
                  {project.description}
                </p>
                <div className="w-full h-0.5 bg-gradient-to-r from-[#00ccff] via-[#ff00ff] to-[#ff6600] dark:from-slate-600 dark:via-slate-500 dark:to-slate-400 rounded-full my-4 shadow-sm" />
                <p className="text-sm text-slate-600 font-semibold">
                  Categoría:{" "}
                  <span className="text-sm text-slate-600 font-normal">
                    {project.category?.name || "Sin categoría"}
                  </span>
                </p>

                {project.createdBy && creatorInfo.has(project.createdBy) && (
                  <>
                    <p className="text-sm text-slate-600 font-semibold dark:text-slate-300">
                      Creado por:{" "}
                      <span className="text-slate-600 font-normal dark:text-white">
                        {creatorInfo.get(project.createdBy)?.name}
                      </span>
                    </p>

                    {creatorInfo.get(project.createdBy)?.email && (
                      <p className="text-sm text-slate-600 font-semibold dark:text-slate-300">
                        Contacto:{" "}
                        <a
                          href={`mailto:${
                            creatorInfo.get(project.createdBy)?.email
                          }?subject=Consulta sobre el proyecto: ${
                            project.title
                          } del semillero ${group.name} en SKAHverse`}
                          className="text-blue-600 hover:underline"
                        >
                          {creatorInfo.get(project.createdBy)?.email}
                        </a>
                      </p>
                    )}
                  </>
                )}
              </span>
            </h2>

            <Link
              href={`/dashboard/skahverse/research-group/${groupId}/projects/${project.id}/attachments/form-upload`}
              className="w-full sm:w-auto"
            >
              <Button
                size="sm"
                variant="ghost"
                className="text-sm text-blue-600 underline w-full sm:w-auto"
              >
                Gestionar contenido del proyecto
              </Button>
            </Link>
          </div>

          {project.attachments.length === 0 ? (
            <p className="text-sm italic text-slate-500">
              Este proyecto aún no tiene archivos.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {project.attachments.map((file) => (
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
                    Actualizado el{" "}
                    {new Date(file.updatedAt).toLocaleDateString()}
                  </p>
                  <AttachmentButton att={file} type="project" />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
