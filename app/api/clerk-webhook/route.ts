// app/api/clerk-webhook/route.ts

import { clerkClient } from "@clerk/clerk-sdk-node";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  if (body.type === "user.created") {
    const userId = body.data.id;

    await clerkClient.users.updateUser(userId, {
      publicMetadata: {
        role: "STUDENT",
      },
    });
  }

  return NextResponse.json({ message: "OK" });
}
