import { NextResponse } from 'next/server';

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

export async function GET() {
  return NextResponse.json(projects);
}
