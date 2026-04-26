// src/app/page.tsx
import type { Metadata } from 'next';
import { getAllProjects } from '@/lib/projects';
import { buildPageMetadata } from '@/lib/seo';

import HomeHero from '@/components/home/HomeHero';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import SkillsSnapshot from '@/components/home/SkillsSnapshot';

export const metadata: Metadata = buildPageMetadata({
    title: 'Vanoverberghe Stéphanie - développeuse front-end React / Next.js',
    description: 'Portfolio front-end React / Next.js - UI/UX, TypeScript, Tailwind. Études de cas et projets déployés.',
    canonical: '/',
});

export default async function HomePage() {
    const projects = await getAllProjects();

    return (
        <div className="container-page py-10 space-y-12">
            <HomeHero />
            <FeaturedProjects projects={projects} featuredCount={2} />
            <SkillsSnapshot />
        </div>
    );
}
