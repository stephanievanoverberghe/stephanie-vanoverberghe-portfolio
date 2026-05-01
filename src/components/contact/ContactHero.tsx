import Link from 'next/link';
import { ArrowRight, Download, Sparkles } from 'lucide-react';

import PageHero from '@/components/ui/PageHero';
import { contactContent } from '@/content/contact';

export default function ContactHero() {
    const { hero } = contactContent;

    return (
        <PageHero as="header">
            <div className="max-w-4xl">
                <div className="flex flex-wrap items-center gap-3">
                    <p className="text-xs font-bold uppercase tracking-[0.28em] text-(--gold)">{hero.kicker}</p>

                    <span className="chip-soft inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold text-(--text-strong)">
                        <Sparkles size={14} />
                        {hero.responseDelay}
                    </span>
                </div>

                <h1 className="mt-5 max-w-3xl text-[clamp(2.7rem,5.6vw,5.6rem)] font-semibold leading-[0.95] tracking-[-0.07em] text-(--text-strong)">
                    {hero.title.first}
                    <br />
                    <span className="italic text-(--accent)">{hero.title.accent}</span>
                </h1>

                <p className="mt-6 max-w-2xl text-base leading-7 text-(--text)">{hero.intro}</p>

                <div className="mt-8 flex flex-wrap gap-3">
                    <Link href="/projects" className="btn-premium btn-premium-primary inline-flex items-center gap-2 transition hover:-translate-y-0.5">
                        {hero.ctaPrimary}
                        <ArrowRight size={17} />
                    </Link>

                    <a
                        href="/cv-vanoverberghe-stephanie.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-premium btn-premium-soft inline-flex items-center gap-2 transition hover:-translate-y-0.5"
                    >
                        <Download size={17} />
                        {hero.ctaSecondary}
                    </a>
                </div>
            </div>
        </PageHero>
    );
}
