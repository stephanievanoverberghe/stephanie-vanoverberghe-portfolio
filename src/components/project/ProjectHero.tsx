import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import Chip from '@/components/ui/Chip';
import type { Project } from '@/lib/projects';

import ProjectActions from './ProjectActions';
import { coverAlt, coverSrc, excerpt, kindFor } from './project.utils';

export default function ProjectHero({ project }: { project: Project }) {
    const src = coverSrc(project);
    const alt = coverAlt(project);

    return (
        <header className="space-y-5">
            <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-semibold text-(--text-strong) transition hover:text-(--accent)">
                <ArrowLeft size={16} />
                Retour aux projets
            </Link>

            <section className="relative overflow-hidden rounded-4xl border border-(--border-soft) bg-(--surface-1) shadow-(--shadow-card)">
                <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-(--lilac)/30 blur-3xl" />
                <div aria-hidden className="absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-(--sage)/20 blur-3xl" />

                <div className="relative grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_420px] lg:p-10">
                    <div>
                        <div className="flex flex-wrap items-center gap-3">
                            <p className="text-xs font-bold uppercase tracking-[0.28em] text-(--gold)">Étude de cas</p>

                            {project.year ? (
                                <Chip size="xs" color="gold">
                                    {project.year}
                                </Chip>
                            ) : null}
                        </div>

                        <h1 className="mt-5 max-w-4xl text-[clamp(2.6rem,5.8vw,5.8rem)] font-semibold leading-[0.95] tracking-[-0.075em] text-(--text-strong)">{project.title}</h1>

                        {project.subtitle ? <p className="mt-5 max-w-2xl text-base leading-7 text-(--text)">{project.subtitle}</p> : null}

                        <div className="mt-6 flex flex-wrap gap-2">
                            {(project.role ?? []).map((role) => (
                                <Chip key={role} kind="design">
                                    {role}
                                </Chip>
                            ))}

                            {(project.stack ?? []).slice(0, 7).map((stack) => (
                                <Chip key={stack} kind={kindFor(stack)}>
                                    {stack}
                                </Chip>
                            ))}
                        </div>

                        <div className="mt-7">
                            <ProjectActions project={project} variant="hero" />
                        </div>

                        <nav className="mt-7 flex flex-wrap gap-2">
                            <a href="#overview" className="btn btn-secondary">
                                Résumé
                            </a>

                            <a href="#details" className="btn btn-secondary">
                                Démarche
                            </a>

                            {project.gallery?.length ? (
                                <a href="#gallery" className="btn btn-secondary">
                                    Galerie
                                </a>
                            ) : null}
                        </nav>
                    </div>

                    <aside className="space-y-4">
                        <div className="overflow-hidden rounded-[1.7rem] border border-(--border-soft) bg-(--paper)">
                            <div className="relative aspect-16/10">
                                {src ? (
                                    <Image
                                        src={src}
                                        alt={alt}
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 420px"
                                        className="object-cover"
                                        style={{ objectPosition: '50% 10%' }}
                                        priority
                                    />
                                ) : (
                                    <div
                                        aria-hidden
                                        className="absolute inset-0"
                                        style={{
                                            background: 'linear-gradient(135deg, color-mix(in oklab, var(--sage) 18%, var(--surface-1)), var(--surface-1))',
                                        }}
                                    />
                                )}
                            </div>
                        </div>

                        <div
                            className="rounded-[1.7rem] border p-5"
                            style={{
                                borderColor: 'var(--border-soft)',
                                background: 'color-mix(in oklab, var(--surface-2) 48%, var(--surface-1))',
                            }}
                        >
                            <p className="text-xs font-bold uppercase tracking-[0.22em] text-(--accent)">En bref</p>

                            <dl className="mt-4 space-y-4 text-sm">
                                {project.context ? (
                                    <div>
                                        <dt className="font-semibold text-(--text-strong)">Contexte</dt>
                                        <dd className="mt-1 leading-6 text-(--text)">{excerpt(project.context, 135)}</dd>
                                    </div>
                                ) : null}

                                {project.objectives?.[0] ? (
                                    <div>
                                        <dt className="font-semibold text-(--text-strong)">Objectif</dt>
                                        <dd className="mt-1 leading-6 text-(--text)">{excerpt(project.objectives[0], 135)}</dd>
                                    </div>
                                ) : null}

                                <div>
                                    <dt className="font-semibold text-(--text-strong)">Focus</dt>
                                    <dd className="mt-1 leading-6 text-(--text)">
                                        {project.highlights?.[0] ? excerpt(project.highlights[0], 135) : (project.stack ?? []).slice(0, 4).join(' · ')}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </aside>
                </div>
            </section>
        </header>
    );
}
