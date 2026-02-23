// src/components/layout/header/HeaderDesktopNav.tsx

'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { NAV, type NavItem } from './header.data';
import { cn } from './header.utils';

export function HeaderDesktopNav({ isActive }: { isActive: (href: string) => boolean }) {
    return (
        <nav aria-label="Navigation principale" className="hidden md:flex items-center gap-4">
            <div
                className="relative flex items-center gap-1 rounded-full border p-1 border-(--border-soft)"
                style={{ background: 'color-mix(in oklab, var(--surface-1) 80%, transparent)' }}
            >
                {NAV.map((item: NavItem) => {
                    const active = isActive(item.href);
                    return (
                        <div key={item.href} className="relative">
                            <Link
                                href={item.href}
                                className={cn('relative z-10 px-3 py-1.5 text-sm font-medium rounded-full transition')}
                                style={{
                                    color: active ? 'var(--text-strong)' : 'var(--text)',
                                    opacity: active ? 1 : 0.85,
                                }}
                            >
                                {item.label}
                            </Link>

                            {active && (
                                <motion.span
                                    layoutId="nav-pill"
                                    className="absolute inset-0 rounded-full"
                                    style={{
                                        background: 'color-mix(in oklab, var(--accent) 10%, var(--surface-1))',
                                        border: '1px solid',
                                        borderColor: 'color-mix(in oklab, var(--accent) 28%, var(--border-soft))',
                                    }}
                                    transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                                />
                            )}
                        </div>
                    );
                })}
            </div>

            <Link
                href="/contact"
                className="btn btn-cta text-sm inline-flex items-center gap-2"
                aria-label="Me contacter ou télécharger mon CV"
                title="Me contacter / CV"
                style={{ color: '#FDFDFD' }}
            >
                <Mail size={16} />
                Me contacter
            </Link>
        </nav>
    );
}
