'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';

import Button from '@/components/ui/Button';
import HeroTitle from '@/components/ui/HeroTitle';
import PageHero from '@/components/ui/PageHero';
import { homeHeroContent } from '@/content/home';
import { siteProfile } from '@/content/site';

const fadeUp = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0 },
};

export default function HomeHero() {
    return (
        <PageHero>
            <motion.div
                className="grid gap-10 lg:grid-cols-[1fr_320px] lg:items-center"
                variants={{
                    hidden: {},
                    show: { transition: { staggerChildren: 0.07 } },
                }}
                initial="hidden"
                animate="show"
            >
                <div>
                    <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.28em] text-(--gold)">
                        {homeHeroContent.title} · {homeHeroContent.availability}
                    </motion.p>

                    <motion.div variants={fadeUp}>
                        <HeroTitle className="mt-0">
                        {homeHeroContent.heroTitle.first}
                        <br />
                        {homeHeroContent.heroTitle.second}
                        <br />
                        <span className="italic text-(--accent)">{homeHeroContent.heroTitle.third}</span>
                        </HeroTitle>
                    </motion.div>

                    <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-base leading-7 text-(--text)">
                        {homeHeroContent.intro}
                    </motion.p>

                    <motion.div variants={fadeUp} className="mt-7 flex flex-wrap gap-3">
                        <Button href="/projects">
                            {homeHeroContent.heroCtaPrimary}
                            <ArrowRight size={17} />
                        </Button>

                        <Button href="/cv-vanoverberghe-stephanie.pdf" external variant="secondary">
                            <Download size={17} />
                            {homeHeroContent.heroCtaSecondary}
                        </Button>
                    </motion.div>
                </div>

                <motion.aside variants={fadeUp} className="hidden lg:block">
                    <div className="rounded-[1.8rem] border border-(--border-soft) bg-(--paper) p-5">
                        <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full border-2 border-(--gold)">
                            <Image src={siteProfile.avatar.src} alt={siteProfile.avatar.alt} fill sizes="96px" className="object-cover" priority />
                        </div>

                        <p className="mt-5 text-center text-xs font-bold uppercase tracking-[0.18em] text-(--text-strong)">{homeHeroContent.profileName}</p>

                        <p className="mt-2 text-center text-xs font-bold uppercase tracking-[0.16em] text-(--accent)">{homeHeroContent.profileRole}</p>

                        <div className="mx-auto mt-5 h-px w-20 bg-(--gold)" />

                        <p className="mt-5 text-center text-sm italic leading-6 text-(--text)">“{homeHeroContent.quote}”</p>
                    </div>
                </motion.aside>
            </motion.div>
        </PageHero>
    );
}
