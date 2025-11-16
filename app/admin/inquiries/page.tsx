'use server';

import { requireAuth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import InquiriesFilter from './InquiriesFilter';

export default async function AdminInquiriesPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; status?: string }>;
}) {
  await requireAuth();

  const { type, status } = await searchParams;
  const where: any = {};
  if (type) where.type = type;
  if (status) where.status = status;

  const inquiries = await prisma.inquiry.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  });

  const stats = {
    total: await prisma.inquiry.count(),
    pending: await prisma.inquiry.count({ where: { status: 'pending' } }),
    reviewed: await prisma.inquiry.count({ where: { status: 'reviewed' } }),
    completed: await prisma.inquiry.count({ where: { status: 'completed' } }),
    career: await prisma.inquiry.count({ where: { type: 'career' } }),
    service: await prisma.inquiry.count({ where: { type: 'service' } }),
  };

  return (
    <div className="min-h-screen bg-[#F2F5F9] p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#040936] mb-2">Inquiry Management</h1>
          <p className="text-gray-600">View and manage customer inquiries</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="text-sm text-gray-600 mb-1">Total</div>
            <div className="text-2xl font-bold text-[#040936]">{stats.total}</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="text-sm text-gray-600 mb-1">Pending</div>
            <div className="text-2xl font-bold text-orange-600">{stats.pending}</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="text-sm text-gray-600 mb-1">Reviewed</div>
            <div className="text-2xl font-bold text-yellow-600">{stats.reviewed}</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="text-sm text-gray-600 mb-1">Completed</div>
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="text-sm text-gray-600 mb-1">Career</div>
            <div className="text-2xl font-bold text-blue-600">{stats.career}</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="text-sm text-gray-600 mb-1">Service</div>
            <div className="text-2xl font-bold text-purple-600">{stats.service}</div>
          </div>
        </div>

        <InquiriesFilter />

        <div className="bg-white rounded-lg shadow-xl p-6">
          {inquiries.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No inquiries found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-600 border-b">
                    <th className="pb-3 pr-4">Name</th>
                    <th className="pb-3 pr-4">Email</th>
                    <th className="pb-3 pr-4">Phone</th>
                    <th className="pb-3 pr-4">Type</th>
                    <th className="pb-3 pr-4">Status</th>
                    <th className="pb-3 pr-4">Date</th>
                    <th className="pb-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {inquiries.map((inquiry) => (
                    <tr key={inquiry.id} className="border-b last:border-0 hover:bg-gray-50 transition-colors">
                      <td className="py-3 pr-4 font-medium">{inquiry.name}</td>
                      <td className="py-3 pr-4 text-gray-600">{inquiry.email}</td>
                      <td className="py-3 pr-4 text-gray-600">{inquiry.phone}</td>
                      <td className="py-3 pr-4">
                        <span className={`px-2 py-1 rounded text-xs ${
                          inquiry.type === 'career' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {inquiry.type}
                        </span>
                      </td>
                      <td className="py-3 pr-4">
                        <span className={`px-2 py-1 rounded text-xs ${
                          inquiry.status === 'pending' ? 'bg-orange-100 text-orange-800' :
                          inquiry.status === 'reviewed' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {inquiry.status}
                        </span>
                      </td>
                      <td className="py-3 pr-4 text-gray-500 text-sm">{formatDate(inquiry.createdAt)}</td>
                      <td className="py-3">
                        <Link
                          href={`/admin/inquiries/${inquiry.id}`}
                          className="text-[#040936] hover:underline text-sm font-medium"
                        >
                          View
                        </Link>
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
