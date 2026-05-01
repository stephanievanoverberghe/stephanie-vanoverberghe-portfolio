import PageHero from '@/components/ui/PageHero';
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

                <h1 className="mt-5 max-w-3xl text-[clamp(2.7rem,5.6vw,5.6rem)] font-semibold leading-[0.95] tracking-[-0.07em] text-(--text-strong)">
                    {hero.title.first}
                    <br />
                    avec <span className="italic text-(--accent)">{hero.title.accent}</span>
                </h1>

                <p className="mt-6 max-w-2xl text-base leading-7 text-(--text)">{hero.intro}</p>

                <div className="mt-7 flex flex-wrap gap-2">
                    {hero.tags.map((item) => (
                        <span key={item} className="chip-soft rounded-full border px-3 py-1.5 text-xs font-semibold text-(--text-strong)">
                            {item}
                        </span>
                    ))}

                    <span
                        className="rounded-full border px-3 py-1.5 text-xs font-semibold text-(--accent)"
                        style={{
                            borderColor: 'color-mix(in oklab, var(--accent) 34%, var(--border-soft))',
                            background: 'color-mix(in oklab, var(--accent) 8%, var(--surface-1))',
                        }}
                    >
                        {count} projet{count > 1 ? 's' : ''}
                    </span>
                </div>
            </div>
        </PageHero>
    );
}
