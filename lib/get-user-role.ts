import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/clerk-sdk-node";

export const getUserRole = async (): Promise<"STUDENT" | "TEACHER" | "WEB_MASTER" | null> => {
  const { userId } = await auth();
  if (!userId) return null;

  const user = await clerkClient.users.getUser(userId);
  return user.publicMetadata?.role as "STUDENT" | "TEACHER" | "WEB_MASTER" | null;
};
