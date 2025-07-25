import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  const { researchGroupId, courseId } = await req.json();
  if (!researchGroupId && !courseId) {
    return NextResponse.json({ error: 'Debes enviar researchGroupId o courseId' }, { status: 400 });
  }

  const membership = await db.membership.create({
    data: {
      userId,
      role: 'STUDENT',
      researchGroupId: researchGroupId ?? undefined,
      courseId:        courseId        ?? undefined,
    },
  });

  return NextResponse.json(membership);
}

export async function DELETE(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  const url = new URL(req.url);
  const researchGroupId = url.searchParams.get('researchGroupId');
  const courseId        = url.searchParams.get('courseId');
  if (!researchGroupId && !courseId) {
    return NextResponse.json({ error: 'Debes especificar researchGroupId o courseId en query' }, { status: 400 });
  }

  if (researchGroupId) {
    await db.membership.delete({
      where: { userId_researchGroupId: { userId, researchGroupId } }
    });
  } else {
    await db.membership.delete({
      where: { userId_courseId: { userId, courseId: courseId! } }
    });
  }

  return NextResponse.json({ success: true });
}
