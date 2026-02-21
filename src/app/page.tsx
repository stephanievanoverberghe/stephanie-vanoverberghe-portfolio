// src/app/page.tsx
import type { Metadata } from 'next';
import { getAllProjects } from '@/lib/projects';

import HomeHero from '@/components/home/HomeHero';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import SkillsSnapshot from '@/components/home/SkillsSnapshot';
import HomeCta from '@/components/home/HomeCta';

export const metadata: Metadata = {
    title: 'Vanoverberghe Stéphanie - Développeuse Front-End (React/Next)',
    description: 'Portfolio front-end React / Next.js - UI/UX, TypeScript, Tailwind. Études de cas et projets déployés.',
    alternates: { canonical: '/' },
};

export default async function HomePage() {
    const projects = await getAllProjects();

    return (
        <section className="container-page py-10 space-y-12">
            <HomeHero />
            <FeaturedProjects projects={projects} featuredCount={2} />
            <SkillsSnapshot />
            <HomeCta />
        </section>
    );
}
