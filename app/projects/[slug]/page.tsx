import { notFound } from 'next/navigation';
import { formatDate } from '@/lib/utils';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

interface Project {
  id: string;
  title: string;
  slug: string;
  date: string;
  achievement: string;
  blogContent: string;
  thumbnail: string;
  number: number;
  createdAt: string;
  updatedAt: string;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  try {
    const { slug } = await params;
    const res = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/projects/slug/${slug}`);
    if (!res.ok) {
      return {
        title: 'Project Not Found',
      };
    }

    const project: Project = await res.json();

    return {
      title: project.title,
      description: project.achievement,
      openGraph: {
        title: project.title,
        description: project.achievement,
        type: 'article',
        publishedTime: project.createdAt,
        images: project.thumbnail ? [project.thumbnail] : [],
      },
    };
  } catch (error) {
    return {
      title: 'Project Not Found',
    };
  }
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  let project: Project;

  try {
    const { slug } = await params;
    const res = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/projects/slug/${slug}`);
    if (!res.ok) {
      notFound();
    }
    project = await res.json();
  } catch (error) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#F2F5F9] py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/projects"
          className="text-[#040936] hover:underline mb-6 inline-block"
        >
          ← Back to Projects
        </Link>
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {project.thumbnail && (
            <div className="relative w-full h-64 md:h-96">
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
          <div className="p-8">
            <div className="mb-4">
              <span className="text-sm text-gray-600">Project #{project.number}</span>
              <span className="mx-2 text-gray-400">•</span>
              <span className="text-sm text-gray-600">{formatDate(project.createdAt)}</span>
            </div>
            <h1 className="text-4xl font-bold text-[#040936] mb-4">{project.title}</h1>
            <div className="text-[#040936] text-lg mb-8 font-semibold">{project.date}</div>
            
            <div className="prose prose-lg max-w-none mb-8">
              <div className="bg-blue-50 border-l-4 border-[#040936] p-4 mb-8">
                <p className="text-[#040936] font-semibold text-lg">{project.achievement}</p>
              </div>
              <div 
                className="text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: project.blogContent }} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
