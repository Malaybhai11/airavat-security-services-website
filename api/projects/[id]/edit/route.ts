import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Mock database - replace with real DB implementation
let projects = [
  {
    id: '1',
    title: 'Project Alpha',
    slug: 'project-alpha',
    date: '2025-01-15',
    achievement: 'Launched new security framework',
    number: 1,
    blogContent: '<p>Detailed blog content about Project Alpha</p>',
    thumbnail: '/public/placeholder.jpg',
    createdAt: new Date().toISOString(),
  },
];

// Function to edit a project (exported for admin use)
export async function editProject(id: string, projectData: any) {
  const index = projects.findIndex(p => p.id === id);

  if (index === -1) {
    throw new Error('Project not found');
  }

  const updatedProject = {
    ...projects[index],
    ...projectData,
    updatedAt: new Date().toISOString(),
  };

  projects = [
    ...projects.slice(0, index),
    updatedProject,
    ...projects.slice(index + 1)
  ];

  return updatedProject;
}

// API route handler
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const projectData = await request.json();
    const updatedProject = await editProject(params.id, projectData);
    return NextResponse.json(updatedProject);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 404 });
  }
}
