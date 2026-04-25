import type { MetadataRoute } from 'next';
import { getProjectSlugs } from '@/lib/projects';

const BASE_URL = 'https://stephanie-vanoverberghe.dev/';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const staticRoutes = ['', '/projects', '/skills', '/contact'];
    const projectSlugs = await getProjectSlugs();

    const staticEntries = staticRoutes.map((route) => ({
        url: `${BASE_URL}${route || '/'}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.7,
    }));

    const projectEntries = projectSlugs.map((slug) => ({
        url: `${BASE_URL}/projects/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }));

    return [...staticEntries, ...projectEntries];
}
