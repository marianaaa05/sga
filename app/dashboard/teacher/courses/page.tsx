import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/clerk-sdk-node";
import type { User } from "@clerk/clerk-sdk-node";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import { UserPen, FilePlus2, Eye } from "lucide-react";
import Link from "next/link";
import { JoinButton } from "@/components/join-button";
import Image from "next/image";

const CoursesPage = async () => {
  const { userId } = await auth();
  if (!userId) return redirect("/dashboard");
  const user = await currentUser();
  const role = user?.publicMetadata.role as string | undefined;

  const courses = await db.course.findMany({
    orderBy: { createdAt: "asc" },
    include: { category: true },
  });

  const creatorIds = Array.from(new Set(courses.map((c) => c.userId)));
  const creators: User[] = await Promise.all(
    creatorIds.map((id) => clerkClient.users.getUser(id))
  );
  const creatorNames = new Map<string, string>();
  creators.forEach((u) => {
    const full = [u.firstName, u.lastName].filter(Boolean).join(" ");
    creatorNames.set(u.id, full || "Desconocido");
  });

  const membershipRecs = await db.membership.findMany({
    where: { userId, courseId: { not: null } },
    select: { courseId: true },
  });
  const joinedCourseIds = new Set(membershipRecs.map((m) => m.courseId!));

  return (
    <div className="p-5 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-slate-800">
          📍 Cursos gratuitos AUNAR
        </h1>
          <Link href="/dashboard/teacher/courses/create">
            <Button variant="neonPurple" size="sm">
              Nuevo Curso
            </Button>
          </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course) => {
          const isMember = joinedCourseIds.has(course.id);
          const blocked = !course.isPublished;          
          const creatorName = creatorNames.get(course.userId)!;

          return (
            <div
              key={course.id}
              className="border bg-gradient-to-br from-slate-100 to-slate-300 dark:from-slate-800 dark:to-slate-700 rounded-md shadow-sm p-4 flex flex-col justify-between"
            >
              <div>
                <Image
                  width={300}
                  height={200}
                  src={course.imageUrl ?? "/default.png"}
                  alt={course.title}
                  className="w-full h-72 object-cover rounded-md mb-4"
                />
                <h2 className="text-lg font-semibold text-slate-800">
                  {course.title}
                </h2>
                <p className="text-sm text-slate-600 mb-2">
                  {course.description}
                </p>
                <p className="text-xs text-slate-500 mb-2">
                  Creado por:{" "}
                  <span className="font-medium text-slate-800">
                    {creatorName}
                  </span>
                </p>
                <div className="space-y-1 text-xs text-slate-500">
                  <p>Categoría: {course.category?.name ?? "Sin categoría"}</p>
                  <p>
                    Estado:{" "}
                    {course.isPublished ? (
                      <span className="text-green-600">Publicado</span>
                    ) : (
                      <span className="text-orange-600">No publicado</span>
                    )}
                  </p>
                  <p>
                    Fecha de creación:{" "}
                    {new Date(course.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <JoinButton
                  entity="course"
                  id={course.id}
                  isMember={isMember}
                  className="w-full"
                />
              </div>

              <div className="mt-4 pt-2 border-t border-slate-400/30">
                {blocked ? (
                  <p className="text-center text-sm text-slate-500 italic">
                  </p>
                ) : (
                  <>
                    <Link href={`/dashboard/teacher/courses/${course.id}/contents`}>
                      <Button
                        variant="cyberGradient"
                        size="sm"
                        className="w-full mb-2"
                      >
                        <Eye className="mr-2 w-4 h-4" /> Ver contenido
                      </Button>
                    </Link>

                    {(role === "TEACHER" || course.userId === userId) && (
                      <>
                        <Link href={`/dashboard/teacher/courses/${course.id}`}>
                          <Button
                            variant="cyberGradient"
                            size="sm"
                            className="w-full mb-2"
                          >
                            <UserPen className="mr-2 w-4 h-4" /> Editar
                          </Button>
                        </Link>
                        <Link href={`/dashboard/teacher/attachments/${course.id}`}>
                          <Button
                            variant="cyberGradient"
                            size="sm"
                            className="w-full"
                          >
                            <FilePlus2 className="mr-2 w-4 h-4" /> Subir Archivos
                          </Button>
                        </Link>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CoursesPage;
