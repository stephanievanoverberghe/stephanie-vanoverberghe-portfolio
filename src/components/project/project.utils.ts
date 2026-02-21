// src/components/project/project.utils.ts
import type { Project } from '@/lib/projects';

export type ChipKind = 'tech' | 'tool' | 'architecture' | 'design';

export function kindFor(tag: string): ChipKind {
    const t = tag.toLowerCase();
    if (/(webhook|auth|oauth|rbac|dashboard|rsc|ssg|ssr|isr|caching)/.test(t)) return 'architecture';
    if (/(stripe|vercel|eslint|prettier|pnpm|npm|analytics|git)/.test(t)) return 'tool';
    return 'tech';
}

export function coverSrc(p: Project) {
    return p.hero?.image ?? p.logo?.image ?? null;
}

export function coverAlt(p: Project) {
    return p.hero?.alt ?? p.logo?.alt ?? p.title;
}

export function excerpt(text?: string, max = 160) {
    const t = (text ?? '').trim();
    if (!t) return '';
    if (t.length <= max) return t;
    return t.slice(0, max).replace(/\s+\S*$/, '') + '…';
}
