'use server';

import { prisma } from '@/lib/prisma';
import { generateSlug } from '@/lib/utils';
import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    await requireAuth();
    
    const data = await req.json();
    const { title, date, achievement, blogContent, thumbnail } = data;

    if (!title || !date || !achievement || !blogContent || !thumbnail) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const slug = generateSlug(title);
    
    // Get the highest number and increment
    const lastProject = await prisma.project.findFirst({
      orderBy: { number: 'desc' },
    });
    const number = lastProject ? lastProject.number + 1 : 1;

    // Check if slug already exists
    const existingProject = await prisma.project.findUnique({
      where: { slug },
    });

    if (existingProject) {
      return NextResponse.json(
        { error: 'A project with this title already exists' },
        { status: 400 }
      );
    }

    const project = await prisma.project.create({
      data: {
        title,
        slug,
        date,
        achievement,
        blogContent,
        thumbnail,
        number,
      },
    });

    return NextResponse.json(project);
  } catch (error: any) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}
