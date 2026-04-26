import type { Metadata } from 'next';

import ProjectsGrid from '@/components/projects/ProjectsGrid';
import ProjectsHero from '@/components/projects/ProjectsHero';
import { getAllProjects } from '@/lib/projects';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
    title: 'Projets — Stéphanie Vanoverberghe',
    description: 'Études de cas front-end React, Next.js et TypeScript : interfaces, design, structure, UX et qualité du code.',
    canonical: '/projects',
});

export const dynamic = 'force-static';

export default async function ProjectsPage() {
    const projects = await getAllProjects();

    return (
        <main className="container-page py-10 sm:py-14 lg:py-16">
            <div className="space-y-10">
                <ProjectsHero count={projects.length} />
                <ProjectsGrid projects={projects} />
            </div>
        </main>
    );
}
