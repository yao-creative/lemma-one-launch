/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    distDir: 'build',
    swcMinify: true,
    output: 'export',
    images: {
      unoptimized: true
    }
}

export default nextConfig;
