import { projectsPageContent } from '@/content/projects-page';
import type { Project } from '@/lib/projects';

import ProjectCard from './ProjectCard';

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
    const { listing } = projectsPageContent;

    if (!projects.length) {
        return (
            <section className="rounded-[1.6rem] border border-(--border-soft) bg-(--surface-1) p-6 shadow-(--shadow-card)">
                <p className="text-sm leading-6 text-(--text)">{listing.empty}</p>
            </section>
        );
    }

    const [featured, ...others] = projects;

    return (
        <section className="space-y-5">
            <div className="flex items-end justify-between gap-4">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-(--accent)">{listing.kicker}</p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-(--text-strong)">{listing.title}</h2>
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-(--text-muted)">{listing.intro}</p>
                </div>
            </div>

            <ProjectCard project={featured} index={0} featured />

            {others.length ? (
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {others.map((project, index) => (
                        <ProjectCard key={project.slug} project={project} index={index + 1} />
                    ))}
                </div>
            ) : null}
        </section>
    );
}
