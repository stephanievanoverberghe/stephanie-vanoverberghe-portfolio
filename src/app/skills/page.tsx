import type { Metadata } from 'next';

import SkillsBento from '@/features/skills/components/SkillsBento';
import SkillsHero from '@/features/skills/components/SkillsHero';
import SkillsProjectsBento from '@/features/skills/components/SkillsProjectsBento';
import SkillsVision from '@/features/skills/components/SkillsVision';
import { skillsPageContent } from '@/content/skills-page';
import { getAllProjects } from '@/lib/projects';
import { buildPageMetadata } from '@/lib/seo';
import PageShell from '@/components/layout/PageShell';

export const metadata: Metadata = buildPageMetadata({
    title: skillsPageContent.metadata.title,
    description: skillsPageContent.metadata.description,
    canonical: '/skills',
});

export const dynamic = 'force-static';

export default async function SkillsPage() {
    const projects = await getAllProjects();

    return (
        <PageShell className="space-y-10 py-10 sm:space-y-12 sm:py-14 lg:py-16">
            <SkillsHero />
            <SkillsVision />
            <SkillsBento />
            <SkillsProjectsBento projects={projects} />
        </PageShell>
    );
}
