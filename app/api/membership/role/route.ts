import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  const { userId } = await auth();
  const { searchParams } = new URL(req.url);
  const entity = searchParams.get("entity");
  const entityId = searchParams.get("entityId");

  if (!userId || !entity || !entityId) {
    return new Response("Missing data", { status: 400 });
  }

  const membership = await db.membership.findFirst({
    where: {
      userId,
      ...(entity === "course"
        ? { courseId: entityId }
        : { researchGroupId: entityId }),
    },
    select: { role: true },
  });

  if (!membership) {
    return new Response(JSON.stringify({ role: null }));
  }

  return new Response(JSON.stringify({ role: membership.role }));
}
