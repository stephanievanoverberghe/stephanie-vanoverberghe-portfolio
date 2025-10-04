// src/app/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getAllProjects } from '@/lib/projects';
import Chip from '@/components/ui/Chip';

export const metadata: Metadata = {
    title: 'Vanoverberghe Stéphanie - Développeuse Front-End (React/Next)',
    description: 'Portfolio front-end React / Next.js - créatif & technique. Études de cas, UI/UX, TypeScript, Tailwind.',
    alternates: { canonical: '/' },
};

/* ---------- helpers ---------- */
function kindFor(tag: string): 'tech' | 'tool' | 'architecture' | 'design' {
    const t = tag.toLowerCase();
    if (/(webhook|auth|oauth|rbac|dashboard|rsc|ssg|ssr|isr|caching)/.test(t)) return 'architecture';
    if (/(stripe|vercel|eslint|prettier|pnpm|npm|analytics|git)/.test(t)) return 'tool';
    if (/(react|next|typescript|tailwind|framer|mongodb|postgres|prisma|zod|image)/.test(t)) return 'tech';
    return 'tech';
}

// mapper “kind” -> props Chip (couleurs douces et cohérentes)
function stylesByKind(kind: 'tech' | 'design' | 'tool' | 'architecture') {
    switch (kind) {
        case 'design':
            return { color: 'lilac' as const, appearance: 'soft' as const, tone: 'subtle' as const };
        case 'tool':
            return { color: 'gold' as const, appearance: 'soft' as const, tone: 'subtle' as const };
        case 'architecture':
            return { color: 'sage' as const, appearance: 'outline' as const, tone: 'subtle' as const };
        case 'tech':
        default:
            return { color: 'accent' as const, appearance: 'soft' as const, tone: 'subtle' as const };
    }
}

// prend 2 tags “parlants” pour les cartes (évite de répéter React/Next)
function pickStack(stack: string[] = [], n = 2): string[] {
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
    for (const re of tiers) if (pick(re)) break;
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

export default async function HomePage() {
    const all = await getAllProjects();
    const featured = all.slice(0, 3);

    return (
        <section className="container-page py-10 space-y-12">
            {/* HERO */}
            <header
                className="relative overflow-hidden rounded-2xl border p-6 sm:p-10"
                style={{ borderColor: 'var(--border-soft)', background: 'var(--surface-1)', boxShadow: 'var(--shadow-card)' }}
            >
                {/* voile texturé discret */}
                <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-[0.06]"
                    style={{ backgroundImage: 'radial-gradient(1px 1px at 24px 24px, var(--text) 12%, transparent 13%)' }}
                />
                <div className="relative">
                    <p className="text-xs uppercase tracking-[0.14em]" style={{ color: 'var(--accent)' }}>
                        Portfolio
                    </p>
                    <h1 className="mt-2 text-[1.75rem] sm:text-4xl font-semibold" style={{ color: 'var(--text-strong)' }}>
                        Vanoverberghe Stéphanie
                    </h1>
                    <p className="mt-2 text-base sm:text-lg max-w-[65ch] opacity-90">
                        Développeuse Front-End React/Next.js - <span className="opacity-90">créative</span>, <span className="opacity-90">dynamique</span>,{' '}
                        <span className="opacity-90">sensible</span> et <span className="opacity-90">professionnelle</span>. J’allie exigence UI/UX, performance et accessibilité
                        pour des expériences web vivantes et soignées.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                        <Link href="/projects" className="btn btn-cta" style={{ color: '#FDFDFD' }}>
                            Voir les projets
                        </Link>
                        <Link href="/skills" className="btn btn-secondary">
                            Mes compétences
                        </Link>
                        <Link href="/contact" className="btn btn-ghost">
                            Me contacter
                        </Link>
                    </div>
                </div>
            </header>

            {/* PROJETS EN VEDETTE */}
            <section className="space-y-4">
                <div className="flex items-baseline justify-between">
                    <h2 className="text-lg font-semibold" style={{ color: 'var(--text-strong)' }}>
                        Projets en vedette
                    </h2>
                    <Link href="/projects" className="text-sm hover:opacity-90" style={{ color: 'var(--text-strong)' }}>
                        Tous les projets →
                    </Link>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {featured.map((p) => {
                        const picked = pickStack(p.stack, 2);
                        return (
                            <article
                                key={p.slug}
                                className="group relative overflow-hidden rounded-2xl border hover-scale"
                                style={{ borderColor: 'var(--border-soft)', background: 'var(--surface-1)', boxShadow: 'var(--shadow-card)' }}
                            >
                                <Link href={`/projects/${p.slug}`} className="block">
                                    {/* Bandeau visuel */}
                                    <div
                                        className="relative aspect-[16/10] w-full border-b overflow-hidden"
                                        style={{
                                            borderColor: 'var(--border-soft)',
                                            background: `linear-gradient(to bottom right, color-mix(in oklab, var(--surface-2) 86%, var(--surface-1)), var(--surface-2))`,
                                        }}
                                    >
                                        {/* motif léger */}
                                        <div
                                            className="absolute inset-0 opacity-[0.08]"
                                            style={{ backgroundImage: 'radial-gradient(1px 1px at 20px 20px, var(--text) 10%, transparent 11%)' }}
                                        />
                                        {p.logo?.image ? (
                                            <Image
                                                src={p.logo.image}
                                                alt={p.logo.alt ?? p.title}
                                                fill
                                                sizes="(max-width:768px) 100vw, 33vw"
                                                className="object-contain p-6 transition-transform duration-300 group-hover:scale-[1.03]"
                                                style={{ filter: 'drop-shadow(0 6px 18px rgba(2, 8, 23, 0.10))' }}
                                                priority={false}
                                            />
                                        ) : p.hero?.image ? (
                                            <Image
                                                src={p.hero.image}
                                                alt={p.hero.alt ?? p.title}
                                                fill
                                                sizes="(max-width:768px) 100vw, 33vw"
                                                className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                                                priority={false}
                                            />
                                        ) : null}

                                        {p.year ? (
                                            <div className="absolute right-3 top-3">
                                                <Chip size="xs" color="gold" appearance="soft">
                                                    {p.year}
                                                </Chip>
                                            </div>
                                        ) : null}
                                    </div>

                                    {/* Contenu */}
                                    <div className="p-5">
                                        <h3 className="text-base sm:text-lg font-semibold" style={{ color: 'var(--text-strong)' }}>
                                            {p.title}
                                        </h3>
                                        {p.subtitle ? <p className="mt-1 text-sm opacity-80">{p.subtitle}</p> : null}

                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {(p.role ?? []).slice(0, 2).map((r) => (
                                                <Chip key={r} {...stylesByKind('design')}>
                                                    {r}
                                                </Chip>
                                            ))}
                                            {picked.map((s) => (
                                                <Chip key={s} {...stylesByKind(kindFor(s))}>
                                                    {s}
                                                </Chip>
                                            ))}
                                        </div>

                                        <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium" style={{ color: 'var(--text-strong)' }}>
                                            Voir le projet <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                                        </div>
                                    </div>
                                </Link>
                            </article>
                        );
                    })}
                </div>
            </section>

            {/* SNAPSHOT COMPÉTENCES */}
            <section className="grid gap-6 md:grid-cols-2">
                <div className="card p-6">
                    <h2 className="text-lg font-semibold" style={{ color: 'var(--text-strong)' }}>
                        Front-End & UI/UX
                    </h2>
                    <div className="mt-3 flex flex-wrap gap-2">
                        <Chip {...stylesByKind('tech')}>React</Chip>
                        <Chip {...stylesByKind('tech')}>Next.js</Chip>
                        <Chip {...stylesByKind('tech')}>TypeScript</Chip>
                        <Chip {...stylesByKind('tech')}>Tailwind</Chip>
                        <Chip {...stylesByKind('design')}>Design system</Chip>
                        <Chip {...stylesByKind('design')}>Micro-interactions</Chip>
                        <Chip {...stylesByKind('design')}>Accessibilité</Chip>
                    </div>
                </div>

                <div className="card p-6">
                    <h2 className="text-lg font-semibold" style={{ color: 'var(--text-strong)' }}>
                        Outils & Architecture
                    </h2>
                    <div className="mt-3 flex flex-wrap gap-2">
                        <Chip {...stylesByKind('tool')}>Git</Chip>
                        <Chip {...stylesByKind('tool')}>Vercel</Chip>
                        <Chip {...stylesByKind('tool')}>ESLint/Prettier</Chip>
                        <Chip {...stylesByKind('architecture')}>SSG/ISR</Chip>
                        <Chip {...stylesByKind('architecture')}>RSC + Suspense</Chip>
                        <Chip {...stylesByKind('tool')}>Stripe</Chip>
                        <Chip {...stylesByKind('tech')}>MongoDB</Chip>
                    </div>
                </div>
            </section>

            {/* CTA final */}
            <section className="card p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <p className="opacity-90">Disponible pour un poste front-end React/Next.js.</p>
                    <div className="flex flex-wrap gap-3">
                        <a href="/cv-vanoverberghe-stephanie.pdf" className="btn btn-secondary">
                            Télécharger mon CV
                        </a>
                        <Link href="/contact" className="btn btn-cta" style={{ color: '#FDFDFD' }}>
                            Me contacter
                        </Link>
                    </div>
                </div>
            </section>
        </section>
    );
}
