import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { CSSProperties } from 'react';

import LinkButton from '@/components/ui/LinkButton';
import SectionHeader from '@/components/ui/SectionHeader';
import Chip from '@/components/ui/Chip';
import { featuredProjectsContent } from '@/content/home';
import ProjectLinkBadge from '@/features/projects/components/ProjectLinkBadge';
import ProjectMedia from '@/features/projects/components/ProjectMedia';
import type { Project } from '@/lib/projects';
import { cardBlurb, chipPropsByKind, coverAlt, coverSrc, getProjectStatusLabel, kindFor, pickStack, sortProjectsByRecent, toneForIndex } from '@/lib/project-display';

function toneTextStyle(tone: string): CSSProperties {
    return { color: `var(--${tone})` };
}

function FeaturedProjectCard({ project, index }: { project: Project; index: number }) {
    const tone = toneForIndex(index);
    const pickedStack = pickStack(project.stack, 3);
    const statusLabel = getProjectStatusLabel(project);
    const description = cardBlurb(project);

    return (
        <Link
            href={`/projects/${project.slug}`}
            className="project-card-surface group grid overflow-hidden rounded-4xl transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(18,19,20,0.09)] lg:grid-cols-[0.95fr_1.05fr]"
        >
            <ProjectMedia
                src={coverSrc(project)}
                alt={coverAlt(project)}
                tone={tone}
                sizes="(max-width: 1024px) 100vw, 44vw"
                objectPosition="50% 8%"
                frameClassName="project-card-visual rounded-[1.6rem]"
                overlayClassName="featured-card-overlay"
            />

            <div className="flex flex-col p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-(--accent)">
                            {featuredProjectsContent.indexLabel} 0{index + 1}
                        </p>

                        <h3 className="mt-3 text-2xl font-semibold leading-tight tracking-[-0.04em] text-(--text-strong)">{project.title}</h3>

                        {project.subtitle ? <p className="mt-2 text-sm leading-6 text-(--text-muted)">{project.subtitle}</p> : null}
                    </div>

                    <ProjectLinkBadge tone={tone} />
                </div>

                {description ? <p className="mt-5 text-sm leading-6 text-(--text)">{description}</p> : null}

                <div className="mt-5 flex flex-wrap gap-2">
                    {statusLabel ? (
                        <Chip size="xs" color="gold">
                            {statusLabel}
                        </Chip>
                    ) : null}

                    {project.year ? (
                        <Chip size="xs" color="gold">
                            {project.year}
                        </Chip>
                    ) : null}

                    {(project.role ?? []).slice(0, 1).map((role) => (
                        <Chip key={role} size="xs" color="lilac">
                            {role}
                        </Chip>
                    ))}

                    {pickedStack.map((stack) => (
                        <Chip key={stack} size="xs" {...chipPropsByKind(kindFor(stack))}>
                            {stack}
                        </Chip>
                    ))}
                </div>

                <div className="mt-auto pt-6 text-sm font-bold uppercase tracking-[0.14em] text-(--text-strong)">
                    {featuredProjectsContent.cardCta}
                    <span className="ml-2 inline-block transition group-hover:translate-x-1">→</span>
                </div>
            </div>
        </Link>
    );
}

function SmallProjectCard({ project, index }: { project: Project; index: number }) {
    const tone = toneForIndex(index);
    const pickedStack = pickStack(project.stack, 2);
    const statusLabel = getProjectStatusLabel(project);

    return (
        <Link
            href={`/projects/${project.slug}`}
            className="project-card-surface group rounded-[1.6rem] p-4 transition hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(18,19,20,0.08)]"
        >
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em]" style={toneTextStyle(tone)}>
                        {featuredProjectsContent.indexLabel} {String(index + 3).padStart(2, '0')}
                    </p>

                    <h3 className="mt-2 text-base font-semibold leading-snug text-(--text-strong)">{project.title}</h3>

                    {project.subtitle ? <p className="mt-2 line-clamp-2 text-sm leading-5 text-(--text-muted)">{project.subtitle}</p> : null}
                </div>

                <ArrowUpRight size={18} className="shrink-0 text-(--text-muted) transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-(--accent)" />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
                {statusLabel ? (
                    <Chip size="xs" color="gold">
                        {statusLabel}
                    </Chip>
                ) : null}

                {pickedStack.map((stack) => (
                    <Chip key={stack} size="xs" {...chipPropsByKind(kindFor(stack))}>
                        {stack}
                    </Chip>
                ))}
            </div>
        </Link>
    );
}

export default function FeaturedProjects({ projects, featuredCount = 2 }: { projects: Project[]; featuredCount?: number }) {
    const sorted = sortProjectsByRecent(projects);
    const featured = sorted.slice(0, featuredCount);
    const rest = sorted.slice(featuredCount);
    const [featuredTitleStart, featuredTitleEnd = ''] = featuredProjectsContent.title.split(' rencontre ');

    return (
        <section className="space-y-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
                <SectionHeader
                    kicker={featuredProjectsContent.kicker}
                    title={
                        <>
                            {featuredTitleStart}
                            <br className="hidden sm:block" /> rencontre {featuredTitleEnd}
                        </>
                    }
                    intro={featuredProjectsContent.intro}
                />

                <LinkButton href="/projects" variant="secondary" className="px-4 py-2.5 text-xs">
                    {featuredProjectsContent.allProjectsLabel}
                    <ArrowUpRight size={15} />
                </LinkButton>
            </div>

            <div className="grid gap-6">
                {featured.map((project, index) => (
                    <FeaturedProjectCard key={project.slug} project={project} index={index} />
                ))}
            </div>

            {rest.length ? (
                <div className="space-y-4">
                    <div className="flex items-center justify-between gap-4">
                        <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-(--text-muted)">{featuredProjectsContent.otherProjectsLabel}</h3>

                        <span className="text-xs text-(--text-muted)">
                            {rest.length} projet{rest.length > 1 ? 's' : ''}
                        </span>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {rest.map((project, index) => (
                            <SmallProjectCard key={project.slug} project={project} index={index} />
                        ))}
                    </div>
                </div>
            ) : null}
        </section>
    );
}
