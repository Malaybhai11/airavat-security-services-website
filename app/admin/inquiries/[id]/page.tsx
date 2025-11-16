'use server';

import { requireAuth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { formatDateTime } from '@/lib/utils';
import StatusUpdateForm from './StatusUpdateForm';

export default async function AdminInquiryPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAuth();

  const { id } = await params;
  const inquiry = await prisma.inquiry.findUnique({
    where: { id },
  });

  if (!inquiry) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#F2F5F9] p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link
            href="/admin/inquiries"
            className="text-[#040936] hover:underline mb-4 inline-block"
          >
            ← Back to Inquiries
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-6 mb-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-[#040936] mb-2">Inquiry Details</h1>
              <p className="text-gray-600">Submitted on {formatDateTime(inquiry.createdAt)}</p>
            </div>
            <StatusUpdateForm inquiryId={inquiry.id} currentStatus={inquiry.status} />
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
                <div className="px-4 py-2 bg-gray-50 rounded-lg">
                  <span className={`px-2 py-1 rounded text-sm ${
                    inquiry.type === 'career' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {inquiry.type}
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                <div className="px-4 py-2 bg-gray-50 rounded-lg">
                  <span className={`px-2 py-1 rounded text-sm ${
                    inquiry.status === 'pending' ? 'bg-orange-100 text-orange-800' :
                    inquiry.status === 'reviewed' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {inquiry.status}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
              <div className="px-4 py-2 bg-gray-50 rounded-lg">{inquiry.name}</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <div className="px-4 py-2 bg-gray-50 rounded-lg">
                  <a href={`mailto:${inquiry.email}`} className="text-[#040936] hover:underline">
                    {inquiry.email}
                  </a>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                <div className="px-4 py-2 bg-gray-50 rounded-lg">
                  <a href={`tel:${inquiry.phone}`} className="text-[#040936] hover:underline">
                    {inquiry.phone}
                  </a>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
              <div className="px-4 py-3 bg-gray-50 rounded-lg whitespace-pre-wrap min-h-[100px]">
                {inquiry.message}
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="text-sm text-gray-600">
                <p><strong>Created:</strong> {formatDateTime(inquiry.createdAt)}</p>
                {inquiry.updatedAt !== inquiry.createdAt && (
                  <p><strong>Last Updated:</strong> {formatDateTime(inquiry.updatedAt)}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
