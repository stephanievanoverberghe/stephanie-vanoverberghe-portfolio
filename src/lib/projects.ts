// src/lib/projects.ts
import fs from 'node:fs/promises';
import path from 'node:path';

type ProjectLinkMap = { demo?: string; repo?: string };
type ProjectMedia = { image: string; alt?: string };
type ProjectGalleryImage = { src: string; alt?: string };

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
    links?: ProjectLinkMap;
    logo?: ProjectMedia;
    hero?: ProjectMedia;
    gallery?: ProjectGalleryImage[];
};

const DIR = path.join(process.cwd(), 'src', 'content', 'projects');

/** ---------- tiny type guards ---------- */
function isRecord(value: unknown): value is Record<string, unknown> {
    return !!value && typeof value === 'object' && !Array.isArray(value);
}

function getString(value: unknown): string | undefined {
    if (typeof value !== 'string') return undefined;
    const s = value.trim();
    return s.length ? s : undefined;
}

function getNumber(value: unknown): number | undefined {
    if (typeof value !== 'number') return undefined;
    return Number.isFinite(value) ? value : undefined;
}

function getStringArray(value: unknown): string[] | undefined {
    if (!Array.isArray(value)) return undefined;
    const arr = value
        .filter((v): v is string => typeof v === 'string')
        .map((s) => s.trim())
        .filter(Boolean);
    return arr.length ? arr : undefined;
}

/** ---------- structured parsers ---------- */
function parseMedia(value: unknown): ProjectMedia | undefined {
    if (!isRecord(value)) return undefined;

    const image = getString(value.image);
    if (!image) return undefined;

    const alt = getString(value.alt);

    return alt ? { image, alt } : { image };
}

function parseLinks(value: unknown): ProjectLinkMap | undefined {
    if (!isRecord(value)) return undefined;

    const demo = getString(value.demo);
    const repo = getString(value.repo);

    if (!demo && !repo) return undefined;
    return { demo, repo };
}

function parseGallery(value: unknown): ProjectGalleryImage[] | undefined {
    if (!Array.isArray(value)) return undefined;

    const items: ProjectGalleryImage[] = [];

    for (const entry of value) {
        if (!isRecord(entry)) continue;

        const src = getString(entry.src);
        if (!src) continue;

        const alt = getString(entry.alt);
        items.push(alt ? { src, alt } : { src });
    }

    return items.length ? items : undefined;
}

function parseProject(raw: unknown, fallbackSlug: string): Project | null {
    if (!isRecord(raw)) return null;

    const title = getString(raw.title);
    if (!title) return null;

    const slug = getString(raw.slug) ?? fallbackSlug;

    const project: Project = {
        slug,
        title,
        subtitle: getString(raw.subtitle),
        year: getNumber(raw.year),
        role: getStringArray(raw.role),
        stack: getStringArray(raw.stack),
        context: getString(raw.context),
        objectives: getStringArray(raw.objectives),
        challenges: getStringArray(raw.challenges),
        solutions: getStringArray(raw.solutions),
        highlights: getStringArray(raw.highlights),
        links: parseLinks(raw.links),
        logo: parseMedia(raw.logo),
        hero: parseMedia(raw.hero),
        gallery: parseGallery(raw.gallery),
    };

    return project;
}

/** ---------- public API ---------- */
export async function getProjectSlugs(): Promise<string[]> {
    try {
        const files = await fs.readdir(DIR);
        return files.filter((f) => f.endsWith('.json')).map((f) => f.slice(0, -'.json'.length));
    } catch {
        // dossier manquant en local/CI => pas d'explosion
        return [];
    }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
    try {
        const file = await fs.readFile(path.join(DIR, `${slug}.json`), 'utf8');
        const raw: unknown = JSON.parse(file);
        return parseProject(raw, slug);
    } catch {
        return null;
    }
}

export async function getAllProjects(): Promise<Project[]> {
    const slugs = await getProjectSlugs();
    const all = await Promise.all(slugs.map((s) => getProjectBySlug(s)));

    return all
        .filter((p): p is Project => p !== null)
        .sort((a, b) => {
            const ya = a.year ?? -Infinity;
            const yb = b.year ?? -Infinity;
            if (yb !== ya) return yb - ya;
            return a.title.localeCompare(b.title, 'fr');
        });
}
