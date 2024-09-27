/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true,
        domains: [], // Add any external domains you need to load images from
    },
};

export default nextConfig;
