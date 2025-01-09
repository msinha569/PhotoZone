import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 

  // Minify the JavaScript output using SWC (Next.js's Rust-based compiler)
  swcMinify: true,

  // Customizing the images configuration
  images: {
    // Define remotePatterns to allow loading images from specific external sources
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '', // Leave empty for default ports
        pathname: '/**', // Allow all paths under this hostname
      },
    ],
    // Example: Add a custom loader if needed
    // loader: 'custom',
  },


  // Example: Configure basePath if your app isn't hosted at the domain root
  // basePath: '/subfolder',

  // Example: Disable ESLint during builds (as per your preference)
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ignore TypeScript errors during build
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
