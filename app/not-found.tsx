import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for could not be found.',
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F2F5F9] to-gray-100 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <h1 className="text-9xl font-bold text-[#040936] mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-[#040936] text-white rounded-lg hover:bg-[#0a1147] transform hover:-translate-y-0.5 hover:shadow-lg transition-all font-semibold"
          >
            Go Home
          </Link>
          <Link
            href="/projects"
            className="px-6 py-3 bg-white text-[#040936] border-2 border-[#040936] rounded-lg hover:bg-[#040936] hover:text-white transform hover:-translate-y-0.5 hover:shadow-lg transition-all font-semibold"
          >
            View Projects
          </Link>
        </div>
      </div>
    </div>
  );
}

