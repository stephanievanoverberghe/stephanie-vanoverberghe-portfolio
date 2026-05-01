import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import Chip from '@/components/ui/Chip';
import { projectsPageContent } from '@/content/projects-page';
import type { Project } from '@/lib/projects';

import { cardBlurb, coverAlt, coverSrc, getProjectStatusLabel, kindFor, pickStackChips } from './projects.utils';

const tones = ['accent', 'sage', 'lilac', 'gold'] as const;

type ProjectCardProps = {
    project: Project;
    index: number;
    featured?: boolean;
};

export default function ProjectCard({ project, index, featured = false }: ProjectCardProps) {
    const src = coverSrc(project);
    const alt = coverAlt(project);
    const stackChips = pickStackChips(project.stack ?? [], featured ? 4 : 3);
    const blurb = cardBlurb(project);
    const tone = tones[index % tones.length];
    const { listing } = projectsPageContent;
    const statusLabel = getProjectStatusLabel(project);

    return (
        <article
            className={[
                'group relative overflow-hidden rounded-[1.8rem] border bg-(--surface-1) shadow-(--shadow-card) transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(18,19,20,0.09)]',
                featured ? 'lg:rounded-4xl' : '',
            ].join(' ')}
            style={{ borderColor: 'var(--border-soft)' }}
        >
            <Link href={`/projects/${project.slug}`} className={featured ? 'grid p-4 lg:min-h-105 lg:grid-cols-[1.05fr_0.95fr] lg:p-5' : 'block p-4'}>
                <div
                    className={['relative overflow-hidden rounded-[1.45rem] border', featured ? 'lg:h-full' : ''].join(' ')}
                    style={{
                        borderColor: 'var(--border-soft)',
                        background: `linear-gradient(135deg, color-mix(in oklab, var(--${tone}) 16%, var(--surface-1)), var(--surface-1))`,
                    }}
                >
                    <div className={featured ? 'relative aspect-16/10 lg:h-full lg:aspect-auto' : 'relative aspect-16/10'}>
                        {src ? (
                            <Image
                                src={src}
                                alt={alt}
                                fill
                                sizes={featured ? '(max-width: 1024px) 100vw, 50vw' : '(max-width: 768px) 100vw, 33vw'}
                                className="object-cover transition duration-700 group-hover:scale-[1.035]"
                                style={{ objectPosition: '50% 10%' }}
                                priority={featured}
                            />
                        ) : (
                            <div
                                aria-hidden
                                className="absolute inset-0"
                                style={{
                                    background: `radial-gradient(circle at 30% 20%, color-mix(in oklab, var(--${tone}) 34%, transparent), transparent 44%),
                                    linear-gradient(135deg, var(--surface-2), var(--surface-1))`,
                                }}
                            />
                        )}

                        <div
                            aria-hidden
                            className="absolute inset-0"
                            style={{
                                background: 'linear-gradient(to top, rgba(18,19,20,0.18), transparent 48%)',
                            }}
                        />

                        <div className="absolute left-3 top-3 flex items-center gap-2">
                            <Chip size="xs" color={featured ? 'accent' : 'sage'}>
                                {featured ? listing.featuredLabel : listing.caseStudyLabel}
                            </Chip>
                            {statusLabel ? (
                                <Chip size="xs" color="gold">
                                    {statusLabel}
                                </Chip>
                            ) : null}
                        </div>

                        {project.year ? (
                            <div className="absolute right-3 top-3">
                                <Chip size="xs" color="gold">
                                    {project.year}
                                </Chip>
                            </div>
                        ) : null}
                    </div>
                </div>

                <div className={featured ? 'flex flex-col px-1 pt-5 lg:px-7 lg:py-5' : 'px-1 pt-5'}>
                    <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-(--accent)">
                                {listing.projectIndexLabel} {String(index + 1).padStart(2, '0')}
                            </p>

                            <h3 className={['mt-2 font-semibold leading-tight tracking-[-0.04em] text-(--text-strong)', featured ? 'text-3xl sm:text-4xl' : 'text-xl'].join(' ')}>
                                {project.title}
                            </h3>
                        </div>

                        <span
                            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            style={{
                                borderColor: `color-mix(in oklab, var(--${tone}) 42%, var(--border-soft))`,
                                background: `color-mix(in oklab, var(--${tone}) 12%, var(--surface-1))`,
                            }}
                        >
                            <ArrowUpRight size={18} className="text-(--text-strong)" />
                        </span>
                    </div>

                    {blurb ? <p className={['mt-3 leading-6 text-(--text)', featured ? 'max-w-xl text-base' : 'line-clamp-3 text-sm'].join(' ')}>{blurb}</p> : null}

                    <div className="mt-4 flex flex-wrap gap-2">
                        {(project.role ?? []).slice(0, featured ? 2 : 1).map((role) => (
                            <Chip key={role} size="xs" color="lilac">
                                {role}
                            </Chip>
                        ))}

                        {stackChips.map((stack) => (
                            <Chip key={stack} size="xs" kind={kindFor(stack)}>
                                {stack}
                            </Chip>
                        ))}
                    </div>

                    <div className="mt-auto pt-5 text-sm font-bold uppercase tracking-[0.14em] text-(--accent)">
                        {listing.cta}
                        <span className="ml-2 inline-block transition group-hover:translate-x-1">→</span>
                    </div>
                </div>
            </Link>
        </article>
    );
}
