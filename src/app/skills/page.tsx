// src/app/skills/page.tsx
import type { Metadata } from 'next';
import { getAllProjects } from '@/lib/projects';

import SkillsHero from '@/components/skills/SkillsHero';
import SkillsBento from '@/components/skills/SkillsBento';
import SkillsProjectsBento from '@/components/skills/SkillsProjectsBento';

export const metadata: Metadata = {
    title: 'Compétences — Vanoverberghe Stéphanie',
    description: 'Compétences front-end (React, Next.js, TypeScript, Tailwind), UI/UX, performance & accessibilité. Mise en pratique sur des projets concrets.',
};

export const dynamic = 'force-static';

export default async function SkillsPage() {
    const projects = await getAllProjects();

    return (
        <section className="container-page py-12 space-y-12">
            <SkillsHero />
            <SkillsBento />
            <SkillsProjectsBento projects={projects} />
        </section>
    );
}
