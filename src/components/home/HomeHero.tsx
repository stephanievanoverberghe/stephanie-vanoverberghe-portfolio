'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';

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

                    <motion.h1 variants={fadeUp} className="mt-5 max-w-3xl text-[clamp(2.7rem,5.6vw,5.6rem)] font-semibold leading-[0.95] tracking-[-0.07em] text-(--text-strong)">
                        {homeHeroContent.heroTitle.first}
                        <br />
                        {homeHeroContent.heroTitle.second}
                        <br />
                        <span className="italic text-(--accent)">{homeHeroContent.heroTitle.third}</span>
                    </motion.h1>

                    <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-base leading-7 text-(--text)">
                        {homeHeroContent.intro}
                    </motion.p>

                    <motion.div variants={fadeUp} className="mt-7 flex flex-wrap gap-3">
                        <Link href="/projects" className="btn-premium btn-premium-primary inline-flex items-center gap-2 transition hover:-translate-y-0.5">
                            {homeHeroContent.heroCtaPrimary}
                            <ArrowRight size={17} />
                        </Link>

                        <a
                            href="/cv-vanoverberghe-stephanie.pdf"
                            target="_blank"
                            rel="noreferrer"
                            className="btn-premium btn-premium-soft inline-flex items-center gap-2 transition hover:-translate-y-0.5"
                        >
                            <Download size={17} />
                            {homeHeroContent.heroCtaSecondary}
                        </a>
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
