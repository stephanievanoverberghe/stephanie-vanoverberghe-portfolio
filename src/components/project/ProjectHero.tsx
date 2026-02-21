// src/components/project/ProjectHero.tsx
import Link from 'next/link';
import Chip from '@/components/ui/Chip';
import type { Project } from '@/lib/projects';
import { kindFor, excerpt } from './project.utils';

export default function ProjectHero({ project }: { project: Project }) {
    const p = project;

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
                <div className="relative grid gap-6 p-6 sm:p-8 md:grid-cols-[1.35fr_.65fr]">
                    {/* colonne texte */}
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

                        <div className="mt-5 flex flex-wrap gap-3">
                            {p.links?.demo ? (
                                <a href={p.links.demo} target="_blank" rel="noopener noreferrer" className="btn btn-cta" style={{ color: '#FDFDFD' }}>
                                    Voir la démo
                                </a>
                            ) : null}
                            {p.links?.repo ? (
                                <a href={p.links.repo} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                                    Voir le code
                                </a>
                            ) : null}
                            <Link href="/contact" className="btn btn-ghost">
                                Me contacter
                            </Link>
                        </div>
                    </div>

                    {/* colonne “quick facts” */}
                    <aside
                        className="rounded-2xl border p-4 sm:p-5"
                        style={{
                            borderColor: 'var(--border-soft)',
                            background: 'color-mix(in oklab, var(--surface-2) 52%, var(--surface-1))',
                        }}
                    >
                        <div className="flex items-center justify-between gap-3">
                            <div className="text-sm font-semibold" style={{ color: 'var(--text-strong)' }}>
                                Résumé
                            </div>
                            <Chip size="xs" color="accent">
                                Case study
                            </Chip>
                        </div>

                        <dl className="mt-4 grid gap-3 text-sm">
                            <div className="grid grid-cols-[90px_1fr] gap-3">
                                <dt className="font-semibold" style={{ color: 'var(--text-strong)' }}>
                                    Contexte
                                </dt>
                                <dd className="opacity-85">{excerpt(p.context, 120)}</dd>
                            </div>
                            <div className="grid grid-cols-[90px_1fr] gap-3">
                                <dt className="font-semibold" style={{ color: 'var(--text-strong)' }}>
                                    Objectif
                                </dt>
                                <dd className="opacity-85">{excerpt(p.objectives?.[0], 120)}</dd>
                            </div>
                            <div className="grid grid-cols-[90px_1fr] gap-3">
                                <dt className="font-semibold" style={{ color: 'var(--text-strong)' }}>
                                    Focus
                                </dt>
                                <dd className="opacity-85">{p.highlights?.[0] ? excerpt(p.highlights[0], 120) : (p.stack ?? []).slice(0, 4).join(' · ')}</dd>
                            </div>
                        </dl>
                    </aside>
                </div>
            </section>
        </header>
    );
}
