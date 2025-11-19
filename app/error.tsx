'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-linear-to-br from-[#F2F5F9] to-gray-100 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-red-600 mb-4">500</h1>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Something went wrong!</h2>
        <p className="text-gray-600 mb-8">
          We encountered an unexpected error. Please try again or contact support if the problem persists.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-[#040936] text-white rounded-lg hover:bg-[#0a1147] transform hover:-translate-y-0.5 hover:shadow-lg transition-all font-semibold"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-6 py-3 bg-white text-[#040936] border-2 border-[#040936] rounded-lg hover:bg-[#040936] hover:text-white transform hover:-translate-y-0.5 hover:shadow-lg transition-all font-semibold"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}