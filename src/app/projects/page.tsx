import type { Metadata } from 'next';

import ProjectsGrid from '@/features/projects/components/ProjectsGrid';
import ProjectsHero from '@/features/projects/components/ProjectsHero';
import { projectsPageContent } from '@/content/projects-page';
import { getAllProjects } from '@/lib/projects';
import { buildPageMetadata } from '@/lib/seo';
import PageShell from '@/components/layout/PageShell';

export const metadata: Metadata = buildPageMetadata({
    title: projectsPageContent.metadata.title,
    description: projectsPageContent.metadata.description,
    canonical: '/projects',
});

export const dynamic = 'force-static';

export default async function ProjectsPage() {
    const projects = await getAllProjects();

    return (
        <PageShell className="space-y-10 py-10 sm:py-14 lg:py-16">
            <ProjectsHero count={projects.length} />
            <ProjectsGrid projects={projects} />
        </PageShell>
    );
}
