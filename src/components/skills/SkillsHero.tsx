import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { skillsPageContent } from '@/content/skills-page';

export default function SkillsHero() {
    const { hero } = skillsPageContent;

    return (
        <header className="relative overflow-hidden rounded-4xl border border-(--border-soft) bg-(--surface-1) p-6 shadow-(--shadow-card) sm:p-8 lg:p-12">
            <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-(--lilac)/30 blur-3xl" />
            <div aria-hidden className="absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-(--sage)/20 blur-3xl" />

            <div className="relative max-w-4xl">
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-(--gold)">{hero.kicker}</p>

                <h1 className="mt-5 text-[clamp(2.8rem,6vw,6rem)] font-semibold leading-[0.95] tracking-[-0.075em] text-(--text-strong)">
                    {hero.title.first}
                    <br />
                    {hero.title.second}
                    <br />
                    <span className="italic text-(--accent)">{hero.title.third}</span>
                </h1>

                <p className="mt-6 max-w-2xl text-base leading-7 text-(--text)">{hero.intro}</p>

                <div className="mt-7 flex flex-wrap gap-2">
                    {hero.tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full border px-3 py-1.5 text-xs font-semibold text-(--text-strong)"
                            style={{
                                borderColor: 'color-mix(in oklab, var(--sage) 28%, var(--border-soft))',
                                background: 'color-mix(in oklab, var(--surface-2) 52%, var(--surface-1))',
                            }}
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-white transition hover:-translate-y-0.5"
                        style={{
                            background: 'linear-gradient(135deg, var(--accent), color-mix(in oklab, var(--accent) 78%, var(--ink)))',
                        }}
                    >
                        {hero.ctaPrimary}
                        <ArrowRight size={17} />
                    </Link>

                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-(--text-strong) transition hover:-translate-y-0.5"
                        style={{
                            borderColor: 'color-mix(in oklab, var(--gold) 46%, var(--border-soft))',
                            background: 'color-mix(in oklab, var(--gold) 12%, var(--surface-1))',
                        }}
                    >
                        {hero.ctaSecondary}
                    </Link>
                </div>
            </div>
        </header>
    );
}
