import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { FormName } from "./_components/form-name";
import { FormDescription } from "./_components/form-description";
import { FormImage } from "./_components/form-image";
import { ProjectList } from "./projects/project-list";
import { AttachmentList } from "./attachments/attachment-list";

interface ResearchGroupPageProps {
  params: {
    groupId: string;
  };
}

export default async function ResearchGroupPage({ params }: ResearchGroupPageProps) {
  const { userId } = await auth();
  if (!userId) return redirect("/dashboard");

  const group = await db.researchGroup.findUnique({
    where: { id: params.groupId },
  });
  if (!group) return redirect("/dashboard");

  const groupId = params.groupId;

  const projects = await db.researchProject.findMany({
    where: { researchGroupId: groupId },
    orderBy: { createdAt: "desc" },
  });

  const attachments = await db.researchProjectAttachment.findMany({
    where: {
      projectId: {
        in: projects.map((project) => project.id),
      },
    },
    include: {
      project: true, 
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
        Editar semillero: {group.name}
      </h1>

      <FormName initialData={{ name: group.name }} groupId={group.id} />
      <FormDescription initialData={{ description: group.description || "" }} groupId={group.id} />
      <FormImage initialData={group} groupId={group.id} />

      <div>
        <h2 className="text-xl font-semibold mt-8 mb-4 text-slate-700 dark:text-white">Proyectos</h2>
        <ProjectList projects={projects} groupId={groupId} />
      </div>

      <div>
        <h2 className="text-xl font-semibold mt-8 mb-4 text-slate-700 dark:text-white">Archivos por proyecto</h2>
        <AttachmentList attachments={attachments} />
      </div>
    </div>
  );
}
