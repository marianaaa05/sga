import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { JoinButton } from "@/components/join-button";
import { Button } from "@/components/ui/button";
import { Eye, UserPen, FilePlus2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default async function ResearchGroupsPage() {
  const user = await currentUser();
  const userId = user?.id;
  const role = user?.publicMetadata.role as string | undefined;

  const groups = await db.researchGroup.findMany({
    orderBy: { createdAt: "desc" },
  });

  const membershipRecs = userId
    ? await db.membership.findMany({
        where: {
          userId,
          researchGroupId: { not: null },
        },
        select: { researchGroupId: true },
      })
    : [];

  const joinedToGroupIds = new Set(
    membershipRecs.map((m) => m.researchGroupId!)
  );

  return (
    <div className="p-5 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-slate-800">
          📍 Semilleros de Investigación de Ingeniería Informática AUNAR
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {groups.map((group) => {
          const joinedToGroup = joinedToGroupIds.has(group.id);
          const formattedDate = group.createdAt.toISOString().split("T")[0]; // yyyy-mm-dd

          return (
            <div
              key={group.id}
              className="border bg-gradient-to-br from-slate-100 to-slate-300 dark:from-slate-800 dark:to-slate-700 rounded-md shadow-sm p-4 flex flex-col justify-between"
            >
              <div>
                <Image
                  width={300}
                  height={300}
                  src={group.imageUrl || "/default.png"}
                  alt={group.name}
                  className="w-full h-90 object-cover rounded-md mb-4"
                />
                <h2 className="text-lg font-semibold text-slate-800">
                  {group.name}
                </h2>
                <p className="text-sm text-slate-600 mb-2">
                  {group.description || "Sin descripción"}
                </p>

                <div className="space-y-1 text-xs text-slate-500">
                  <p>Fecha de creación: {formattedDate}</p>
                </div>
              </div>

              <div>
                <JoinButton
                  entity="researchGroup"
                  id={group.id}
                  isMember={joinedToGroup}
                  className="w-full"
                />

                <div className="space-y-2 pt-2 border-t border-slate-400/30 mt-4">
                  <Link href={`/dashboard/teacher/research-group/${group.id}/view`}>
                    <Button variant="cyberGradient" size="sm" className="w-full">
                      <Eye className="mr-2 w-4 h-4" />
                      Ver semillero
                    </Button>
                  </Link>

                  {role === "TEACHER" && (
                    <>
                      <Link href={`/dashboard/teacher/research-group/${group.id}`}>
                        <Button variant="cyberGradient" size="sm" className="w-full mt-2">
                          <UserPen className="mr-2 w-4 h-4" />
                          Editar semillero
                        </Button>
                      </Link>

                      <Link href={`/dashboard/teacher/research-group/${group.id}/attachments`}>
                        <Button variant="cyberGradient" size="sm" className="w-full mt-2">
                          <FilePlus2 className="mr-2 w-4 h-4" />
                          Anclar archivos
                        </Button>
                      </Link>

                      <Link href={`/dashboard/teacher/research-group/${group.id}/projects/create`}>
                        <Button variant="cyberGradient" size="sm" className="w-full mt-2">
                          <FilePlus2 className="mr-2 w-4 h-4" />
                          Crear proyecto
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
