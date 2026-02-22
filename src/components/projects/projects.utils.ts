// src/components/projects/projects.utils.ts
import type { Project } from '@/lib/projects';

export type ChipKind = 'tech' | 'tool' | 'architecture' | 'design';

const BASELINE = /(react|next\.?js|typescript|tailwind|framer)/i;

export function kindFor(tag: string): ChipKind {
    const t = tag.toLowerCase();
    if (/(webhook|oauth|rbac|rsc|ssg|ssr|isr|caching)/.test(t)) return 'architecture';
    if (/(stripe|vercel|eslint|prettier|pnpm|npm|analytics|git)/.test(t)) return 'tool';
    return 'tech';
}

export function pickStackChips(stack: string[] = [], n = 2): string[] {
    const s = stack.map((x) => x.trim()).filter(Boolean);

    const priorities: RegExp[] = [
        /(webhook|oauth|rbac|rsc|ssg|ssr|isr|caching)/i,
        /(stripe|vercel|analytics|eslint|prettier|pnpm|npm|git)/i,
        /(mongodb|postgres|prisma)/i,
        /(zod)/i,
    ];

    const chosen: string[] = [];
    const used = new Set<string>();

    const pushIf = (predicate: (t: string) => boolean) => {
        for (const t of s) {
            if (!used.has(t) && predicate(t)) {
                chosen.push(t);
                used.add(t);
                if (chosen.length >= n) return true;
            }
        }
        return false;
    };

    for (const re of priorities) {
        if (pushIf((t) => re.test(t))) break;
    }
    if (chosen.length < n) pushIf((t) => !BASELINE.test(t));
    if (chosen.length < n) pushIf(() => true);

    return chosen.slice(0, n);
}

export function coverSrc(p: Project) {
    return p.hero?.image ?? p.logo?.image ?? null;
}

export function coverAlt(p: Project) {
    return p.hero?.alt ?? p.logo?.alt ?? p.title;
}

function normalize(text: string): string {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, ' ')
        .trim();
}

function excerpt(text: string, max = 120): string {
    if (text.length <= max) return text;
    return text.slice(0, max).replace(/\s+\S*$/, '') + '…';
}

export function cardBlurb(project: Project): string {
    const candidates = [project.subtitle, project.context, project.highlights?.[0]].filter((value): value is string => Boolean(value?.trim()));
    const unique: string[] = [];
    const seen = new Set<string>();

    for (const text of candidates) {
        const key = normalize(text);
        if (!key || seen.has(key)) continue;
        seen.add(key);
        unique.push(text.trim());
        if (unique.length === 2) break;
    }

    if (!unique.length) return '';
    return excerpt(unique.join(' — '), 130);
}
