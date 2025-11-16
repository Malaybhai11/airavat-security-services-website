'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen bg-gradient-to-br from-[#F2F5F9] to-gray-100 flex items-center justify-center p-4">
          <div className="text-center max-w-md">
            <h1 className="text-6xl font-bold text-red-600 mb-4">Error</h1>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Something went wrong!</h2>
            <p className="text-gray-600 mb-8">
              A critical error occurred. Please refresh the page or contact support.
            </p>
            <button
              onClick={reset}
              className="px-6 py-3 bg-[#040936] text-white rounded-lg hover:bg-[#0a1147] transform hover:-translate-y-0.5 hover:shadow-lg transition-all font-semibold"
            >
              Try Again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}

