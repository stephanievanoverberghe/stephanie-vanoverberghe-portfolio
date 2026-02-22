// src/components/project/ProjectHero.tsx
import Link from 'next/link';
import Image from 'next/image';
import Chip from '@/components/ui/Chip';
import type { Project } from '@/lib/projects';
import { kindFor, excerpt, coverAlt, coverSrc } from './project.utils';
import ProjectActions from './ProjectActions';

export default function ProjectHero({ project }: { project: Project }) {
    const p = project;
    const src = coverSrc(p);
    const alt = coverAlt(p);

    return (
        <header className="space-y-5">
            <div className="flex items-center justify-between gap-4">
                <Link href="/projects" className="text-sm font-semibold hover:opacity-90" style={{ color: 'var(--text-strong)' }}>
                    ← Retour aux projets
                </Link>
                {p.year ? (
                    <Chip size="xs" color="gold">
                        {p.year}
                    </Chip>
                ) : null}
            </div>

            <section
                className="relative overflow-hidden rounded-2xl border"
                style={{ borderColor: 'var(--border-soft)', background: 'var(--surface-1)', boxShadow: 'var(--shadow-card)' }}
            >
                <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.1fr_.9fr]">
                    {/* Texte */}
                    <div>
                        <p className="text-xs uppercase tracking-[0.14em]" style={{ color: 'var(--accent)' }}>
                            Étude de cas
                        </p>

                        <h1 className="mt-2 text-2xl sm:text-3xl md:text-4xl section-title">{p.title}</h1>
                        {p.subtitle ? <p className="mt-2 text-sm sm:text-base opacity-85 max-w-[70ch]">{p.subtitle}</p> : null}

                        <div className="mt-4 flex flex-wrap gap-2">
                            {(p.role ?? []).map((r) => (
                                <Chip key={r} kind="design">
                                    {r}
                                </Chip>
                            ))}
                            {(p.stack ?? []).map((s) => (
                                <Chip key={s} kind={kindFor(s)}>
                                    {s}
                                </Chip>
                            ))}
                        </div>

                        <div className="mt-5">
                            <ProjectActions project={p} variant="hero" />
                        </div>

                        {/* Jump links (UX) */}
                        <nav className="mt-6 flex flex-wrap gap-2 text-sm">
                            <a href="#overview" className="btn btn-secondary">
                                Résumé
                            </a>
                            <a href="#details" className="btn btn-secondary">
                                Détails
                            </a>
                            {p.gallery?.length ? (
                                <a href="#gallery" className="btn btn-secondary">
                                    Galerie
                                </a>
                            ) : null}
                        </nav>
                    </div>

                    {/* Cover + quick facts */}
                    <aside className="space-y-4">
                        <div
                            className="rounded-2xl border overflow-hidden"
                            style={{ borderColor: 'var(--border-soft)', background: 'var(--surface-1)', boxShadow: 'var(--shadow-card)' }}
                        >
                            {src ? (
                                <>
                                    <div
                                        className="flex items-center gap-2 px-3 py-2 border-b"
                                        style={{ borderColor: 'var(--border-soft)', background: 'color-mix(in oklab, var(--surface-1) 88%, var(--surface-2))' }}
                                    >
                                        <span className="h-2.5 w-2.5 rounded-full" style={{ background: 'color-mix(in oklab, var(--accent) 60%, #fff)' }} />
                                        <span className="h-2.5 w-2.5 rounded-full" style={{ background: 'color-mix(in oklab, var(--gold) 60%, #fff)' }} />
                                        <span className="h-2.5 w-2.5 rounded-full" style={{ background: 'color-mix(in oklab, var(--sage) 60%, #fff)' }} />
                                        <div className="ml-2 h-2.5 flex-1 rounded-full border" style={{ borderColor: 'var(--border-soft)', background: 'var(--surface-1)' }} />
                                    </div>

                                    <div className="relative aspect-21/9">
                                        <Image src={src} alt={alt} fill sizes="(max-width: 1024px) 100vw, 52vw" className="object-cover" style={{ objectPosition: '50% 12%' }} />
                                        <div aria-hidden className="pointer-events-none absolute inset-0" style={{ boxShadow: 'inset 0 -160px 200px rgba(2,8,23,0.18)' }} />
                                    </div>
                                </>
                            ) : (
                                <div className="p-6 text-sm opacity-80">Aperçu non disponible</div>
                            )}
                        </div>

                        {/* Mini résumé (pas un duplicata du Overview) */}
                        <div
                            className="rounded-2xl border p-4 sm:p-5"
                            style={{ borderColor: 'var(--border-soft)', background: 'color-mix(in oklab, var(--surface-2) 52%, var(--surface-1))' }}
                        >
                            <div className="text-sm font-semibold" style={{ color: 'var(--text-strong)' }}>
                                En bref
                            </div>

                            <dl className="mt-4 grid gap-3 text-sm">
                                {p.context ? (
                                    <div className="grid grid-cols-[88px_1fr] gap-3">
                                        <dt className="font-semibold" style={{ color: 'var(--text-strong)' }}>
                                            Contexte
                                        </dt>
                                        <dd className="opacity-85">{excerpt(p.context, 120)}</dd>
                                    </div>
                                ) : null}

                                {p.objectives?.[0] ? (
                                    <div className="grid grid-cols-[88px_1fr] gap-3">
                                        <dt className="font-semibold" style={{ color: 'var(--text-strong)' }}>
                                            Objectif
                                        </dt>
                                        <dd className="opacity-85">{excerpt(p.objectives[0], 120)}</dd>
                                    </div>
                                ) : null}

                                <div className="grid grid-cols-[88px_1fr] gap-3">
                                    <dt className="font-semibold" style={{ color: 'var(--text-strong)' }}>
                                        Focus
                                    </dt>
                                    <dd className="opacity-85">{p.highlights?.[0] ? excerpt(p.highlights[0], 120) : (p.stack ?? []).slice(0, 4).join(' · ')}</dd>
                                </div>
                            </dl>
                        </div>
                    </aside>
                </div>
            </section>
        </header>
    );
}
