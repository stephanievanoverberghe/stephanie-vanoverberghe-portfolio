'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Download } from 'lucide-react';

import { cn } from '@/lib/cn';
import { headerContent, primaryNavigation } from '@/content/navigation';

type HeaderDesktopNavProps = {
    isActive: (href: string) => boolean;
};

export function HeaderDesktopNav({ isActive }: HeaderDesktopNavProps) {
    return (
        <nav aria-label={headerContent.desktopNavAriaLabel} className="header-desktop-nav">
            <div className="grid grid-cols-[1fr_auto] items-center gap-6 border-t py-4" style={{ borderColor: 'color-mix(in oklab, var(--sage) 22%, transparent)' }}>
                <div
                    className="grid grid-cols-4 overflow-hidden rounded-[1.4rem] border bg-(--surface-1)"
                    style={{ borderColor: 'color-mix(in oklab, var(--sage) 26%, transparent)' }}
                >
                    {primaryNavigation.map((item, index) => {
                        const active = isActive(item.href);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                aria-current={active ? 'page' : undefined}
                                className={cn(
                                    'group relative flex min-h-16 items-center justify-between border-r px-5 transition last:border-r-0',
                                    active ? 'text-(--text-strong)' : 'text-(--text-muted) hover:text-(--text-strong)',
                                )}
                                style={{
                                    borderColor: 'color-mix(in oklab, var(--sage) 18%, transparent)',
                                }}
                            >
                                {active && (
                                    <motion.span
                                        layoutId="desktop-nav-block"
                                        className="absolute inset-0"
                                        style={{
                                            background:
                                                'linear-gradient(135deg, color-mix(in oklab, var(--accent) 10%, var(--surface-1)), color-mix(in oklab, var(--gold) 14%, var(--surface-1)))',
                                        }}
                                        transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                                    />
                                )}

                                <span className="relative z-10">
                                    <span className="block text-[10px] font-bold tracking-[0.2em] text-(--accent)">0{index + 1}</span>
                                    <span className="mt-1 block text-[12px] font-bold uppercase tracking-[0.2em]">{item.label}</span>
                                </span>

                                <span className="relative z-10 text-(--accent) opacity-0 transition group-hover:opacity-100">/</span>
                            </Link>
                        );
                    })}
                </div>

                <div className="flex items-center gap-3">
                    <Link
                        href={headerContent.resumeHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-16 items-center gap-2 rounded-[1.4rem] border px-5 text-xs font-bold uppercase tracking-[0.16em] text-(--text-strong)"
                        style={{
                            borderColor: 'color-mix(in oklab, var(--gold) 46%, transparent)',
                            background: 'color-mix(in oklab, var(--gold) 14%, var(--surface-1))',
                        }}
                    >
                        <Download size={16} />
                        {headerContent.resumeLabel}
                    </Link>

                    <Link
                        href="/contact"
                        className="inline-flex min-h-16 items-center gap-2 rounded-[1.4rem] px-5 text-xs font-bold uppercase tracking-[0.16em] text-white"
                        style={{
                            background: 'linear-gradient(135deg, var(--accent), color-mix(in oklab, var(--accent) 78%, var(--ink)))',
                        }}
                    >
                        {headerContent.contactLabel}
                        <ArrowUpRight size={16} />
                    </Link>
                </div>
            </div>
        </nav>
    );
}
