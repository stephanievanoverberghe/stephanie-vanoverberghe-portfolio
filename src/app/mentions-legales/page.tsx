import type { Metadata } from 'next';

import PageShell from '@/components/layout/PageShell';
import HeroTitle from '@/components/ui/HeroTitle';
import { legalPagesContent } from '@/content/legal';
import { buildPageMetadata } from '@/lib/seo';

const content = legalPagesContent.mentions;

export const metadata: Metadata = buildPageMetadata({
    title: content.metadata.title,
    description: content.metadata.description,
    canonical: '/mentions-legales',
});

export default function MentionsLegalesPage() {
    return (
        <PageShell className="py-10 sm:py-14 lg:py-16">
            <section className="page-hero">
                <div aria-hidden className="page-hero-glow page-hero-glow-top" />
                <div aria-hidden className="page-hero-glow page-hero-glow-bottom" />

                <div className="relative">
                    <p className="text-xs font-bold uppercase tracking-[0.28em] text-(--gold)">{content.hero.kicker}</p>
                    <HeroTitle>
                        {content.hero.title[0]}
                        <br />
                        <span className="italic text-(--accent)">{content.hero.title[1]}</span>
                    </HeroTitle>
                </div>
            </section>

            <section className="mt-8 grid gap-4 lg:grid-cols-2">
                {content.sections.map((section) => (
                    <article key={section.title} className="detail-section rounded-[1.7rem] p-5 sm:p-6">
                        <p className="text-xs font-bold uppercase tracking-[0.24em] text-(--accent)">{section.title}</p>

                        <div className="mt-4 grid gap-3">
                            {section.items.map((item) => (
                                <div key={item} className="surface-sage-soft rounded-2xl border px-4 py-3 text-sm leading-6 text-(--text)">
                                    {item}
                                </div>
                            ))}
                        </div>
                    </article>
                ))}
            </section>
        </PageShell>
    );
}
