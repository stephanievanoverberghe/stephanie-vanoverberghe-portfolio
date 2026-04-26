// src/components/skills/SkillsProjectsBento.tsx

import type { Project } from '@/lib/projects';

import SkillsProjectTile from '@/components/skills/SkillsProjectTile';
import { skillsPageContent } from '@/content/skills-page';

type Props = {
    projects: Project[];
};

function coverSrc(project: Project) {
    return project.hero?.image ?? project.logo?.image ?? '/images/projects/placeholder.png';
}

function coverAlt(project: Project) {
    return project.hero?.alt ?? project.logo?.alt ?? project.title;
}

function pickTags(project: Project) {
    return [...(project.stack ?? []), ...(project.role ?? [])].filter(Boolean).slice(0, 6);
}

function pickHighlights(project: Project) {
    const highlights = (project.highlights ?? []).filter(Boolean);
    return highlights.length ? highlights.slice(0, 3) : ['Interface', 'Structure', 'Expérience utilisateur'];
}

function sortMostRecentFirst(projects: Project[]) {
    return [...projects].sort((a, b) => {
        const ay = typeof a.year === 'number' ? a.year : -1;
        const by = typeof b.year === 'number' ? b.year : -1;
        return by - ay;
    });
}

export default function SkillsProjectsBento({ projects }: Props) {
    const { projects: content } = skillsPageContent;
    const ordered = sortMostRecentFirst(projects).slice(0, 3);

    if (!ordered.length) {
        return (
            <section className="rounded-[1.7rem] border border-(--border-soft) bg-(--surface-1) p-6 shadow-(--shadow-card)">
                <p className="text-sm leading-6 text-(--text)">{content.empty}</p>
            </section>
        );
    }

    const labels = {
        caseStudy: content.caseStudyLabel,
        demo: content.demoLabel,
        read: content.readLabel,
    };

    return (
        <section className="relative overflow-hidden rounded-4xl border border-(--border-soft) bg-(--surface-1) p-5 shadow-(--shadow-card) sm:p-6 lg:p-8">
            <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-(--lilac)/25 blur-3xl" />
            <div aria-hidden className="absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-(--sage)/20 blur-3xl" />

            <div className="relative space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div className="max-w-3xl">
                        <p className="text-xs font-bold uppercase tracking-[0.24em] text-(--accent)">{content.kicker}</p>

                        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-(--text-strong) sm:text-4xl">{content.title}</h2>

                        <p className="mt-3 text-sm leading-6 text-(--text)">{content.intro}</p>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    {ordered.map((project, index) => (
                        <SkillsProjectTile
                            key={project.slug}
                            size="sm"
                            title={project.title}
                            subtitle={project.subtitle ?? content.caseStudyLabel}
                            hrefCase={`/projects/${project.slug}`}
                            demoUrl={project.links?.demo}
                            cover={coverSrc(project)}
                            coverAlt={coverAlt(project)}
                            tags={pickTags(project)}
                            highlights={pickHighlights(project)}
                            tone={index === 0 ? 'accent' : index === 1 ? 'lilac' : 'sage'}
                            labels={labels}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
