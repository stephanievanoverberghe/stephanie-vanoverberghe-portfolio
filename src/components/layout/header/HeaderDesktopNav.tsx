'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { NAV, type NavItem } from './header.data';

export function HeaderDesktopNav({ isActive }: { isActive: (href: string) => boolean }) {
    return (
        <nav aria-label="Navigation principale" className="hidden items-center gap-8 md:flex">
            <div className="flex items-center gap-7">
                {NAV.map((item: NavItem) => {
                    const active = isActive(item.href);

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="group relative py-2 text-sm font-medium tracking-[0.03em] transition"
                            style={{
                                color: active ? 'var(--text-strong)' : 'var(--text-muted)',
                            }}
                        >
                            <span className="relative z-10">{item.label}</span>

                            <span
                                aria-hidden
                                className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                                style={{ background: 'var(--sage)' }}
                            />

                            {active && (
                                <motion.span
                                    layoutId="header-active-line"
                                    aria-hidden
                                    className="absolute -bottom-0.5 left-0 h-px w-full"
                                    style={{ background: 'var(--accent)' }}
                                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                                />
                            )}
                        </Link>
                    );
                })}
            </div>

            <Link
                href="/contact"
                aria-label="Me contacter"
                className="group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition duration-300"
                style={{
                    color: 'var(--text-strong)',
                    borderColor: 'color-mix(in oklab, var(--accent) 30%, var(--border-soft))',
                    background: 'color-mix(in oklab, var(--surface-1) 72%, transparent)',
                }}
            >
                Échanger
                <ArrowUpRight size={15} className="transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
        </nav>
    );
}
