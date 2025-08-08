import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const categories = await db.category.findMany({
      select: {
        id: true,
        name: true,
        courses: {
          select: {
            id: true,
            title: true,
            isPublished: true,
          },
          orderBy: {
            title: "asc",
          },
        },
        projects: {
          select: {
            id: true,
            title: true,
            researchGroupId: true,
          },
          orderBy: {
            title: "asc",
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json({ categories });
  } catch (error) {
    console.error("[CATEGORIES_WITH_ITEMS_GET]", error);
    return new NextResponse("Error interno", { status: 500 });
  }
}
