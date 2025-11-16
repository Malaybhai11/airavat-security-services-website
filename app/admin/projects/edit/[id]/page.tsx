'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function EditProjectPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    achievement: '',
    blogContent: '',
    thumbnail: '',
  });

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/projects/${params.id}`);
        if (res.ok) {
          const project = await res.json();
          setFormData({
            title: project.title || '',
            date: project.date || '',
            achievement: project.achievement || '',
            blogContent: project.blogContent || '',
            thumbnail: project.thumbnail || '',
          });
        } else {
          toast.error('Failed to load project');
          router.push('/admin/projects');
        }
      } catch (error) {
        toast.error('An error occurred');
        router.push('/admin/projects');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [params.id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/projects/update', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: params.id, ...formData }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Project updated successfully!');
        router.push('/admin/projects');
      } else {
        toast.error(data.error || 'Failed to update project');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F2F5F9] p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#040936] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading project...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F2F5F9] p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link
            href="/admin/projects"
            className="text-[#040936] hover:underline mb-4 inline-block"
          >
            ← Back to Projects
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow-xl p-6">
          <h1 className="text-3xl font-bold text-[#040936] mb-6">Edit Project</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#040936] focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-semibold text-gray-700 mb-2">
                Date <span className="text-red-500">*</span>
              </label>
              <input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#040936] focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label htmlFor="achievement" className="block text-sm font-semibold text-gray-700 mb-2">
                Achievement <span className="text-red-500">*</span>
              </label>
              <textarea
                id="achievement"
                name="achievement"
                value={formData.achievement}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#040936] focus:border-transparent transition-all resize-none"
              />
            </div>

            <div>
              <label htmlFor="blogContent" className="block text-sm font-semibold text-gray-700 mb-2">
                Blog Content <span className="text-red-500">*</span>
              </label>
              <textarea
                id="blogContent"
                name="blogContent"
                value={formData.blogContent}
                onChange={handleChange}
                required
                rows={8}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#040936] focus:border-transparent transition-all resize-none font-mono text-sm"
              />
            </div>

            <div>
              <label htmlFor="thumbnail" className="block text-sm font-semibold text-gray-700 mb-2">
                Thumbnail URL <span className="text-red-500">*</span>
              </label>
              <input
                id="thumbnail"
                name="thumbnail"
                type="url"
                value={formData.thumbnail}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#040936] focus:border-transparent transition-all"
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-[#040936] text-white rounded-lg hover:bg-[#0a1147] transform hover:-translate-y-0.5 hover:shadow-lg transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Updating...' : 'Update Project'}
              </button>
              <Link
                href="/admin/projects"
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all font-semibold"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
