import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const projects = await prisma.project.findMany({ orderBy: { number: 'asc' } });
  return NextResponse.json(projects);
}
