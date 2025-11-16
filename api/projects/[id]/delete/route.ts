import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Mock database - replace with real DB implementation
const projects = [
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const projectId = params.id;
  
  // Mock delete operation
  projects.splice(
    projects.findIndex(p => p.id === projectId),
    1
  );

  return NextResponse.json({ success: true });
}
