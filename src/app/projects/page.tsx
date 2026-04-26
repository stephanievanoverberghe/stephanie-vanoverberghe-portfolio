// src/app/projets/page.tsx
import type { Metadata } from 'next';
import { getAllProjects } from '@/lib/projects';
import { buildPageMetadata } from '@/lib/seo';
import ProjectsHero from '@/components/projects/ProjectsHero';
import ProjectsGrid from '@/components/projects/ProjectsGrid';

export const metadata: Metadata = buildPageMetadata({
    title: 'Projets — Vanoverberghe Stéphanie',
    description: 'Études de cas front-end : Ancre-toi, Alchimiste Créations, Mystères à la carte...',
    canonical: '/projects',
});

export const dynamic = 'force-static';

export default async function ProjectsPage() {
    const projects = await getAllProjects();

    return (
        <section className="container-page py-12 space-y-10">
            <ProjectsHero />
            <ProjectsGrid projects={projects} />
        </section>
    );
}
