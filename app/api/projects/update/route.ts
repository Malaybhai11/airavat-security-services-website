'use server';

import { prisma } from '@/lib/prisma';
import { generateSlug } from '@/lib/utils';
import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';

export async function PATCH(req: Request) {
  try {
    await requireAuth();
    
    const { id, ...data } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: 'Project ID is required' },
        { status: 400 }
      );
    }

    // If title is being updated, regenerate slug
    if (data.title) {
      const slug = generateSlug(data.title);
      const existingProject = await prisma.project.findUnique({
        where: { slug },
      });

      // Allow if it's the same project
      if (existingProject && existingProject.id !== id) {
        return NextResponse.json(
          { error: 'A project with this title already exists' },
          { status: 400 }
        );
      }

      data.slug = slug;
    }

    const project = await prisma.project.update({
      where: { id },
      data,
    });

    return NextResponse.json(project);
  } catch (error: any) {
    console.error('Error updating project:', error);
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

