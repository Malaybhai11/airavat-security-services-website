import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Thank You - Inquiry Submitted',
  description: 'Your inquiry has been successfully submitted.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F2F5F9] to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md bg-white rounded-xl shadow-2xl p-8 text-center">
        <div className="mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-[#040936] mb-2">Thank You!</h1>
          <p className="text-gray-600">Your inquiry has been successfully submitted.</p>
        </div>
        <p className="text-gray-700 mb-6">We will get back to you soon. Our team will contact you at the provided email or phone number.</p>
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
