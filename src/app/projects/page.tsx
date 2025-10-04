// src/app/projets/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getAllProjects } from '@/lib/projects';
import Chip from '@/components/ui/Chip';

export const metadata: Metadata = {
    title: 'Projets - Vanoverberghe Stéphanie',
    description: 'Études de cas front-end : Mystères à la carte, Alchimiste Créations, Ancre-toi.',
};

export const dynamic = 'force-static';

/** Classe la stack par “intérêt visuel” pour la carte (2 max) */
function pickStackChips(stack: string[] = [], n = 2): string[] {
    const s = stack.map((x) => x.trim()).filter(Boolean);

    // Évite les basiques en priorité (on les garde en fallback)
    const isBaseline = (t: string) => /(react|next\.?js|typescript|tailwind|framer)/i.test(t);

    // Priorités: archi > outils > bases de données > le reste > basiques
    const priorities: RegExp[] = [
        /(webhook|auth|oauth|rbac|dashboard|rsc|ssg|ssr|isr|caching)/i,
        /(stripe|vercel|analytics|eslint|prettier|pnpm|npm|git)/i,
        /(mongodb|postgres|prisma)/i,
        /(image|zod)/i,
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

    // 1) par priorité
    for (const re of priorities) {
        if (pushIf((t) => re.test(t))) break;
    }
    // 2) tags non basiques restants
    if (chosen.length < n) pushIf((t) => !isBaseline(t));
    // 3) fallback: basiques
    if (chosen.length < n) pushIf(() => true);

    return chosen.slice(0, n);
}

/** Mappe un tag → catégorie Chip */
function kindFor(tag: string): 'tech' | 'tool' | 'architecture' | 'design' {
    const t = tag.toLowerCase();
    if (/(webhook|auth|oauth|rbac|dashboard|rsc|ssg|ssr|isr|caching)/.test(t)) return 'architecture';
    if (/(stripe|vercel|eslint|prettier|pnpm|npm|analytics|git)/.test(t)) return 'tool';
    if (/(react|next|typescript|tailwind|framer|mongodb|postgres|prisma|zod|image)/.test(t)) return 'tech';
    // (UI/UX etc. restera géré via les "roles" → design)
    return 'tech';
}

export default async function ProjectsPage() {
    const projects = await getAllProjects();

    return (
        <section className="container-page py-10 space-y-8">
            <header>
                <h1 className="text-2xl sm:text-3xl font-semibold" style={{ color: 'var(--text-strong)' }}>
                    Projets
                </h1>
                <p className="mt-2 opacity-80 max-w-[70ch]">Études de cas sélectionnées. Créativité, exécution technique, et sens du détail.</p>
                <div className="mt-6 hr-soft" />
            </header>

            {/* égalisation de hauteur des items */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
                {projects.map((p) => {
                    const stackChips = pickStackChips(p.stack ?? [], 2);
                    return (
                        <article
                            key={p.slug}
                            className="group relative overflow-hidden rounded-2xl border hover-scale h-full"
                            style={{
                                borderColor: 'var(--border-soft)',
                                background: 'var(--surface-1)',
                                boxShadow: 'var(--shadow-card)',
                            }}
                        >
                            {/* Glow radial subtil au survol */}
                            <span
                                aria-hidden
                                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                style={{
                                    background: `radial-gradient(60% 60% at 50% 0%,
                    color-mix(in oklab, var(--accent) 22%, transparent),
                    transparent 70%)`,
                                }}
                            />

                            {/* Toute la carte est cliquable + layout en colonne */}
                            <Link href={`/projects/${p.slug}`} className="relative flex h-full flex-col">
                                {/* Bandeau visuel */}
                                <div
                                    className="relative aspect-[16/10] w-full border-b overflow-hidden"
                                    style={{
                                        borderColor: 'var(--border-soft)',
                                        background: `linear-gradient(
                      to bottom right,
                      color-mix(in oklab, var(--surface-2) 86%, var(--surface-1)),
                      var(--surface-2)
                    )`,
                                    }}
                                >
                                    {/* motif texturé très léger */}
                                    <div
                                        className="absolute inset-0 opacity-[0.08]"
                                        style={{
                                            backgroundImage: 'radial-gradient(1px 1px at 20px 20px, var(--text) 10%, transparent 11%)',
                                        }}
                                    />
                                    {p.logo?.image ? (
                                        <Image
                                            src={p.logo.image}
                                            alt={p.logo.alt ?? p.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                            className="object-contain p-6 transition-transform duration-300 group-hover:scale-[1.03]"
                                            style={{ filter: 'drop-shadow(0 6px 18px rgba(2, 8, 23, 0.10))' }}
                                            priority={false}
                                        />
                                    ) : p.hero?.image ? (
                                        <Image
                                            src={p.hero.image}
                                            alt={p.hero.alt ?? p.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                                            priority={false}
                                        />
                                    ) : (
                                        <div className="h-full w-full" style={{ background: 'var(--surface-2)' }} />
                                    )}

                                    {/* Badge Année */}
                                    {p.year ? (
                                        <div className="absolute right-3 top-3">
                                            <Chip size="xs" color="gold">
                                                {p.year}
                                            </Chip>
                                        </div>
                                    ) : null}
                                </div>

                                {/* Contenu en colonne + CTA épinglé */}
                                <div className="p-5 flex min-h-0 flex-1 flex-col">
                                    <h2 className="text-base sm:text-lg font-semibold" style={{ color: 'var(--text-strong)' }}>
                                        {p.title}
                                    </h2>
                                    {p.subtitle ? <p className="mt-1 text-sm opacity-80">{p.subtitle}</p> : null}

                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {/* Rôles → design (identité/UX) */}
                                        {(p.role ?? []).slice(0, 2).map((r) => (
                                            <Chip key={r} kind="design">
                                                {r}
                                            </Chip>
                                        ))}
                                        {/* Stack → auto catégorie (tech/tool/architecture) */}
                                        {stackChips.map((s) => (
                                            <Chip key={s} kind={kindFor(s)}>
                                                {s}
                                            </Chip>
                                        ))}
                                    </div>

                                    {/* CTA collé en bas grâce à mt-auto */}
                                    <div className="mt-auto pt-4 inline-flex items-center gap-2 text-sm font-medium" style={{ color: 'var(--text-strong)' }}>
                                        Voir le projet
                                        <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                                    </div>
                                </div>
                            </Link>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}
