import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import PageHero from '@/components/ui/PageHero';
import { skillsPageContent } from '@/content/skills-page';

export default function SkillsHero() {
    const { hero } = skillsPageContent;

    return (
        <PageHero as="header">
            <div className="max-w-4xl">
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-(--gold)">{hero.kicker}</p>

                <h1 className="mt-5 max-w-3xl text-[clamp(2.7rem,5.6vw,5.6rem)] font-semibold leading-[0.95] tracking-[-0.07em] text-(--text-strong)">
                    {hero.title.first}
                    <br />
                    {hero.title.second}
                    <br />
                    <span className="italic text-(--accent)">{hero.title.third}</span>
                </h1>

                <p className="mt-6 max-w-2xl text-base leading-7 text-(--text)">{hero.intro}</p>

                <div className="mt-7 flex flex-wrap gap-2">
                    {hero.tags.map((tag) => (
                        <span key={tag} className="chip-soft rounded-full border px-3 py-1.5 text-xs font-semibold text-(--text-strong)">
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                    <Link href="/projects" className="btn-premium btn-premium-primary inline-flex items-center gap-2 transition hover:-translate-y-0.5">
                        {hero.ctaPrimary}
                        <ArrowRight size={17} />
                    </Link>

                    <Link href="/contact" className="btn-premium btn-premium-soft inline-flex items-center gap-2 transition hover:-translate-y-0.5">
                        {hero.ctaSecondary}
                    </Link>
                </div>
            </div>
        </PageHero>
    );
}
