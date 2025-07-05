import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const categories = await db.category.findMany();
  return NextResponse.json(categories);
}

export async function POST(req: Request) {
  const { name } = await req.json();

  if (!name) {
    return new NextResponse("Nombre requerido", { status: 400 });
  }

  const category = await db.category.create({
    data: { name },
  });

  return NextResponse.json(category);
}
