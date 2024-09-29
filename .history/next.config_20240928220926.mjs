/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    distDir: 'o',
    images: {
        unoptimized: true,
        domains: [], // Add any external domains you need to load images from
    },
};

export default nextConfig;
