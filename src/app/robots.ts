import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
        },
        sitemap: 'https://stephanie-vanoverberghe.dev/sitemap.xml',
        host: 'https://stephanie-vanoverberghe.dev/',
    };
}
