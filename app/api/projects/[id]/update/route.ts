'use server';

import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await req.json();
  const project = await prisma.project.update({ where: { id }, data });
  return NextResponse.json(project);
}
