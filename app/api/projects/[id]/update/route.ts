import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const data = await req.json();
  const project = await prisma.project.update({ where: { id: params.id }, data });
  return NextResponse.json(project);
}
