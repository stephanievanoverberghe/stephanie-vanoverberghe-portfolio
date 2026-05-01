import { ArrowRight, Code2, Eye, Layers3, Sparkles } from 'lucide-react';

import LinkButton from '@/components/ui/LinkButton';

import { aboutContent } from '@/content/about';

const icons = [Eye, Sparkles, Code2];

export default function AboutPage() {
    return (
        <div className="container-page py-10 sm:py-14 lg:py-16">
            <section className="relative overflow-hidden rounded-4xl border border-(--border-soft) bg-(--surface-1) p-6 shadow-(--shadow-card) sm:p-8 lg:p-12">
                <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-(--lilac)/30 blur-3xl" />
                <div aria-hidden className="absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-(--sage)/20 blur-3xl" />

                <div className="relative grid gap-10 lg:grid-cols-[1fr_340px] lg:items-end">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.28em] text-(--gold)">{aboutContent.hero.kicker}</p>

                        <h1 className="mt-5 max-w-3xl text-[clamp(2.7rem,5.6vw,5.6rem)] font-semibold leading-[0.95] tracking-[-0.07em] text-(--text-strong)">
                            {aboutContent.hero.title.line1}
                            <br />
                            {aboutContent.hero.title.line2}
                            <br />
                            <span className="italic text-(--accent)">{aboutContent.hero.title.line3}</span>
                        </h1>

                        <p className="mt-7 max-w-3xl text-base leading-7 text-(--text)">{aboutContent.hero.intro}</p>
                    </div>

                    <aside className="rounded-[1.7rem] border border-(--border-soft) bg-(--paper) p-5">
                        <Layers3 size={26} className="text-(--accent)" />

                        <p className="mt-4 text-xl font-semibold leading-snug tracking-[-0.04em] text-(--text-strong)">
                            {aboutContent.quote.strong}
                            <br />
                            <span className="text-(--accent)">{aboutContent.quote.accent}</span>
                        </p>

                        <p className="mt-4 text-sm leading-6 text-(--text)">{aboutContent.hero.note}</p>
                    </aside>
                </div>
            </section>

            <section className="mt-8 grid gap-4 lg:grid-cols-3">
                {aboutContent.journey.map((item, index) => {
                    const Icon = icons[index];

                    return (
                        <article key={item.title} className="rounded-[1.7rem] border border-(--border-soft) bg-(--surface-1) p-5 shadow-(--shadow-card)">
                            <div
                                className="grid h-11 w-11 place-items-center rounded-2xl border"
                                style={{
                                    borderColor: 'color-mix(in oklab, var(--accent) 28%, var(--border-soft))',
                                    background: 'color-mix(in oklab, var(--accent) 8%, var(--surface-1))',
                                }}
                            >
                                <Icon size={20} className="text-(--accent)" />
                            </div>

                            <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.22em] text-(--gold)">{item.eyebrow}</p>

                            <h2 className="mt-2 text-xl font-semibold tracking-[-0.04em] text-(--text-strong)">{item.title}</h2>

                            <p className="mt-3 text-sm leading-6 text-(--text)">{item.text}</p>
                        </article>
                    );
                })}
            </section>

            <section className="mt-8 grid gap-4 lg:grid-cols-[1fr_1fr]">
                <div className="rounded-[1.7rem] border border-(--border-soft) bg-(--surface-1) p-5 shadow-(--shadow-card)">
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-(--accent)">Ce qui guide mon travail</p>

                    <div className="mt-5 grid gap-3">
                        {aboutContent.principles.map((item) => (
                            <div
                                key={item}
                                className="flex items-center gap-3 rounded-2xl border px-4 py-3"
                                style={{
                                    borderColor: 'color-mix(in oklab, var(--sage) 24%, var(--border-soft))',
                                    background: 'color-mix(in oklab, var(--surface-2) 48%, var(--surface-1))',
                                }}
                            >
                                <span className="h-2 w-2 rounded-full bg-(--accent)" />
                                <span className="text-sm font-medium text-(--text-strong)">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-[1.7rem] border border-(--border-soft) bg-(--surface-1) p-5 shadow-(--shadow-card)">
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-(--accent)">Stack & terrain de jeu</p>

                    <div className="mt-5 flex flex-wrap gap-2">
                        {aboutContent.stack.map((item) => (
                            <span
                                key={item}
                                className="rounded-full border px-3 py-1.5 text-sm font-semibold text-(--text-strong)"
                                style={{
                                    borderColor: 'color-mix(in oklab, var(--gold) 34%, var(--border-soft))',
                                    background: 'color-mix(in oklab, var(--gold) 10%, var(--surface-1))',
                                }}
                            >
                                {item}
                            </span>
                        ))}
                    </div>

                    <div className="mt-8 rounded-3xl border border-(--border-soft) bg-(--paper) p-5">
                        <p className="text-2xl font-semibold leading-tight tracking-[-0.05em] text-(--text-strong)">
                            Design + code,
                            <br />
                            pas l’un contre l’autre.
                        </p>

                        <p className="mt-3 text-sm leading-6 text-(--text)">
                            J’aime les interfaces qui ont une intention visuelle, mais aussi une base technique claire : composants, responsive, accessibilité, performance et
                            maintenabilité.
                        </p>
                    </div>
                </div>
            </section>

            <section className="mt-8 rounded-4xl border border-(--border-soft) bg-(--surface-1) p-6 shadow-(--shadow-card) sm:p-8">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.24em] text-(--gold)">Suite logique</p>

                        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-(--text-strong)">{aboutContent.cta.title}</h2>

                        <p className="mt-3 max-w-2xl text-sm leading-6 text-(--text)">{aboutContent.cta.text}</p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <LinkButton href="/projects" variant="primary">
                            {aboutContent.cta.primary}
                            <ArrowRight size={17} />
                        </LinkButton>

                        <LinkButton href="/contact" variant="secondary">
                            {aboutContent.cta.secondary}
                        </LinkButton>
                    </div>
                </div>
            </section>
        </div>
    );
}
