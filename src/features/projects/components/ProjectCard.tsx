import Link from 'next/link';

import Chip from '@/components/ui/Chip';
import { projectsPageContent } from '@/content/projects-page';
import type { Project } from '@/lib/projects';
import { cardBlurb, coverAlt, coverSrc, getProjectStatusLabel, kindFor, pickStackChips, toneForIndex } from '@/lib/project-display';

import ProjectLinkBadge from './ProjectLinkBadge';
import ProjectMedia from './ProjectMedia';

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
    const tone = toneForIndex(index);
    const { listing } = projectsPageContent;
    const statusLabel = getProjectStatusLabel(project);

    return (
        <article
            className={[
                'project-card-surface group relative overflow-hidden rounded-[1.8rem] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(18,19,20,0.09)]',
                featured ? 'lg:rounded-4xl' : '',
            ].join(' ')}
        >
            <Link href={`/projects/${project.slug}`} className={featured ? 'grid p-4 lg:min-h-105 lg:grid-cols-[1.05fr_0.95fr] lg:p-5' : 'block p-4'}>
                <ProjectMedia
                    src={src}
                    alt={alt}
                    tone={tone}
                    sizes={featured ? '(max-width: 1024px) 100vw, 50vw' : '(max-width: 768px) 100vw, 33vw'}
                    priority={featured}
                    frameClassName={['project-card-visual rounded-[1.45rem]', featured ? 'lg:h-full' : ''].join(' ')}
                    mediaClassName={featured ? 'lg:h-full lg:aspect-auto' : undefined}
                >
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
                </ProjectMedia>

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

                        <ProjectLinkBadge tone={tone} />
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
