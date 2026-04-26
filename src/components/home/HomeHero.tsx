// src/components/home/HomeHero.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { prefaceContent } from '@/content/preface';

function Badge({ children }: { children: React.ReactNode }) {
    return (
        <span
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold text-(text-strong)"
            style={{
                borderColor: 'color-mix(in oklab, var(--accent) 22%, var(--border-soft))',
                background: 'color-mix(in oklab, var(--accent) 8%, var(--surface-1))',
            }}
        >
            <span aria-hidden className="h-2 w-2 rounded-full bg-(--accent)" />
            {children}
        </span>
    );
}

function Stat({ label, value }: { label: string; value: string }) {
    return (
        <div
            className="rounded-2xl border px-4 py-3 border-(--border-soft)"
            style={{
                background: 'color-mix(in oklab, var(--surface-2) 58%, var(--surface-1))',
            }}
        >
            <div className="text-xs uppercase tracking-[0.14em] opacity-70">{label}</div>
            <div className="mt-1 text-sm font-semibold text-(--text-strong)">{value}</div>
        </div>
    );
}

export default function HomeHero() {
    return (
        <header className="relative overflow-hidden rounded-2xl border p-6 sm:p-10 border-(--border-soft) bg-(--surface-1) shadow-(--shadow-card)">
            <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                <div>
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
                        className="flex flex-wrap items-center gap-3"
                    >
                        <Badge>{prefaceContent.title}</Badge>
                        <span className="inline-flex items-center gap-2 text-xs font-semibold opacity-80">
                            <Sparkles size={14} aria-hidden />
                            {prefaceContent.availability}
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.42, delay: 0.05, ease: [0.22, 0.61, 0.36, 1] }}
                        className="mt-4 text-[1.9rem] sm:text-5xl font-semibold leading-[1.05] text-(--text-strong)"
                    >
                        {prefaceContent.role} <span className="text-gradient-accent">UI/UX · Perf · A11y</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.42, delay: 0.12, ease: [0.22, 0.61, 0.36, 1] }}
                        className="mt-4 text-base sm:text-lg max-w-[70ch] opacity-90"
                    >
                        {prefaceContent.intro}
                    </motion.p>

                    <motion.ul
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.42, delay: 0.18, ease: [0.22, 0.61, 0.36, 1] }}
                        className="mt-6 grid gap-2 sm:grid-cols-3 text-sm"
                    >
                        {prefaceContent.sections.map((section) => (
                            <li
                                key={section.icon}
                                className="rounded-xl border px-3 py-2 border-(--border-soft)"
                                style={{
                                    background: 'color-mix(in oklab, var(--surface-2) 60%, var(--surface-1))',
                                }}
                            >
                                {section.text}
                            </li>
                        ))}
                    </motion.ul>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.42, delay: 0.24, ease: [0.22, 0.61, 0.36, 1] }}
                        className="mt-7 flex flex-wrap gap-3"
                    >
                        <Link href="/projects" className="btn btn-cta text-(--text-surface-1)">
                            Voir les études de cas <ArrowRight size={16} aria-hidden />
                        </Link>
                        <Link href="/skills" className="btn btn-secondary">
                            Compétences
                        </Link>
                        <Link href="/contact" className="btn btn-ghost">
                            Me contacter
                        </Link>
                    </motion.div>
                </div>

                <motion.aside
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.42, delay: 0.14, ease: [0.22, 0.61, 0.36, 1] }}
                    className="rounded-2xl border p-5 border-(--border-soft)"
                    style={{
                        background: 'color-mix(in oklab, var(--surface-2) 42%, var(--surface-1))',
                    }}
                >
                    <div className="flex items-center gap-4">
                        <div className="relative h-14 w-14 overflow-hidden rounded-2xl border border-(--border-soft) bg-(--surface-1)">
                            <Image
                                src="/images/stephanie-vanoverberghe.webp"
                                alt="Portrait de Stéphanie Vanoverberghe"
                                fill
                                sizes="56px"
                                className="object-cover"
                                priority={false}
                            />
                        </div>

                        <div>
                            <div className="text-sm font-semibold text-(--text-strong)">{prefaceContent.profileName}</div>
                            <div className="text-sm opacity-80">{prefaceContent.profileStack}</div>
                        </div>
                    </div>

                    <div className="mt-5 grid gap-3">
                        {prefaceContent.stats.map((s) => (
                            <Stat key={s.label} label={s.label} value={s.value} />
                        ))}
                    </div>

                    <div className="mt-5 rounded-2xl border p-4 text-sm border-(--border-soft) bg-(--surface-1)">
                        <div className="font-semibold text-(--text-strong)">Vision</div>
                        <div className="mt-1 opacity-80">{prefaceContent.quote}</div>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                        <a className="btn btn-secondary w-full" href="/cv-vanoverberghe-stephanie.pdf" target="_blank" rel="noopener noreferrer">
                            Télécharger mon CV
                        </a>
                        <Link className="btn btn-cta w-full text-(--text-surface-1)" href="/contact">
                            Me contacter
                        </Link>
                    </div>
                </motion.aside>
            </div>
        </header>
    );
}
