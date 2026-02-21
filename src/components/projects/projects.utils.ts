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
