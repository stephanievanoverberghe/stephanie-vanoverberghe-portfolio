import type { ChipKind } from '@/components/ui/chip-utils';
import type { Project } from '@/lib/projects';

export type ProjectTone = 'accent' | 'sage' | 'lilac' | 'gold';

const projectTones: readonly ProjectTone[] = ['accent', 'sage', 'lilac', 'gold'];

/**
 * Associe un tag de stack à une famille visuelle de chip.
 *
 * L'objectif n'est pas d'être parfait sémantiquement mais de garder
 * une lecture visuelle stable sur toutes les cartes projet.
 */
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

/** Choisit la meilleure image de couverture disponible pour un projet. */
export function coverSrc(project: Project, fallback: string | null = null) {
    return project.hero?.image ?? project.logo?.image ?? fallback;
}

/** Fournit un texte alternatif robuste même si le contenu projet est partiel. */
export function coverAlt(project: Project) {
    return project.hero?.alt ?? project.logo?.alt ?? project.title;
}

/** Mappe un type de chip vers sa variante couleur. */
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

/** Tronque un texte sans couper brutalement le dernier mot. */
export function excerpt(text?: string, max = 150) {
    const value = (text ?? '').trim();

    if (!value) return '';
    if (value.length <= max) return value;

    return `${value.slice(0, max).replace(/\s+\S*$/, '')}…`;
}

/**
 * Produit le résumé court utilisé dans les cartes projet.
 *
 * L'ordre de priorité reflète le signal le plus utile pour une grille :
 * d'abord la promesse courte, puis le contexte, puis la vision.
 */
export function cardBlurb(project: Project) {
    return excerpt(project.subtitle, 130) || excerpt(project.context, 130) || excerpt(project.vision, 130) || excerpt(project.objectives?.[0], 130);
}

/** Fait tourner une petite palette de tons pour rythmer les cartes projet. */
export function toneForIndex(index: number): ProjectTone {
    return projectTones[index % projectTones.length];
}

/** Trie les projets selon l'ordre éditorial explicite, puis les départage de façon stable. */
export function sortProjectsByRecent(projects: Project[]) {
    return [...projects].sort((a, b) => {
        const oa = a.order ?? Infinity;
        const ob = b.order ?? Infinity;

        if (oa !== ob) return oa - ob;

        const ya = typeof a.year === 'number' ? a.year : -1;
        const yb = typeof b.year === 'number' ? b.year : -1;

        if (yb !== ya) return yb - ya;
        return a.title.localeCompare(b.title, 'fr');
    });
}

/**
 * Sélectionne les technologies les plus parlantes à afficher sur une carte.
 *
 * On priorise les briques que recruteurs et clients repèrent vite,
 * puis on complète avec le reste sans doublons.
 */
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

/** Sélectionne un sous-ensemble plus court de stack pour les emplacements compacts. */
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

/** Agrège quelques tags utiles à partir de la stack et du rôle. */
export function pickProjectTags(project: Project, limit = 6) {
    return [...(project.stack ?? []), ...(project.role ?? [])].map((item) => item.trim()).filter(Boolean).slice(0, limit);
}

/** Retourne une poignée de points forts exploitables dans les vues synthétiques. */
export function pickProjectHighlights(project: Project, limit = 3) {
    const highlights = (project.highlights ?? []).map((item) => item.trim()).filter(Boolean);
    return highlights.length ? highlights.slice(0, limit) : ['Interface', 'Structure', 'Experience utilisateur'];
}

/** Indique si le projet doit être présenté comme encore en cours. */
export function isProjectInProgress(project: Project) {
    return project.status === 'in-progress';
}

/** Retourne le libellé UI à afficher pour l'état d'avancement d'un projet. */
export function getProjectStatusLabel(project: Project) {
    return isProjectInProgress(project) ? 'En cours' : null;
}
