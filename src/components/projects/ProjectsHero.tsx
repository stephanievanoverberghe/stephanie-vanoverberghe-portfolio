import { projectsPageContent } from '@/content/projects-page';

type ProjectsHeroProps = {
    count: number;
};

export default function ProjectsHero({ count }: ProjectsHeroProps) {
    const { hero } = projectsPageContent;

    return (
        <section className="relative overflow-hidden rounded-4xl border border-(--border-soft) bg-(--surface-1) p-6 shadow-(--shadow-card) sm:p-8 lg:p-12">
            <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-(--lilac)/30 blur-3xl" />
            <div aria-hidden className="absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-(--sage)/20 blur-3xl" />

            <div className="relative max-w-4xl">
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-(--gold)">{hero.kicker}</p>

                <h1 className="mt-5 text-[clamp(2.8rem,6vw,6rem)] font-semibold leading-[0.95] tracking-[-0.075em] text-(--text-strong)">
                    {hero.title.first}
                    <br />
                    avec <span className="italic text-(--accent)">{hero.title.accent}</span>
                </h1>

                <p className="mt-6 max-w-2xl text-base leading-7 text-(--text)">{hero.intro}</p>

                <div className="mt-7 flex flex-wrap gap-2">
                    {hero.tags.map((item) => (
                        <span
                            key={item}
                            className="rounded-full border px-3 py-1.5 text-xs font-semibold text-(--text-strong)"
                            style={{
                                borderColor: 'color-mix(in oklab, var(--sage) 28%, var(--border-soft))',
                                background: 'color-mix(in oklab, var(--surface-2) 52%, var(--surface-1))',
                            }}
                        >
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
        </section>
    );
}
