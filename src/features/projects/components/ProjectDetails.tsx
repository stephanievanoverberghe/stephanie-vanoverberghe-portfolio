import type { ReactNode } from 'react';

import Chip from '@/components/ui/Chip';
import type { Project } from '@/lib/projects';

type Tone = 'accent' | 'sage' | 'lilac' | 'gold';
type DetailGroup = { title: string; items?: string[]; tone: Tone };

function DetailCard({ title, items, tone }: { title: string; items?: string[]; tone: Tone }) {
    if (!items?.length) return null;

    return (
        <article className="detail-card relative overflow-hidden rounded-[1.6rem] p-5">
            <span
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-35"
                style={{
                    background: `radial-gradient(circle, color-mix(in oklab, var(--${tone}) 32%, transparent), transparent 65%)`,
                }}
            />

            <div className="relative flex items-center justify-between gap-4">
                <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-(--text-strong)">{title}</h3>

                <Chip size="xs" color={tone}>
                    {items.length}
                </Chip>
            </div>

            <ul className="relative mt-4 space-y-3 text-sm leading-6 text-(--text)">
                {items.map((item) => (
                    <li key={item} className="flex gap-3">
                        <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-(--accent)" />
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        </article>
    );
}

function FeaturedSection({ kicker, title, children, tone = 'accent' }: { kicker: string; title: string; children: ReactNode; tone?: Tone }) {
    return (
        <section className="detail-section relative overflow-hidden rounded-4xl p-6 sm:p-8">
            <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-30 blur-3xl" style={{ background: `var(--${tone})` }} />

            <div className="relative">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-(--accent)">{kicker}</p>

                <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-(--text-strong)">{title}</h2>

                <div className="mt-4">{children}</div>
            </div>
        </section>
    );
}

export function hasProjectDetails(project: Project) {
    return Boolean(
        project.vision ||
            project.objectives?.length ||
            project.challenges?.length ||
            project.solutions?.length ||
            project.highlights?.length ||
            project.metrics?.length ||
            project.notableDecisions?.length ||
            project.productPrinciples?.length ||
            project.editorialFoundations?.length ||
            project.uxHighlights?.length ||
            project.uiHighlights?.length ||
            project.nextSteps?.length ||
            project.testing?.strategy ||
            project.testing?.coverage?.length ||
            project.architecture?.summary ||
            project.architecture?.keyPoints?.length ||
            project.architecture?.sections?.length,
    );
}

export default function ProjectDetails({ project }: { project: Project }) {
    if (!hasProjectDetails(project)) return null;

    const coreDetails: DetailGroup[] = [
        { title: 'Objectifs', items: project.objectives, tone: 'sage' },
        { title: 'Defis', items: project.challenges, tone: 'gold' },
        { title: 'Solutions', items: project.solutions, tone: 'lilac' },
    ];

    const extendedDetails: DetailGroup[] = [
        { title: 'Resultats', items: project.metrics, tone: 'accent' },
        { title: 'Decisions', items: project.notableDecisions, tone: 'gold' },
        { title: 'Principes', items: project.productPrinciples, tone: 'sage' },
        { title: 'Editorial', items: project.editorialFoundations, tone: 'lilac' },
        { title: 'UX', items: project.uxHighlights, tone: 'accent' },
        { title: 'UI', items: project.uiHighlights, tone: 'lilac' },
        { title: 'Suite', items: project.nextSteps, tone: 'sage' },
    ];

    return (
        <section className="space-y-8">
            {project.vision ? (
                <FeaturedSection kicker="Vision" title="Intention produit">
                    <p className="max-w-3xl text-base leading-7 text-(--text)">{project.vision}</p>
                </FeaturedSection>
            ) : null}

            <div className="grid gap-5 lg:grid-cols-3">
                {coreDetails.map((detail) => (
                    <DetailCard key={detail.title} title={detail.title} items={detail.items} tone={detail.tone} />
                ))}
            </div>

            {project.highlights?.length ? (
                <FeaturedSection kicker="Impact" title="Points forts" tone="sage">
                    <div className="grid gap-3 sm:grid-cols-2">
                        {project.highlights.map((item) => (
                            <div key={item} className="detail-pill rounded-2xl px-4 py-3 text-sm leading-6 text-(--text)">
                                {item}
                            </div>
                        ))}
                    </div>
                </FeaturedSection>
            ) : null}

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {extendedDetails.map((detail) => (
                    <DetailCard key={detail.title} title={detail.title} items={detail.items} tone={detail.tone} />
                ))}
            </div>

            {project.testing?.strategy || project.testing?.coverage?.length ? (
                <FeaturedSection kicker="Qualite" title="Testing & fiabilite" tone="accent">
                    {project.testing.strategy ? <p className="max-w-3xl text-sm leading-6 text-(--text)">{project.testing.strategy}</p> : null}

                    {project.testing.coverage?.length ? (
                        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                            {project.testing.coverage.map((item) => (
                                <li key={item} className="detail-pill rounded-2xl px-4 py-3 text-sm leading-6 text-(--text)">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    ) : null}
                </FeaturedSection>
            ) : null}

            {project.architecture?.summary || project.architecture?.keyPoints?.length || project.architecture?.sections?.length ? (
                <FeaturedSection kicker="Technique" title="Architecture" tone="gold">
                    {project.architecture.summary ? <p className="max-w-3xl text-sm leading-6 text-(--text)">{project.architecture.summary}</p> : null}

                    <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        <DetailCard title="Points cles" items={project.architecture.keyPoints} tone="gold" />

                        {project.architecture.sections?.map((section) => (
                            <DetailCard key={section.title} title={section.title} items={section.items} tone="sage" />
                        ))}
                    </div>
                </FeaturedSection>
            ) : null}
        </section>
    );
}
