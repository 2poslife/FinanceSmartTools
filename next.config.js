/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Enable static exports if needed, or remove for SSR
  // output: 'export',
  images: {
    unoptimized: true, // For static exports or if you don't want Next.js image optimization
  },
  // Remove console.log in production
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'], // Keep console.error and console.warn
    } : false,
  },
  // Disable the overlay in development
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  // Ensure CSS and other assets are handled correctly
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': __dirname,
    };
    
    // Ensure lib directory is included in server builds
    if (isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
      };
    }
    
    return config;
  },
  // Configure API routes to use Node.js runtime by default
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  // Ensure API routes are properly handled and lib directory is included in builds
  outputFileTracingIncludes: {
    '/api/**': ['./lib/**/*'],
  },
  // Add headers for API requests
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig

