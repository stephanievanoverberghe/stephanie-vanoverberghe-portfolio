import { ArrowRight, Download, Sparkles } from 'lucide-react';

import Button from '@/components/ui/Button';
import HeroTitle from '@/components/ui/HeroTitle';
import PageHero from '@/components/ui/PageHero';
import Pill from '@/components/ui/Pill';
import { contactContent } from '@/content/contact';

export default function ContactHero() {
    const { hero } = contactContent;

    return (
        <PageHero as="header">
            <div className="max-w-4xl">
                <div className="flex flex-wrap items-center gap-3">
                    <p className="text-xs font-bold uppercase tracking-[0.28em] text-(--gold)">{hero.kicker}</p>

                    <Pill>
                        <Sparkles size={14} />
                        {hero.responseDelay}
                    </Pill>
                </div>

                <HeroTitle>
                    {hero.title.first}
                    <br />
                    <span className="italic text-(--accent)">{hero.title.accent}</span>
                </HeroTitle>

                <p className="mt-6 max-w-2xl text-base leading-7 text-(--text)">{hero.intro}</p>

                <div className="mt-8 flex flex-wrap gap-3">
                    <Button href="/projects">
                        {hero.ctaPrimary}
                        <ArrowRight size={17} />
                    </Button>

                    <Button href="/cv-vanoverberghe-stephanie.pdf" external variant="secondary">
                        <Download size={17} />
                        {hero.ctaSecondary}
                    </Button>
                </div>
            </div>
        </PageHero>
    );
}
