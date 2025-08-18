import { clerkClient } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export type UserRow = {
  id: string;
  userId: string;
  nombre: string | null;
  apellido: string | null;
  email: string | null;
  semillero?: string | null;
  proyecto?: string | null;
  curso?: string | null;
  rol?: string | null;
};

type ClerkUserMinimal = {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  primaryEmailAddress?: { emailAddress: string } | null;
  emailAddresses?: { emailAddress: string }[] | null;
};

type ClerkUserFromApi = {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  primaryEmailAddress?: { emailAddress: string } | null;
  emailAddresses?: { emailAddress: string }[] | null;
};

async function fetchClerkUsersByIds(
  userIds: string[]
): Promise<Map<string, ClerkUserMinimal | undefined>> {
  const uniqueIds = Array.from(new Set(userIds.filter(Boolean)));
  const usersMap = new Map<string, ClerkUserMinimal | undefined>();

  const clerk = await clerkClient();

  try {
    const resp = await clerk.users.getUserList({
      userId: uniqueIds,
      limit: uniqueIds.length,
    });

    const usersArray = resp.data as ClerkUserFromApi[];

    for (const u of usersArray) {
      const minimal: ClerkUserMinimal = {
        id: u.id,
        firstName: (u.firstName ?? u.first_name) ?? null,
        lastName: (u.lastName ?? u.last_name) ?? null,
        primaryEmailAddress: (u.primaryEmailAddress ?? null) as
          | { emailAddress: string }
          | null,
        emailAddresses: (u.emailAddresses ?? null) as
          | { emailAddress: string }[]
          | null,
      };
      usersMap.set(u.id, minimal);
    }
  } catch (err) {
    console.error("Error fetching Clerk users:", err);
  }

  return usersMap;
}

/** integrantes de semilleros */
export async function getSemilleroMembers(): Promise<UserRow[]> {
  const memberships = await db.membership.findMany({
    where: { researchGroupId: { not: null } },
    include: { researchGroup: true },
    orderBy: { createdAt: "desc" },
  });

  const userIds = memberships.map((m) => m.userId);
  const usersMap = await fetchClerkUsersByIds(userIds);

  return memberships.map((m) => {
    const clerkUser = usersMap.get(m.userId);
    const email =
      clerkUser?.primaryEmailAddress?.emailAddress ??
      clerkUser?.emailAddresses?.[0]?.emailAddress ??
      null;

    return {
      id: m.id,
      userId: m.userId,
      nombre: clerkUser?.firstName ?? null,
      apellido: clerkUser?.lastName ?? null,
      email,
      semillero: m.researchGroup?.name ?? null,
      rol: m.role ?? null,
    };
  });
}

/** participantes y creadores de proyectos */
export async function getProjectParticipants(): Promise<UserRow[]> {
  const projects = await db.researchProject.findMany({
    include: { researchGroup: true },
    orderBy: { createdAt: "desc" },
  });

  const rows: UserRow[] = [];
  const userIdCollect: string[] = [];

  for (const project of projects) {
    if (project.createdBy) userIdCollect.push(project.createdBy);

    const attachments = await db.researchProjectAttachment.findMany({
      where: { projectId: project.id },
      select: { userId: true },
    });

    userIdCollect.push(...attachments.map(a => a.userId).filter(Boolean) as string[]);
  }

  const usersMap = await fetchClerkUsersByIds(userIdCollect);

  for (const project of projects) {
    const added = new Map<string, boolean>(); // evita duplicados por proyecto

    // creador
    if (project.createdBy && !added.has(project.createdBy)) {
      const u = usersMap.get(project.createdBy);
      const email =
        u?.primaryEmailAddress?.emailAddress ??
        u?.emailAddresses?.[0]?.emailAddress ??
        null;

      rows.push({
        id: `${project.id}-${project.createdBy}`,
        userId: project.createdBy,
        nombre: u?.firstName ?? null,
        apellido: u?.lastName ?? null,
        email,
        proyecto: project.title,
        rol: "CREADOR",
        semillero: project.researchGroup?.name ?? null, 

      });
      added.set(project.createdBy, true);
    }

    // attachments
    const attachments = await db.researchProjectAttachment.findMany({
      where: { projectId: project.id },
      select: { userId: true },
    });

    for (const a of attachments) {
      if (!a.userId || added.has(a.userId)) continue;

      const u = usersMap.get(a.userId);
      const email =
        u?.primaryEmailAddress?.emailAddress ??
        u?.emailAddresses?.[0]?.emailAddress ??
        null;

      rows.push({
        id: `${project.id}-${a.userId}`,
        userId: a.userId,
        nombre: u?.firstName ?? null,
        apellido: u?.lastName ?? null,
        email,
        proyecto: project.title,
      });
      added.set(a.userId, true);
    }
  }

  return rows;
}

/** estudiantes de cursos */
export async function getCourseStudents(): Promise<UserRow[]> {
  const memberships = await db.membership.findMany({
    where: { courseId: { not: null } },
    include: { course: true },
    orderBy: { createdAt: "desc" },
  });

  const userIds = memberships.map((m) => m.userId);
  const usersMap = await fetchClerkUsersByIds(userIds);

  return memberships.map((m) => {
    const u = usersMap.get(m.userId);
    const email =
      u?.primaryEmailAddress?.emailAddress ??
      u?.emailAddresses?.[0]?.emailAddress ??
      null;

    return {
      id: m.id,
      userId: m.userId,
      nombre: u?.firstName ?? null,
      apellido: u?.lastName ?? null,
      email,
      curso: m.course?.title ?? null,
      rol: m.role ?? null,
    };
  });
}

/** creadores de cursos */
export async function getCourseCreators(): Promise<UserRow[]> {
  const courses = await db.course.findMany({
    orderBy: { createdAt: "desc" },
  });

  const creatorIds = courses.map((c) => c.userId).filter(Boolean);
  const usersMap = await fetchClerkUsersByIds(creatorIds);

  return courses.map((c) => {
    const u = usersMap.get(c.userId);
    const email =
      u?.primaryEmailAddress?.emailAddress ??
      u?.emailAddresses?.[0]?.emailAddress ??
      null;

    return {
      id: `course-${c.id}`,
      userId: c.userId,
      nombre: u?.firstName ?? null,
      apellido: u?.lastName ?? null,
      email,
      curso: c.title,
      rol: "CREADOR",
    };
  });
}
