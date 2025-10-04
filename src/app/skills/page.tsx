// src/app/skills/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import Chip from '@/components/ui/Chip';

export const metadata: Metadata = {
    title: 'Compétences - Vanoverberghe Stéphanie',
    description: 'Compétences front-end (React, Next.js, TypeScript, Tailwind), UI/UX et mise en pratique sur Mystères à la carte, Alchimiste Créations et Ancre-toi.',
};

function Kicker({ children }: { children: React.ReactNode }) {
    return (
        <span className="text-xs uppercase tracking-[0.12em]" style={{ color: 'var(--accent)' }}>
            {children}
        </span>
    );
}

export default function SkillsPage() {
    return (
        <section className="container-page py-10 space-y-10">
            {/* Intro */}
            <header>
                <Kicker>Expertises</Kicker>
                <h1 className="mt-1 text-2xl sm:text-3xl font-semibold" style={{ color: 'var(--text-strong)' }}>
                    Compétences
                </h1>
                <p className="mt-2 opacity-80 max-w-[70ch]">
                    Développeuse front-end React/Next.js, sensible à l’UI/UX, aux performances et à l’accessibilité. J’aime relier une intention créative à une exécution technique
                    soignée.
                </p>
                <div className="mt-6 hr-soft" />
            </header>

            {/* Piliers techniques */}
            <section className="grid gap-6 md:grid-cols-2">
                <div className="card p-6 hover-scale">
                    <h2 className="text-lg font-semibold" style={{ color: 'var(--text-strong)' }}>
                        Front-End
                    </h2>
                    <div className="mt-3 flex flex-wrap gap-2">
                        <Chip tone="subtle">React</Chip>
                        <Chip tone="subtle">Next.js (App Router)</Chip>
                        <Chip tone="subtle">TypeScript</Chip>
                        <Chip color="accent" tone="subtle">
                            Tailwind CSS
                        </Chip>
                        <Chip color="lilac" tone="subtle">
                            Framer Motion
                        </Chip>
                        <Chip tone="subtle">Next/Image</Chip>
                    </div>
                </div>

                <div className="card p-6 hover-scale">
                    <h2 className="text-lg font-semibold" style={{ color: 'var(--text-strong)' }}>
                        UI/UX
                    </h2>
                    <div className="mt-3 flex flex-wrap gap-2">
                        <Chip color="lilac" tone="subtle">
                            Design system
                        </Chip>
                        <Chip color="lilac" tone="subtle">
                            Micro-interactions
                        </Chip>
                        <Chip color="sage" tone="subtle">
                            Accessibilité
                        </Chip>
                        <Chip tone="subtle">Mobile-first</Chip>
                        <Chip color="lilac" tone="subtle">
                            Rédaction UX
                        </Chip>
                    </div>
                </div>

                <div className="card p-6 hover-scale">
                    <h2 className="text-lg font-semibold" style={{ color: 'var(--text-strong)' }}>
                        Workflow
                    </h2>
                    <div className="mt-3 flex flex-wrap gap-2">
                        <Chip tone="subtle">Git</Chip>
                        <Chip tone="subtle">Vercel</Chip>
                        <Chip tone="subtle">ESLint/Prettier</Chip>
                        <Chip tone="subtle">pnpm/npm</Chip>
                        <Chip color="sage" tone="subtle">
                            Lighthouse
                        </Chip>
                        <Chip tone="subtle">Analytics (optionnel)</Chip>
                    </div>
                </div>

                <div className="card p-6 hover-scale">
                    <h2 className="text-lg font-semibold" style={{ color: 'var(--text-strong)' }}>
                        Architecture
                    </h2>
                    <div className="mt-3 flex flex-wrap gap-2">
                        <Chip appearance="outline" color="accent" tone="subtle">
                            RSC + Suspense
                        </Chip>
                        <Chip tone="subtle">SSG/ISR</Chip>
                        <Chip tone="subtle">SEO technique</Chip>
                        <Chip tone="subtle">Optimisation images</Chip>
                        <Chip color="sage" tone="subtle">
                            Accessibilité AA
                        </Chip>
                    </div>
                </div>
            </section>

            {/* Projets — compétences mises en œuvre */}
            <section className="space-y-6">
                <Kicker>Études de cas</Kicker>
                <h2 className="text-lg font-semibold" style={{ color: 'var(--text-strong)' }}>
                    Compétences mises en œuvre (projets)
                </h2>

                {/* Mystères à la carte */}
                <article className="card p-6 md:p-7 hover-scale" style={{ borderColor: 'var(--border-soft)' }}>
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                        <h3 className="text-base sm:text-lg font-semibold" style={{ color: 'var(--text-strong)' }}>
                            Mystères à la carte - escape game culinaire (Bastille)
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            <Chip tone="subtle">Next.js</Chip>
                            <Chip tone="subtle">TypeScript</Chip>
                            <Chip color="accent" tone="subtle">
                                Tailwind
                            </Chip>
                            <Chip color="lilac" tone="subtle">
                                UI/UX
                            </Chip>
                            <Chip color="lilac" tone="subtle">
                                Framer Motion
                            </Chip>
                        </div>
                    </div>

                    <p className="mt-2 max-w-[75ch] opacity-90">
                        One-page immersive, mobile-first, en thème sombre premium. Informations clés (menus, durée, joueurs) lisibles, et chemin vers la réservation clair.
                    </p>

                    <div className="mt-4 grid gap-4 sm:grid-cols-3">
                        <div className="rounded-xl border p-4" style={{ borderColor: 'var(--border-soft)' }}>
                            <div className="text-sm font-medium" style={{ color: 'var(--text-strong)' }}>
                                Compétences clés
                            </div>
                            <ul className="mt-2 space-y-1 text-sm opacity-90">
                                <li>Hiérarchie claire + ancrages</li>
                                <li>Micro-interactions sobres</li>
                                <li>Lisibilité en dark mode</li>
                            </ul>
                        </div>
                        <div className="rounded-xl border p-4" style={{ borderColor: 'var(--border-soft)' }}>
                            <div className="text-sm font-medium" style={{ color: 'var(--text-strong)' }}>
                                Tech utilisées
                            </div>
                            <ul className="mt-2 space-y-1 text-sm opacity-90">
                                <li>Next.js (App Router, SSG)</li>
                                <li>Tailwind v4 · tokens</li>
                                <li>Images optimisées</li>
                            </ul>
                        </div>
                        <div className="rounded-xl border p-4" style={{ borderColor: 'var(--border-soft)' }}>
                            <div className="text-sm font-medium" style={{ color: 'var(--text-strong)' }}>
                                Ce que ça prouve
                            </div>
                            <ul className="mt-2 space-y-1 text-sm opacity-90">
                                <li>Maîtrise UX en contexte réel</li>
                                <li>Perf & accessibilité</li>
                                <li>Exécution cohérente</li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-3">
                        <a href="https://mysteres-a-la-carte.vercel.app/" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                            Voir la démo
                        </a>
                        <Link href="/projets/mysteres-a-la-carte" className="btn btn-cta" style={{ color: '#FDFDFD' }}>
                            Étude de cas
                        </Link>
                    </div>
                </article>

                {/* Alchimiste Créations */}
                <article className="card p-6 md:p-7 hover-scale">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                        <h3 className="text-base sm:text-lg font-semibold" style={{ color: 'var(--text-strong)' }}>
                            Alchimiste Créations - site vitrine freelance
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            <Chip tone="subtle">Next.js</Chip>
                            <Chip tone="subtle">TypeScript</Chip>
                            <Chip color="accent" tone="subtle">
                                Tailwind
                            </Chip>
                            <Chip color="lilac" tone="subtle">
                                UI/UX
                            </Chip>
                        </div>
                    </div>

                    <p className="mt-2 max-w-[75ch] opacity-90">
                        Vitrine claire et rassurante pour présenter les prestations, le processus et un contact évident. Conversion douce et crédible.
                    </p>

                    <div className="mt-4 grid gap-4 sm:grid-cols-3">
                        <div className="rounded-xl border p-4" style={{ borderColor: 'var(--border-soft)' }}>
                            <div className="text-sm font-medium" style={{ color: 'var(--text-strong)' }}>
                                Compétences clés
                            </div>
                            <ul className="mt-2 space-y-1 text-sm opacity-90">
                                <li>Architecture éditoriale scannable</li>
                                <li>Composants prestations & FAQ</li>
                                <li>CTA visibles (mobile & desktop)</li>
                            </ul>
                        </div>
                        <div className="rounded-xl border p-4" style={{ borderColor: 'var(--border-soft)' }}>
                            <div className="text-sm font-medium" style={{ color: 'var(--text-strong)' }}>
                                Tech utilisées
                            </div>
                            <ul className="mt-2 space-y-1 text-sm opacity-90">
                                <li>Next.js (SSG)</li>
                                <li>Tailwind (tokens & surfaces)</li>
                                <li>SEO de base (metas/OG)</li>
                            </ul>
                        </div>
                        <div className="rounded-xl border p-4" style={{ borderColor: 'var(--border-soft)' }}>
                            <div className="text-sm font-medium" style={{ color: 'var(--text-strong)' }}>
                                Ce que ça prouve
                            </div>
                            <ul className="mt-2 space-y-1 text-sm opacity-90">
                                <li>Structuration de l’offre</li>
                                <li>UI orientée conversion</li>
                                <li>Accessibilité & perf</li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-3">
                        <a href="https://alchimiste-creations.vercel.app/" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                            Voir la démo
                        </a>
                        <Link href="/projets/mysteres-a-la-carte" className="btn btn-cta" style={{ color: '#FDFDFD' }}>
                            Étude de cas
                        </Link>
                    </div>
                </article>

                {/* Ancre-toi */}
                <article className="card p-6 md:p-7 hover-scale">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                        <h3 className="text-base sm:text-lg font-semibold" style={{ color: 'var(--text-strong)' }}>
                            Ancre-toi - site de développement personnel / formation
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            <Chip tone="subtle">Next.js</Chip>
                            <Chip tone="subtle">TypeScript</Chip>
                            <Chip color="accent" tone="subtle">
                                Tailwind
                            </Chip>
                            <Chip color="lilac" tone="subtle">
                                UX Writing
                            </Chip>
                            <Chip color="lilac" tone="subtle">
                                Pédagogie
                            </Chip>
                        </div>
                    </div>

                    <p className="mt-2 max-w-[75ch] opacity-90">
                        Parcours pédagogique structuré (modules, objectifs, ressources). Rythme de lecture confortable et CTA d’inscription clair.
                    </p>

                    <div className="mt-4 grid gap-4 sm:grid-cols-3">
                        <div className="rounded-xl border p-4" style={{ borderColor: 'var(--border-soft)' }}>
                            <div className="text-sm font-medium" style={{ color: 'var(--text-strong)' }}>
                                Compétences clés
                            </div>
                            <ul className="mt-2 space-y-1 text-sm opacity-90">
                                <li>Conception de parcours</li>
                                <li>Composants modules & ressources</li>
                                <li>Accessibilité du texte</li>
                            </ul>
                        </div>
                        <div className="rounded-xl border p-4" style={{ borderColor: 'var(--border-soft)' }}>
                            <div className="text-sm font-medium" style={{ color: 'var(--text-strong)' }}>
                                Tech utilisées
                            </div>
                            <ul className="mt-2 space-y-1 text-sm opacity-90">
                                <li>Next.js (SSG) + Suspense</li>
                                <li>Tailwind (tokens)</li>
                                <li>Focus & contrastes</li>
                            </ul>
                        </div>
                        <div className="rounded-xl border p-4" style={{ borderColor: 'var(--border-soft)' }}>
                            <div className="text-sm font-medium" style={{ color: 'var(--text-strong)' }}>
                                Ce que ça prouve
                            </div>
                            <ul className="mt-2 space-y-1 text-sm opacity-90">
                                <li>Clarté pédagogique & empathie</li>
                                <li>UX writing appliqué</li>
                                <li>Exécution cohérente</li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-3">
                        <a href="https://ancretoi.vercel.app/" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                            Voir la démo
                        </a>
                        <Link href="/projets/mysteres-a-la-carte" className="btn btn-cta" style={{ color: '#FDFDFD' }}>
                            Étude de cas
                        </Link>
                    </div>
                </article>
            </section>

            {/* CTA final */}
            <section className="card p-6 sm:p-8" style={{ borderColor: 'var(--border-soft)' }}>
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <p className="opacity-90">Disponible pour un poste front-end React/Next.js.</p>
                    <div className="flex flex-wrap gap-3">
                        <a href="/cv-vanoverberghe-stephanie.pdf" className="btn btn-secondary">
                            Télécharger mon CV
                        </a>
                        <a href="/contact" className="btn btn-cta" style={{ color: '#FDFDFD' }}>
                            Me contacter
                        </a>
                    </div>
                </div>
            </section>
        </section>
    );
}
