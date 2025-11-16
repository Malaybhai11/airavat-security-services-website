import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { formatDateTime } from '@/lib/utils';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const inquiry = await prisma.inquiry.findUnique({
    where: { id },
  });

  if (!inquiry) {
    return {
      title: 'Inquiry Not Found',
    };
  }

  return {
    title: `Inquiry from ${inquiry.name}`,
    description: `Inquiry details for ${inquiry.type} inquiry from ${inquiry.name}`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function InquiryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const inquiry = await prisma.inquiry.findUnique({
    where: { id },
  });

  if (!inquiry) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#F2F5F9] p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-6">
        <h1 className="text-3xl font-bold text-[#040936] mb-6">Inquiry Confirmation</h1>
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-green-800 font-semibold">✓ Your inquiry has been submitted successfully!</p>
            <p className="text-green-700 text-sm mt-1">We will contact you soon.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Type</label>
              <p className="text-gray-900">{inquiry.type}</p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
              <p className="text-gray-900">{inquiry.status}</p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
              <p className="text-gray-900">{inquiry.name}</p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
              <p className="text-gray-900">{inquiry.email}</p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Phone</label>
              <p className="text-gray-900">{inquiry.phone}</p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Submitted</label>
              <p className="text-gray-900">{formatDateTime(inquiry.createdAt)}</p>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Message</label>
            <p className="text-gray-900 whitespace-pre-wrap">{inquiry.message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
