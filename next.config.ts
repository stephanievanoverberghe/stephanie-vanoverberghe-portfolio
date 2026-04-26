import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    reactStrictMode: true,
    async redirects() {
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
