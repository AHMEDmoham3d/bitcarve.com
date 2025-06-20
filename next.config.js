/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed output: 'export' to allow dynamic API routes
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true 
  },
  // Disable font optimization to prevent AbortError during development
  optimizeFonts: false,
  experimental: {
    nextScriptWorkers: false,
    // Additional experimental flags to prevent font-related issues
    fontLoaders: [],
  },
  // Disable SWC minification if it causes issues with fonts
  swcMinify: false,
};

module.exports = nextConfig;