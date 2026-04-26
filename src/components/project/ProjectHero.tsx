import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import { projectsPageContent } from '@/content/projects-page';
import type { Project } from '@/lib/projects';
import { Badge } from '../ui';
import { Card } from '../ui';
import { Heading } from '../ui';
import { Text } from '../ui';
import { Hero } from '../ui';
import { Stack } from '../ui';

import ProjectActions from './ProjectActions';
import ProjectJumpLinks from './ProjectJumpLinks';
import { coverAlt, coverSrc, excerpt } from './project.utils';

type Props = {
    project: Project;
    hasDetails: boolean;
};

export default function ProjectHero({ project, hasDetails }: Props) {
    const src = coverSrc(project);
    const alt = coverAlt(project);
    const { detail } = projectsPageContent;

    return (
        <header className="space-y-5">
            <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-semibold text-(--text-strong) transition hover:text-(--accent)">
                <ArrowLeft size={16} />
                {detail.backToProjects}
            </Link>

            <Hero
                kicker={detail.caseStudyLabel}
                aside={
                    <Stack gap="sm">
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

                        <Card className="rounded-[1.7rem] border-(--border-soft) bg-[color-mix(in_oklab,var(--surface-2)_48%,var(--surface-1))] p-5 shadow-none">
                            <Text variant="small" className="font-bold uppercase tracking-[0.22em] text-(--accent)">
                                {detail.shortSummaryLabel}
                            </Text>

                            <dl className="mt-4 space-y-4 text-sm">
                                {project.context ? (
                                    <div>
                                        <dt className="font-semibold text-(--text-strong)">{detail.contextLabel}</dt>
                                        <dd className="mt-1 leading-6 text-(--text)">{excerpt(project.context, 135)}</dd>
                                    </div>
                                ) : null}

                                {project.objectives?.[0] ? (
                                    <div>
                                        <dt className="font-semibold text-(--text-strong)">{detail.objectiveLabel}</dt>
                                        <dd className="mt-1 leading-6 text-(--text)">{excerpt(project.objectives[0], 135)}</dd>
                                    </div>
                                ) : null}

                                <div>
                                    <dt className="font-semibold text-(--text-strong)">{detail.focusLabel}</dt>
                                    <dd className="mt-1 leading-6 text-(--text)">
                                        {project.highlights?.[0] ? excerpt(project.highlights[0], 135) : (project.stack ?? []).slice(0, 4).join(' · ')}
                                    </dd>
                                </div>
                            </dl>
                        </Card>
                    </Stack>
                }
            >
                <div className="flex flex-wrap items-center gap-3">
                    {project.year ? <Badge tone="gold">{project.year}</Badge> : null}

                    {(project.role ?? []).map((role) => (
                        <Badge key={role} tone="sage">
                            {role}
                        </Badge>
                    ))}

                    {(project.stack ?? []).slice(0, 7).map((stack) => (
                        <Badge key={stack} tone="lilac">
                            {stack}
                        </Badge>
                    ))}
                </div>

                <Heading as="h1" variant="display" className="mt-5 max-w-4xl">
                    {project.title}
                </Heading>

                {project.subtitle ? (
                    <Text variant="body" className="mt-5 max-w-2xl text-(--text)">
                        {project.subtitle}
                    </Text>
                ) : null}

                <div className="mt-7">
                    <ProjectActions project={project} variant="hero" />
                </div>

                <ProjectJumpLinks hasDetails={hasDetails} hasGallery={Boolean(project.gallery?.length)} labels={detail.jumpLinks} />
            </Hero>
        </header>
    );
}
