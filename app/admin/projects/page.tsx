'use server';

import { requireAuth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import DeleteProjectButton from './DeleteProjectButton';

export default async function AdminProjects() {
  await requireAuth();
  const projects = await prisma.project.findMany({ 
    orderBy: { number: 'asc' },
  });

  return (
    <div className="min-h-screen bg-[#F2F5F9] p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-[#040936] mb-2">Project Management</h1>
              <p className="text-gray-600">Manage your security service projects</p>
            </div>
            <Link
              href="/admin/projects/new"
              className="px-6 py-3 bg-[#040936] text-white rounded-lg hover:bg-[#0a1147] transform hover:-translate-y-0.5 hover:shadow-lg transition-all font-semibold"
            >
              + New Project
            </Link>
          </div>

          {projects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">No projects yet.</p>
              <Link
                href="/admin/projects/new"
                className="text-[#040936] hover:underline font-semibold"
              >
                Create your first project
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-600 border-b">
                    <th className="pb-3 pr-4">#</th>
                    <th className="pb-3 pr-4">Title</th>
                    <th className="pb-3 pr-4">Slug</th>
                    <th className="pb-3 pr-4">Date</th>
                    <th className="pb-3 pr-4">Created</th>
                    <th className="pb-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr 
                      key={project.id} 
                      className="border-b last:border-0 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-3 pr-4 font-semibold text-[#040936]">{project.number}</td>
                      <td className="py-3 pr-4 font-medium">{project.title}</td>
                      <td className="py-3 pr-4 text-gray-600 text-sm">{project.slug}</td>
                      <td className="py-3 pr-4 text-gray-600">{project.date}</td>
                      <td className="py-3 pr-4 text-gray-500 text-sm">{formatDate(project.createdAt)}</td>
                      <td className="py-3">
                        <div className="flex space-x-3">
                          <Link
                            href={`/admin/projects/edit/${project.id}`}
                            className="text-[#040936] hover:underline text-sm font-medium"
                          >
                            Edit
                          </Link>
                          <DeleteProjectButton projectId={project.id} projectTitle={project.title} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
