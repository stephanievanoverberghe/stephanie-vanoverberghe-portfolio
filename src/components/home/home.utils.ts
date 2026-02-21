// src/components/home/home.utils.ts
import type { Project } from '@/lib/projects';

type Kind = 'tech' | 'tool' | 'architecture' | 'design';

export function kindFor(tag: string): Kind {
    const t = tag.toLowerCase();
    if (/(webhook|auth|oauth|rbac|dashboard|rsc|ssg|ssr|isr|caching)/.test(t)) return 'architecture';
    if (/(stripe|vercel|eslint|prettier|pnpm|npm|analytics|git)/.test(t)) return 'tool';
    if (/(react|next|typescript|tailwind|framer|mongodb|postgres|prisma|zod|image)/.test(t)) return 'tech';
    return 'tech';
}

export function chipPropsByKind(kind: Kind) {
    switch (kind) {
        case 'design':
            return { color: 'lilac' as const };
        case 'tool':
            return { color: 'gold' as const };
        case 'architecture':
            return { color: 'sage' as const };
        case 'tech':
        default:
            return { color: 'accent' as const };
    }
}

export function pickStack(stack: string[] = [], n = 2): string[] {
    const base = stack.map((s) => s.trim()).filter(Boolean);
    const baseline = /(react|next\.?js|typescript|tailwind|framer)/i;

    const tiers = [/(mongodb|postgres|prisma|zod)/i, /(stripe|vercel|analytics|eslint|prettier|pnpm|npm|git)/i, /(rsc|ssg|ssr|isr|caching)/i];

    const chosen: string[] = [];
    const used = new Set<string>();

    const pick = (re: RegExp) => {
        for (const t of base) {
            if (!used.has(t) && re.test(t)) {
                chosen.push(t);
                used.add(t);
                if (chosen.length >= n) return true;
            }
        }
        return false;
    };

    for (const re of tiers) {
        if (pick(re)) break;
    }

    if (chosen.length < n) {
        for (const t of base) {
            if (!used.has(t) && !baseline.test(t)) {
                chosen.push(t);
                used.add(t);
                if (chosen.length >= n) break;
            }
        }
    }

    if (chosen.length < n) {
        for (const t of base) {
            if (!used.has(t)) {
                chosen.push(t);
                used.add(t);
                if (chosen.length >= n) break;
            }
        }
    }

    return chosen.slice(0, n);
}

export function pickFeatured(all: Project[], slugs: readonly string[]) {
    const map = new Map(all.map((p) => [p.slug, p]));
    return slugs.map((s) => map.get(s)).filter(Boolean) as Project[];
}
