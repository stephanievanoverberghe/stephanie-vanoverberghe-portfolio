import { ArrowRight } from 'lucide-react';

import Button from '@/components/ui/Button';
import HeroTitle from '@/components/ui/HeroTitle';
import PageHero from '@/components/ui/PageHero';
import Pill from '@/components/ui/Pill';
import { skillsPageContent } from '@/content/skills-page';

export default function SkillsHero() {
    const { hero } = skillsPageContent;

    return (
        <PageHero as="header">
            <div className="max-w-4xl">
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-(--gold)">{hero.kicker}</p>

                <HeroTitle>
                    {hero.title.first}
                    <br />
                    {hero.title.second}
                    <br />
                    <span className="italic text-(--accent)">{hero.title.third}</span>
                </HeroTitle>

                <p className="mt-6 max-w-2xl text-base leading-7 text-(--text)">{hero.intro}</p>

                <div className="mt-7 flex flex-wrap gap-2">
                    {hero.tags.map((tag) => (
                        <Pill key={tag}>{tag}</Pill>
                    ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                    <Button href="/projects">
                        {hero.ctaPrimary}
                        <ArrowRight size={17} />
                    </Button>

                    <Button href="/contact" variant="secondary">
                        {hero.ctaSecondary}
                    </Button>
                </div>
            </div>
        </PageHero>
    );
}
