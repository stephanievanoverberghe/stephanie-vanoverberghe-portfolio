import type { ChipKind } from '@/components/ui/chip-utils';
import type { Project } from '@/lib/projects';

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

export function chipPropsByKind(kind: ChipKind) {
    switch (kind) {
        case 'design':
            return { color: 'lilac' as const };
        case 'tool':
            return { color: 'gold' as const };
        case 'architecture':
            return { color: 'sage' as const };
        case 'tech':
        case 'neutral':
        default:
            return { color: 'accent' as const };
    }
}

export function excerpt(text?: string, max = 150) {
    const value = (text ?? '').trim();

    if (!value) return '';
    if (value.length <= max) return value;

    return `${value.slice(0, max).replace(/\s+\S*$/, '')}…`;
}

export function cardBlurb(project: Project) {
    return excerpt(project.subtitle, 130) || excerpt(project.context, 130) || excerpt(project.vision, 130) || excerpt(project.objectives?.[0], 130);
}

export function pickStackChips(stack: string[] = [], limit = 3) {
    const clean = stack.map((item) => item.trim()).filter(Boolean);

    const priority = [/react/i, /next/i, /typescript/i, /tailwind/i, /stripe/i, /mongodb|postgres|prisma/i, /zod/i, /vercel/i];

    const selected: string[] = [];
    const used = new Set<string>();

    for (const rule of priority) {
        const match = clean.find((item) => rule.test(item) && !used.has(item));

        if (match) {
            selected.push(match);
            used.add(match);
        }

        if (selected.length >= limit) return selected;
    }

    for (const item of clean) {
        if (!used.has(item)) {
            selected.push(item);
            used.add(item);
        }

        if (selected.length >= limit) break;
    }

    return selected;
}

export function pickStack(stack: string[] = [], count = 2): string[] {
    const base = stack.map((item) => item.trim()).filter(Boolean);
    const baseline = /(react|next\.?js|typescript|tailwind|framer)/i;
    const tiers = [/(mongodb|postgres|prisma|zod)/i, /(stripe|vercel|analytics|eslint|prettier|pnpm|npm|git)/i, /(rsc|ssg|ssr|isr|caching)/i];

    const chosen: string[] = [];
    const used = new Set<string>();

    const pick = (regex: RegExp) => {
        for (const item of base) {
            if (!used.has(item) && regex.test(item)) {
                chosen.push(item);
                used.add(item);

                if (chosen.length >= count) {
                    return true;
                }
            }
        }

        return false;
    };

    for (const regex of tiers) {
        if (pick(regex)) {
            break;
        }
    }

    if (chosen.length < count) {
        for (const item of base) {
            if (!used.has(item) && !baseline.test(item)) {
                chosen.push(item);
                used.add(item);
                if (chosen.length >= count) break;
            }
        }
    }

    if (chosen.length < count) {
        for (const item of base) {
            if (!used.has(item)) {
                chosen.push(item);
                used.add(item);
                if (chosen.length >= count) break;
            }
        }
    }

    return chosen.slice(0, count);
}

export function isProjectInProgress(project: Project) {
    return project.status === 'in-progress';
}

export function getProjectStatusLabel(project: Project) {
    return isProjectInProgress(project) ? 'En cours' : null;
}
