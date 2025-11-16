import { requireAuth } from '@/lib/auth';
import Link from 'next/link';
import LogoutButton from './LogoutButton';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // All pages using this layout require authentication
  const session = await requireAuth();

  return (
    <div className="min-h-screen bg-[#F2F5F9]">
      <nav className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-8">
              <Link href="/admin" className="text-2xl font-bold text-[#040936]">
                Admin Panel
              </Link>
              <div className="hidden md:flex space-x-6">
                <Link
                  href="/admin"
                  className="text-gray-700 hover:text-[#040936] transition-colors font-medium"
                >
                  Dashboard
                </Link>
                <Link
                  href="/admin/projects"
                  className="text-gray-700 hover:text-[#040936] transition-colors font-medium"
                >
                  Projects
                </Link>
                <Link
                  href="/admin/inquiries"
                  className="text-gray-700 hover:text-[#040936] transition-colors font-medium"
                >
                  Inquiries
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 hidden sm:inline">{session.email}</span>
              <LogoutButton />
            </div>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
}

