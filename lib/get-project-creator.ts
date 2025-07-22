import { clerkClient } from "@clerk/clerk-sdk-node";

export const getProjectCreator = async (userId: string) => {
  try {
    const user = await clerkClient.users.getUser(userId);

    return `${user.firstName || ""} ${user.lastName || ""}`.trim()
      || user.username
      || user.emailAddresses[0]?.emailAddress
      || "Desconocido";
  } catch (error) {
    console.error("Error obteniendo creador:", error);
    return "Desconocido";
  }
};
