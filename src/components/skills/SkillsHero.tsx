import Link from 'next/link';
import Chip from '@/components/ui/Chip';

function Kicker({ children }: { children: React.ReactNode }) {
    return <span className="text-xs uppercase tracking-[0.14em] text-(--accent)">{children}</span>;
}

function Stat({ label, value }: { label: string; value: string }) {
    return (
        <div
            className="rounded-2xl border px-4 py-3 border-(--border-soft)"
            style={{
                background: 'color-mix(in oklab, var(--surface-2) 58%, var(--surface-1))',
            }}
        >
            <div className="text-sm font-semibold text-(--text-strong)">{value}</div>
            <div className="text-xs opacity-75">{label}</div>
        </div>
    );
}

export default function SkillsHero() {
    return (
        <header className="relative overflow-hidden rounded-2xl border p-6 sm:p-10 border-(--border-soft) bg-(--surface-1) shadow-(--shadow-card)">
            <div className="relative space-y-6">
                {/* Intro (kicker + titre + texte) */}
                <div className="space-y-2">
                    <Kicker>Expertises</Kicker>

                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-(--text-strong)">
                        Front-end React/Next.js
                        <span className="opacity-70"> · UI/UX · Performance</span>
                    </h1>

                    <p className="opacity-80 max-w-[80ch]">
                        Je construis des interfaces scannables et rassurantes, avec une exécution front solide : composants réutilisables, design system léger, accessibilité, SEO
                        et perf.
                    </p>
                </div>

                <div className="hr-soft" />

                {/* Contenu bento (exact logique HomeHero : 2 colonnes) */}
                <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
                    {/* left */}
                    <div className="space-y-5">
                        <div className="flex flex-wrap gap-2">
                            <Chip kind="tech">React</Chip>
                            <Chip kind="tech">Next.js</Chip>
                            <Chip kind="tech">TypeScript</Chip>
                            <Chip kind="design">UI/UX</Chip>
                            <Chip kind="architecture">Perf/SEO</Chip>
                            <Chip kind="tool">Git/Vercel</Chip>
                        </div>

                        <div
                            className="rounded-2xl border p-4 sm:p-5 border-(--border-soft)"
                            style={{
                                background: 'color-mix(in oklab, var(--surface-2) 54%, var(--surface-1))',
                            }}
                        >
                            <div className="text-sm font-semibold text-(--text-strong)">Ce que j’apporte</div>

                            <ul className="mt-3 space-y-2 text-sm opacity-85">
                                <li className="flex gap-2">
                                    <span aria-hidden>•</span>
                                    <span>Interfaces lisibles, hiérarchie claire, CTA “juste”.</span>
                                </li>
                                <li className="flex gap-2">
                                    <span aria-hidden>•</span>
                                    <span>Composants réutilisables + tokens (design system léger).</span>
                                </li>
                                <li className="flex gap-2">
                                    <span aria-hidden>•</span>
                                    <span>Perf et accessibilité intégrées dès le départ.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <Link href="/projects" className="btn btn-secondary">
                                Voir les projets
                            </Link>
                            <Link href="/contact" className="btn btn-cta text-(--surface-1)">
                                Me contacter
                            </Link>
                        </div>
                    </div>

                    {/* right */}
                    <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                        <Stat label="Approche" value="Mobile-first & scannable" />
                        <Stat label="Qualité" value="A11y · SEO · Perf" />
                        <Stat label="Style" value="UI premium & sobre" />
                    </div>
                </div>
            </div>
        </header>
    );
}
