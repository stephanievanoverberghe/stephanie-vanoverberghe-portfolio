// src/components/project/ProjectOverview.tsx
import Link from 'next/link';
import Chip from '@/components/ui/Chip';
import type { Project } from '@/lib/projects';
import { excerpt } from './project.utils';

export default function ProjectOverview({ project }: { project: Project }) {
    const p = project;

    const rows = [
        { label: 'Contexte', value: excerpt(p.context, 150) },
        { label: 'Objectif', value: excerpt(p.objectives?.[0], 150) },
        { label: 'Livrable', value: excerpt(p.highlights?.[0], 150) },
    ].filter((x) => x.value);

    return (
        <section className="grid gap-6 md:grid-cols-[1.25fr_.75fr] items-start">
            {/* main */}
            <article className="panel p-6">
                <h2 className="text-lg section-title">Contexte</h2>
                {p.context ? <p className="mt-2 opacity-90 max-w-[80ch]">{p.context}</p> : null}

                {p.highlights?.length ? (
                    <>
                        <div className="mt-6 hr-soft" />
                        <h3 className="mt-6 text-base font-semibold" style={{ color: 'var(--text-strong)' }}>
                            Points clés
                        </h3>
                        <ul className="mt-3 grid gap-2 sm:grid-cols-2 text-sm opacity-90">
                            {p.highlights.slice(0, 4).map((it) => (
                                <li key={it} className="flex gap-2">
                                    <span aria-hidden>•</span>
                                    <span>{it}</span>
                                </li>
                            ))}
                        </ul>
                    </>
                ) : null}
            </article>

            {/* sticky sidebar */}
            <aside className="space-y-4 md:sticky md:top-24">
                <div className="panel p-6">
                    <div className="flex items-center justify-between gap-3">
                        <h2 className="text-lg section-title">Liens</h2>
                        <Chip size="xs" color="accent">
                            Live
                        </Chip>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-3">
                        {p.links?.demo ? (
                            <a href={p.links.demo} target="_blank" rel="noopener noreferrer" className="btn btn-cta w-full sm:w-auto" style={{ color: '#FDFDFD' }}>
                                Voir la démo
                            </a>
                        ) : null}
                        {p.links?.repo ? (
                            <a href={p.links.repo} target="_blank" rel="noopener noreferrer" className="btn btn-secondary w-full sm:w-auto">
                                Voir le code
                            </a>
                        ) : null}
                        <Link href="/contact" className="btn btn-ghost w-full sm:w-auto">
                            Me contacter
                        </Link>
                    </div>
                </div>

                <div
                    className="panel p-6"
                    style={{
                        background: 'color-mix(in oklab, var(--surface-2) 52%, var(--surface-1))',
                    }}
                >
                    <div className="text-sm font-semibold" style={{ color: 'var(--text-strong)' }}>
                        Infos rapides
                    </div>

                    <div className="mt-4 grid gap-y-3 text-sm">
                        {rows.map((row) => (
                            <div key={row.label} className="grid grid-cols-[92px_1fr] gap-3">
                                <div className="font-semibold" style={{ color: 'var(--text-strong)' }}>
                                    {row.label}
                                </div>
                                <div className="opacity-85">{row.value}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </aside>
        </section>
    );
}
