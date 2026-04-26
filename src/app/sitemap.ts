import { stat } from 'node:fs/promises';
import path from 'node:path';
import type { MetadataRoute } from 'next';
import { getProjectSlugs } from '@/lib/projects';

const BASE_URL = 'https://stephanie-vanoverberghe.dev';
const DEFAULT_LAST_MODIFIED = new Date('2026-01-01T00:00:00.000Z');

function resolveFromRoot(...segments: string[]) {
    return path.join(process.cwd(), ...segments);
}

async function readLastModified(filePath: string) {
    try {
        const { mtime } = await stat(filePath);
        return mtime;
    } catch {
        return DEFAULT_LAST_MODIFIED;
    }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const staticRoutes = [
        { route: '/', sourceFile: resolveFromRoot('src', 'app', 'page.tsx'), priority: 1 },
        { route: '/projects', sourceFile: resolveFromRoot('src', 'app', 'projects', 'page.tsx'), priority: 0.8 },
        { route: '/skills', sourceFile: resolveFromRoot('src', 'app', 'skills', 'page.tsx'), priority: 0.7 },
        { route: '/contact', sourceFile: resolveFromRoot('src', 'app', 'contact', 'page.tsx'), priority: 0.6 },
    ] as const;

    const staticEntries = await Promise.all(
        staticRoutes.map(async ({ route, sourceFile, priority }) => ({
            url: `${BASE_URL}${route}`,
            lastModified: await readLastModified(sourceFile),
            changeFrequency: 'monthly' as const,
            priority,
        })),
    );

    const projectSlugs = await getProjectSlugs();

    const projectEntries = await Promise.all(
        projectSlugs.map(async (slug) => ({
            url: `${BASE_URL}/projects/${slug}`,
            lastModified: await readLastModified(resolveFromRoot('src', 'content', 'projects', `${slug}.json`)),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        })),
    );

    return [...staticEntries, ...projectEntries];
}
