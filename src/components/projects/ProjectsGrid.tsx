import type { Project } from '@/lib/projects';

import ProjectCard from './ProjectCard';

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
    if (!projects.length) {
        return (
            <section className="rounded-[1.6rem] border border-(--border-soft) bg-(--surface-1) p-6 shadow-(--shadow-card)">
                <p className="text-sm leading-6 text-(--text)">Aucun projet n’est encore disponible.</p>
            </section>
        );
    }

    return (
        <section className="space-y-5">
            <div className="flex items-end justify-between gap-4">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-(--accent)">Sélection</p>

                    <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-(--text-strong)">Interfaces, produits et expériences web.</h2>
                </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {projects.map((project, index) => (
                    <ProjectCard key={project.slug} project={project} index={index} />
                ))}
            </div>
        </section>
    );
}
