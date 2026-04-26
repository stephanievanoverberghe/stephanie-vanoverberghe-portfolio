// src/components/project/ProjectOverview.tsx

import Link from 'next/link';
import { ArrowUpRight, Github, MessageCircle } from 'lucide-react';

import Chip from '@/components/ui/Chip';
import type { Project } from '@/lib/projects';

import { excerpt } from './project.utils';

export default function ProjectOverview({ project }: { project: Project }) {
    const quickFacts = [
        project.year ? { label: 'Année', value: String(project.year) } : null,
        project.role?.length ? { label: 'Rôle', value: project.role.slice(0, 2).join(' · ') } : null,
        project.stack?.length ? { label: 'Stack', value: project.stack.slice(0, 3).join(' · ') } : null,
    ].filter((item): item is { label: string; value: string } => Boolean(item));

    return (
        <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <article className="relative overflow-hidden rounded-4xl border border-(--border-soft) bg-(--surface-1) p-6 shadow-(--shadow-card) sm:p-8">
                <div aria-hidden className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-(--lilac)/25 blur-3xl" />

                <div className="relative">
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-(--accent)">Résumé</p>

                    <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-(--text-strong)">Contexte du projet</h2>

                    {project.context ? <p className="mt-4 max-w-3xl text-base leading-7 text-(--text)">{project.context}</p> : null}

                    {project.highlights?.length ? (
                        <div className="mt-7 grid gap-3 sm:grid-cols-2">
                            {project.highlights.slice(0, 4).map((item) => (
                                <div
                                    key={item}
                                    className="rounded-2xl border px-4 py-3"
                                    style={{
                                        borderColor: 'color-mix(in oklab, var(--sage) 24%, var(--border-soft))',
                                        background: 'color-mix(in oklab, var(--surface-2) 48%, var(--surface-1))',
                                    }}
                                >
                                    <p className="text-sm leading-6 text-(--text)">
                                        <span className="mr-2 text-(--accent)">•</span>
                                        {item}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : null}
                </div>
            </article>

            <aside className="space-y-4 lg:sticky lg:top-24">
                <div className="rounded-4xl border border-(--border-soft) bg-(--surface-1) p-5 shadow-(--shadow-card)">
                    <div className="flex items-center justify-between gap-3">
                        <p className="text-xs font-bold uppercase tracking-[0.22em] text-(--accent)">Liens</p>

                        {project.links?.demo || project.links?.repo ? (
                            <Chip size="xs" color="accent">
                                Live
                            </Chip>
                        ) : null}
                    </div>

                    <div className="mt-5 grid gap-3">
                        {project.links?.demo ? (
                            <a
                                href={project.links.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-between gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5"
                                style={{
                                    background: 'linear-gradient(135deg, var(--accent), color-mix(in oklab, var(--accent) 78%, var(--ink)))',
                                }}
                            >
                                Voir la démo
                                <ArrowUpRight size={17} />
                            </a>
                        ) : null}

                        {project.links?.repo ? (
                            <a
                                href={project.links.repo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-sm font-bold text-(--text-strong) transition hover:-translate-y-0.5"
                                style={{
                                    borderColor: 'color-mix(in oklab, var(--gold) 42%, var(--border-soft))',
                                    background: 'color-mix(in oklab, var(--gold) 10%, var(--surface-1))',
                                }}
                            >
                                <span className="inline-flex items-center gap-2">
                                    <Github size={16} />
                                    Voir le code
                                </span>
                                <ArrowUpRight size={16} />
                            </a>
                        ) : null}

                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-sm font-bold text-(--text-strong) transition hover:-translate-y-0.5"
                            style={{
                                borderColor: 'color-mix(in oklab, var(--sage) 32%, var(--border-soft))',
                                background: 'color-mix(in oklab, var(--sage) 9%, var(--surface-1))',
                            }}
                        >
                            <span className="inline-flex items-center gap-2">
                                <MessageCircle size={16} />
                                Me contacter
                            </span>
                            <ArrowUpRight size={16} />
                        </Link>
                    </div>
                </div>

                {quickFacts.length ? (
                    <div
                        className="rounded-4xl border p-5 shadow-(--shadow-card)"
                        style={{
                            borderColor: 'var(--border-soft)',
                            background: 'color-mix(in oklab, var(--surface-2) 52%, var(--surface-1))',
                        }}
                    >
                        <p className="text-xs font-bold uppercase tracking-[0.22em] text-(--gold)">Fiche rapide</p>

                        <div className="mt-5 grid gap-3">
                            {quickFacts.map((row) => (
                                <div key={row.label} className="rounded-2xl border border-(--border-soft) bg-(--surface-1) px-4 py-3">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-(--accent)">{row.label}</p>

                                    <p className="mt-1 text-sm font-medium leading-6 text-(--text-strong)">{excerpt(row.value, 120)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : null}
            </aside>
        </section>
    );
}
