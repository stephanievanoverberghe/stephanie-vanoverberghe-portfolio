// src/lib/projects.ts
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

type ProjectLinkMap = { demo?: string; repo?: string };
type ProjectMedia = { image: string; alt?: string };
type ProjectGalleryImage = { src: string; alt?: string };
type ProjectTesting = { strategy?: string; coverage?: string[] };
type ProjectArchitecture = { summary?: string; keyPoints?: string[]; sections?: Array<{ title: string; items: string[] }> };

export type Project = {
    slug: string;
    title: string;
    subtitle?: string;
    year?: number;
    role?: string[];
    stack?: string[];
    context?: string;
    vision?: string;
    objectives?: string[];
    productPrinciples?: string[];
    editorialFoundations?: string[];
    challenges?: string[];
    solutions?: string[];
    highlights?: string[];
    uxHighlights?: string[];
    uiHighlights?: string[];
    metrics?: string[];
    notableDecisions?: string[];
    nextSteps?: string[];
    testing?: ProjectTesting;
    architecture?: ProjectArchitecture;
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

function parseTesting(value: unknown): ProjectTesting | undefined {
    if (!isRecord(value)) return undefined;

    const strategy = getString(value.strategy);
    const coverage = getStringArray(value.coverage);

    if (!strategy && !coverage?.length) return undefined;

    return { strategy, coverage };
}

function parseArchitecture(value: unknown): ProjectArchitecture | undefined {
    if (!isRecord(value)) return undefined;

    const summary = getString(value.summary);
    const keyPoints = getStringArray(value.keyPoints);
    const sections: Array<{ title: string; items: string[] }> = [];

    for (const [k, v] of Object.entries(value)) {
        if (k === 'summary' || k === 'keyPoints') continue;
        const items = getStringArray(v);
        if (!items?.length) continue;
        sections.push({ title: k, items });
    }

    if (!summary && !keyPoints?.length && !sections.length) return undefined;

    return { summary, keyPoints, sections: sections.length ? sections : undefined };
}

/**
 * Construit un objet `Project` tolérant aux champs partiels.
 *
 * Règle métier implicite : seul `title` est obligatoire pour conserver
 * la résilience du site si un JSON contenu est incomplet en production.
 */
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
        vision: getString(raw.vision),
        objectives: getStringArray(raw.objectives),
        productPrinciples: getStringArray(raw.productPrinciples),
        editorialFoundations: getStringArray(raw.editorialFoundations),
        challenges: getStringArray(raw.challenges),
        solutions: getStringArray(raw.solutions),
        highlights: getStringArray(raw.highlights),
        uxHighlights: getStringArray(raw.uxHighlights),
        uiHighlights: getStringArray(raw.uiHighlights),
        metrics: getStringArray(raw.metrics),
        notableDecisions: getStringArray(raw.notableDecisions),
        nextSteps: getStringArray(raw.nextSteps),
        testing: parseTesting(raw.testing),
        architecture: parseArchitecture(raw.architecture),
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
        const files = await readdir(DIR);
        return files.filter((f) => f.endsWith('.json')).map((f) => f.slice(0, -'.json'.length));
    } catch {
        return [];
    }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
    try {
        const file = await readFile(path.join(DIR, `${slug}.json`), 'utf8');
        const raw: unknown = JSON.parse(file);
        return parseProject(raw, slug);
    } catch {
        return null;
    }
}

/**
 * Retourne tous les projets valides triés pour l'affichage public.
 *
 * Tri intentionnel : année décroissante puis titre FR pour garantir une
 * navigation stable et naturelle.
 */
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
