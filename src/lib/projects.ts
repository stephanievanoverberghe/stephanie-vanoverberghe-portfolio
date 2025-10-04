import fs from 'node:fs/promises';
import path from 'node:path';

export type Project = {
    slug: string;
    title: string;
    subtitle?: string;
    year?: number;
    role?: string[];
    stack?: string[];
    context?: string;
    objectives?: string[];
    challenges?: string[];
    solutions?: string[];
    highlights?: string[];
    links?: { demo?: string; repo?: string };
    logo?: { image: string; alt?: string };
    hero?: { image: string; alt?: string };
    gallery?: { src: string; alt?: string }[];
};

const DIR = path.join(process.cwd(), 'src', 'content', 'projects');

export async function getProjectSlugs(): Promise<string[]> {
    const files = await fs.readdir(DIR);
    return files.filter((f) => f.endsWith('.json')).map((f) => f.replace(/\.json$/, ''));
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
    try {
        const file = await fs.readFile(path.join(DIR, `${slug}.json`), 'utf8');
        const data = JSON.parse(file) as Project;
        return { ...data, slug: data.slug ?? slug };
    } catch {
        return null;
    }
}

export async function getAllProjects(): Promise<Project[]> {
    const slugs = await getProjectSlugs();
    const all = await Promise.all(slugs.map(getProjectBySlug));
    return (all.filter(Boolean) as Project[]).sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
}
