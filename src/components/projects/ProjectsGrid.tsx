// src/components/projects/ProjectsGrid.tsx
import type { Project } from '@/lib/projects';
import ProjectCard from './ProjectCard';

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
                <ProjectCard key={p.slug} project={p} />
            ))}
        </div>
    );
}
