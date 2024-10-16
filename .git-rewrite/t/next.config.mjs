/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    distDir: 'build',
    images: {
        unoptimized: true,
        domains: [], // Add any external domains you need to load images from
    },
};

export default nextConfig;
