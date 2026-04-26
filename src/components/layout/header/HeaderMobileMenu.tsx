'use client';

import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Download, Mail } from 'lucide-react';

import { BRAND, NAV, type NavItem } from './header.data';

type HeaderMobileMenuProps = {
    open: boolean;
    onClose: () => void;
    isActive: (href: string) => boolean;
};

export function HeaderMobileMenu({ open, onClose, isActive }: HeaderMobileMenuProps) {
    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        className="header-mobile-menu fixed inset-0 z-40 bg-(--ink)/45 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    <motion.nav
                        id="primary-mobile-nav"
                        aria-label="Navigation mobile"
                        className="header-mobile-menu fixed inset-x-0 top-18 z-50 px-4"
                        initial={{ opacity: 0, y: -18 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -18 }}
                        transition={{ duration: 0.24 }}
                    >
                        <div
                            className="relative overflow-hidden rounded-4xl border p-5 shadow-2xl"
                            style={{
                                borderColor: 'color-mix(in oklab, var(--sage) 30%, transparent)',
                                background: 'var(--paper)',
                            }}
                        >
                            <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-(--lilac)/35 blur-2xl" />
                            <div className="absolute -left-16 bottom-10 h-40 w-40 rounded-full bg-(--sage)/25 blur-2xl" />

                            <div className="relative">
                                <p className="text-xs font-bold uppercase tracking-[0.28em] text-(--accent)">Menu</p>

                                <p className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-(--text-strong)">
                                    Créer.
                                    <br />
                                    Comprendre.
                                    <br />
                                    <span className="italic text-(--accent)">Construire.</span>
                                </p>

                                <div className="mt-6 grid gap-2">
                                    {NAV.map((item: NavItem, index) => {
                                        const active = isActive(item.href);

                                        return (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                onClick={onClose}
                                                aria-current={active ? 'page' : undefined}
                                                className="group flex items-center justify-between rounded-2xl border px-4 py-4 transition"
                                                style={{
                                                    borderColor: active
                                                        ? 'color-mix(in oklab, var(--accent) 35%, transparent)'
                                                        : 'color-mix(in oklab, var(--sage) 18%, transparent)',
                                                    background: active
                                                        ? 'linear-gradient(135deg, color-mix(in oklab, var(--accent) 10%, var(--paper)), color-mix(in oklab, var(--gold) 14%, var(--paper)))'
                                                        : 'color-mix(in oklab, var(--surface-1) 82%, transparent)',
                                                }}
                                            >
                                                <span className="flex items-center gap-4">
                                                    <span className="text-xs font-bold text-(--accent)">0{index + 1}</span>

                                                    <span className="text-sm font-bold uppercase tracking-[0.18em] text-(--text-strong)">{item.label}</span>
                                                </span>

                                                <ArrowUpRight size={18} className="text-(--text-muted) transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                            </Link>
                                        );
                                    })}
                                </div>

                                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    <Link
                                        href="/contact"
                                        onClick={onClose}
                                        className="inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-4 text-sm font-bold uppercase tracking-[0.16em] text-white"
                                        style={{
                                            background: 'linear-gradient(135deg, var(--accent), color-mix(in oklab, var(--accent) 78%, var(--ink)))',
                                        }}
                                    >
                                        <Mail size={16} />
                                        Contact
                                    </Link>

                                    <Link
                                        href={BRAND.resumeHref}
                                        target="_blank"
                                        rel="noreferrer"
                                        onClick={onClose}
                                        className="inline-flex items-center justify-center gap-2 rounded-2xl border px-4 py-4 text-sm font-bold uppercase tracking-[0.16em] text-(--text-strong)"
                                        style={{
                                            borderColor: 'color-mix(in oklab, var(--gold) 45%, transparent)',
                                            background: 'color-mix(in oklab, var(--gold) 14%, var(--surface-1))',
                                        }}
                                    >
                                        <Download size={16} />
                                        CV
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.nav>
                </>
            )}
        </AnimatePresence>
    );
}
