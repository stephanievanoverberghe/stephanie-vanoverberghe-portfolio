import type { Project } from '@/lib/projects';

export type ChipKind = 'tech' | 'tool' | 'architecture' | 'design';

export function kindFor(tag: string): ChipKind {
    const value = tag.toLowerCase();

    if (/(figma|ui|ux|design|responsive|accessibilité|a11y)/.test(value)) {
        return 'design';
    }

    if (/(webhook|auth|oauth|rbac|dashboard|rsc|ssg|ssr|isr|caching|api|seo)/.test(value)) {
        return 'architecture';
    }

    if (/(stripe|vercel|eslint|prettier|pnpm|npm|analytics|git|github|cloudinary)/.test(value)) {
        return 'tool';
    }

    return 'tech';
}

export function coverSrc(project: Project) {
    return project.hero?.image ?? project.logo?.image ?? null;
}

export function coverAlt(project: Project) {
    return project.hero?.alt ?? project.logo?.alt ?? project.title;
}

export function excerpt(text?: string, max = 160) {
    const value = (text ?? '').trim();

    if (!value) return '';
    if (value.length <= max) return value;

    return `${value.slice(0, max).replace(/\s+\S*$/, '')}…`;
}
