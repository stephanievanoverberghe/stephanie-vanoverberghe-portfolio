import HeroTitle from '@/components/ui/HeroTitle';
import PageHero from '@/components/ui/PageHero';
import Pill from '@/components/ui/Pill';
import { projectsPageContent } from '@/content/projects-page';

type ProjectsHeroProps = {
    count: number;
};

export default function ProjectsHero({ count }: ProjectsHeroProps) {
    const { hero } = projectsPageContent;

    return (
        <PageHero>
            <div className="max-w-4xl">
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-(--gold)">{hero.kicker}</p>

                <HeroTitle>
                    {hero.title.first}
                    <br />
                    avec <span className="italic text-(--accent)">{hero.title.accent}</span>
                </HeroTitle>

                <p className="mt-6 max-w-2xl text-base leading-7 text-(--text)">{hero.intro}</p>

                <div className="mt-7 flex flex-wrap gap-2">
                    {hero.tags.map((item) => (
                        <Pill key={item}>{item}</Pill>
                    ))}

                    <Pill tone="accent">
                        {count} projet{count > 1 ? 's' : ''}
                    </Pill>
                </div>
            </div>
        </PageHero>
    );
}
