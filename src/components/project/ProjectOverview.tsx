// src/components/project/ProjectOverview.tsx
import Link from 'next/link';
import Chip from '@/components/ui/Chip';
import type { Project } from '@/lib/projects';
import { excerpt } from './project.utils';

export default function ProjectOverview({ project }: { project: Project }) {
    const p = project;

    const quickFacts = [
        p.year ? { label: 'Année', value: String(p.year) } : null,
        p.role?.length ? { label: 'Rôle', value: p.role.slice(0, 2).join(' · ') } : null,
        p.stack?.length ? { label: 'Stack', value: p.stack.slice(0, 3).join(' · ') } : null,
    ].filter((item): item is { label: string; value: string } => Boolean(item));

    return (
        <section className="grid gap-6 md:grid-cols-[1.25fr_.75fr] items-start">
            <article className="panel p-6">
                <h2 className="text-lg section-title">Contexte</h2>
                {p.context ? <p className="mt-2 text-(--text) max-w-[80ch]">{p.context}</p> : null}

                {p.highlights?.length ? (
                    <>
                        <div className="mt-6 hr-soft" />
                        <h3 className="mt-6 text-base font-semibold text-(--text-strong)">Points clés</h3>
                        <ul className="mt-3 grid gap-2 sm:grid-cols-2 text-sm text-(--text)">
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
                            <a href={p.links.demo} target="_blank" rel="noopener noreferrer" className="btn btn-cta w-full sm:w-auto text-(--surface-1)">
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
                    <div className="text-sm font-semibold text-(--text-strong)">Fiche rapide</div>

                    <div className="mt-4 grid gap-y-3 text-sm">
                        {quickFacts.map((row) => (
                            <div key={row.label} className="grid grid-cols-[92px_1fr] gap-3">
                                <div className="font-semibold text-(--text-strong)">{row.label}</div>
                                <div className="text-(--text)">{excerpt(row.value, 120)}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </aside>
        </section>
    );
}
