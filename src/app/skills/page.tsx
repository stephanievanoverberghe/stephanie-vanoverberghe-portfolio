import type { Metadata } from 'next';
import SkillsHero from '@/components/skills/SkillsHero';
import SkillsBento from '@/components/skills/SkillsBento';
import SkillsProjectsBento from '@/components/skills/SkillsProjectsBento';
import SkillsCTA from '@/components/skills/SkillsCta';

export const metadata: Metadata = {
    title: 'Compétences — Vanoverberghe Stéphanie',
    description:
        'Compétences front-end (React, Next.js, TypeScript, Tailwind), UI/UX, performance & accessibilité. Mise en pratique sur Mystères à la carte, Alchimiste Créations et Ancre-toi.',
};

export const dynamic = 'force-static';

export default function SkillsPage() {
    return (
        <section className="container-page py-12 space-y-12">
            <SkillsHero />
            <SkillsBento />
            <SkillsProjectsBento />
            <SkillsCTA />
        </section>
    );
}
