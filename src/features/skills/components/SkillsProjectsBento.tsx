import type { Project } from '@/lib/projects';
import { coverAlt, coverSrc, pickProjectTags, sortProjectsByRecent, toneForIndex } from '@/lib/project-display';

import SkillsProjectTile from '@/features/skills/components/SkillsProjectTile';
import { skillsPageContent } from '@/content/skills-page';

type Props = {
    projects: Project[];
};

export default function SkillsProjectsBento({ projects }: Props) {
    const { projects: content } = skillsPageContent;
    const ordered = sortProjectsByRecent(projects).slice(0, 3);

    if (!ordered.length) {
        return (
            <section className="rounded-[1.7rem] border border-(--border-soft) bg-(--surface-1) p-6 shadow-(--shadow-card)">
                <p className="text-sm leading-6 text-(--text)">{content.empty}</p>
            </section>
        );
    }

    const labels = {
        caseStudy: content.caseStudyLabel,
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
                            title={project.title}
                            subtitle={project.subtitle ?? content.caseStudyLabel}
                            hrefCase={`/projects/${project.slug}`}
                            cover={coverSrc(project, '/images/projects/placeholder.png') ?? '/images/projects/placeholder.png'}
                            coverAlt={coverAlt(project)}
                            tags={pickProjectTags(project)}
                            tone={toneForIndex(index === 1 ? 2 : index)}
                            labels={labels}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
