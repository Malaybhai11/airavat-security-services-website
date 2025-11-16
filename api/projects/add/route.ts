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

export async function POST(request: NextRequest) {
  const {
    title,
    date,
    achievement,
    blogContent,
    thumbnail,
  } = await request.json();

  const slug = title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  const number = projects.length > 0 ? Math.max(...projects.map(p => p.number)) + 1 : 1;
  
  const newProject = {
    id: Date.now().toString(),
    title,
    slug,
    date,
    achievement,
    blogContent,
    thumbnail,
    number,
    createdAt: new Date().toISOString(),
  };

  projects = [...projects, newProject];

  return NextResponse.json(newProject);
}
