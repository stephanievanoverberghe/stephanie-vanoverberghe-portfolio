import type { Metadata } from 'next';

import PageShell from '@/components/layout/PageShell';
import HomeHero from '@/features/home/components/HomeHero';
import FeaturedProjects from '@/features/home/components/FeaturedProjects';
import SkillsSnapshot from '@/features/home/components/SkillsSnapshot';
import { getAllProjects } from '@/lib/projects';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
    title: 'Stéphanie Vanoverberghe — Développeuse Front-End React / Next.js',
    description: 'Portfolio frontend React / Next.js : études de cas, interfaces claires, composants maintenables et approche produit.',
    canonical: '/',
});

export default async function HomePage() {
    const projects = await getAllProjects();

    return (
        <PageShell className="py-10 space-y-12">
            <HomeHero />
            <FeaturedProjects projects={projects} featuredCount={2} />
            <SkillsSnapshot />
        </PageShell>
    );
}
