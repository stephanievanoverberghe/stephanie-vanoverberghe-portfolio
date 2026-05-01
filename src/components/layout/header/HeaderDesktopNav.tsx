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
            <div className="nav-shell grid grid-cols-[1fr_auto] items-center gap-6 py-4">
                <div className="nav-grid grid grid-cols-4 overflow-hidden rounded-[1.4rem]">
                    {primaryNavigation.map((item, index) => {
                        const active = isActive(item.href);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                aria-current={active ? 'page' : undefined}
                                className={cn(
                                    'nav-item nav-link-motion group relative flex min-h-16 items-center justify-between border-r px-5 transition last:border-r-0',
                                    active ? 'text-(--text-strong)' : 'text-(--text-muted) hover:text-(--text-strong)',
                                )}
                            >
                                {active && (
                                    <motion.span layoutId="desktop-nav-block" className="nav-item-active absolute inset-0" transition={{ type: 'spring', stiffness: 420, damping: 36 }} />
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
                        className="button-motion btn-premium btn-premium-soft inline-flex min-h-16 items-center gap-2 rounded-[1.4rem] px-5 text-xs"
                    >
                        <Download size={16} />
                        {headerContent.resumeLabel}
                    </Link>

                    <Link
                        href="/contact"
                        className="button-motion btn-premium btn-premium-primary inline-flex min-h-16 items-center gap-2 rounded-[1.4rem] px-5 text-xs"
                    >
                        {headerContent.contactLabel}
                        <ArrowUpRight size={16} />
                    </Link>
                </div>
            </div>
        </nav>
    );
}
