import { requireAuth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';

export default async function AdminDashboard() {
  const session = await requireAuth();

  const [totalProjects, totalInquiries, pendingInquiries, careerInquiries, serviceInquiries] = await Promise.all([
    prisma.project.count(),
    prisma.inquiry.count(),
    prisma.inquiry.count({ where: { status: 'pending' } }),
    prisma.inquiry.count({ where: { type: 'career' } }),
    prisma.inquiry.count({ where: { type: 'service' } }),
  ]);

  const recentInquiries = await prisma.inquiry.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      name: true,
      email: true,
      type: true,
      status: true,
      createdAt: true,
    },
  });

  return (
    <div className="min-h-screen bg-[#F2F5F9] p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#040936] mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back, {session.email}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
            <div className="text-sm text-gray-600 mb-1">Total Projects</div>
            <div className="text-3xl font-bold text-[#040936]">{totalProjects}</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
            <div className="text-sm text-gray-600 mb-1">Total Inquiries</div>
            <div className="text-3xl font-bold text-[#040936]">{totalInquiries}</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
            <div className="text-sm text-gray-600 mb-1">Pending</div>
            <div className="text-3xl font-bold text-orange-600">{pendingInquiries}</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
            <div className="text-sm text-gray-600 mb-1">Career</div>
            <div className="text-3xl font-bold text-blue-600">{careerInquiries}</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
            <div className="text-sm text-gray-600 mb-1">Service</div>
            <div className="text-3xl font-bold text-green-600">{serviceInquiries}</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Link
            href="/admin/projects"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            <h2 className="text-xl font-bold text-[#040936] mb-2">Manage Projects</h2>
            <p className="text-gray-600">View, create, and edit projects</p>
          </Link>
          <Link
            href="/admin/inquiries"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            <h2 className="text-xl font-bold text-[#040936] mb-2">Manage Inquiries</h2>
            <p className="text-gray-600">View and manage customer inquiries</p>
          </Link>
        </div>

        {/* Recent Inquiries */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-[#040936] mb-4">Recent Inquiries</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-600 border-b">
                  <th className="pb-3 pr-4">Name</th>
                  <th className="pb-3 pr-4">Email</th>
                  <th className="pb-3 pr-4">Type</th>
                  <th className="pb-3 pr-4">Status</th>
                  <th className="pb-3 pr-4">Date</th>
                  <th className="pb-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {recentInquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="py-3 pr-4">{inquiry.name}</td>
                    <td className="py-3 pr-4 text-gray-600">{inquiry.email}</td>
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
                    <td className="py-3 pr-4 text-gray-600 text-sm">{formatDate(inquiry.createdAt)}</td>
                    <td className="py-3">
                      <Link
                        href={`/admin/inquiries/${inquiry.id}`}
                        className="text-[#040936] hover:underline text-sm"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

