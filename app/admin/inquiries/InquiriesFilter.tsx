'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function InquiriesFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/admin/inquiries?${params.toString()}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex flex-wrap gap-4 items-center">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Filter by Type</label>
          <select
            value={searchParams.get('type') || ''}
            onChange={(e) => handleFilter('type', e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#040936] focus:border-transparent"
          >
            <option value="">All Types</option>
            <option value="career">Career</option>
            <option value="service">Service</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Filter by Status</label>
          <select
            value={searchParams.get('status') || ''}
            onChange={(e) => handleFilter('status', e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#040936] focus:border-transparent"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="reviewed">Reviewed</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        {(searchParams.get('type') || searchParams.get('status')) && (
          <div className="flex items-end">
            <button
              onClick={() => router.push('/admin/inquiries')}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

