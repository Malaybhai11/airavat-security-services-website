'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function StatusUpdateForm({ inquiryId, currentStatus }: { inquiryId: string; currentStatus: string }) {
  const router = useRouter();
  const [status, setStatus] = useState(currentStatus);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = async () => {
    if (status === currentStatus) return;

    setIsUpdating(true);
    try {
      const res = await fetch(`/api/inquiries/${inquiryId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        toast.success('Status updated successfully');
        router.refresh();
      } else {
        toast.error('Failed to update status');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        onBlur={handleUpdate}
        disabled={isUpdating}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#040936] focus:border-transparent disabled:opacity-50"
      >
        <option value="pending">Pending</option>
        <option value="reviewed">Reviewed</option>
        <option value="completed">Completed</option>
      </select>
      {isUpdating && (
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#040936]"></div>
      )}
    </div>
  );
}

