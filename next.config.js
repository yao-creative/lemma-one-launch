/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  distDir: 'build',
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    // This will make Next.js ignore the babel.config.js file during build
    config.resolve.alias['babel-config'] = false;
    return config;
  },
};

export default nextConfig; // Use export default instead of module.exports