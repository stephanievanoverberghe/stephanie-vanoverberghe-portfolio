import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    reactStrictMode: true,
    async redirects() {
        // Canonical host redirect to keep SEO and shared links consistent.
        return [
            {
                source: '/:path*',
                has: [{ type: 'host', value: 'www.stephanie-vanoverberghe.dev' }],
                destination: 'https://stephanie-vanoverberghe.dev/:path*',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
