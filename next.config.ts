import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: [], // Add external domains if needed
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
