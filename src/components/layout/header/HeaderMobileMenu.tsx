'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { BRAND, NAV, type NavItem } from './header.data';
import { mobilePanelStyle } from './header.styles';

const item = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0 },
};

export function HeaderMobileMenu({ open, onClose, isActive }: { open: boolean; onClose: () => void; isActive: (href: string) => boolean }) {
    const drawerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open || !drawerRef.current) return;

        const container = drawerRef.current;
        const selector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
        const getFocusable = () => Array.from(container.querySelectorAll<HTMLElement>(selector));

        getFocusable()[0]?.focus();

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key !== 'Tab') return;

            const focusable = getFocusable();
            if (focusable.length === 0) return;

            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            }

            if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        };

        container.addEventListener('keydown', onKeyDown);
        return () => container.removeEventListener('keydown', onKeyDown);
    }, [open]);

    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        aria-hidden
                        className="fixed inset-0 z-40 md:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        style={{ background: 'rgba(18, 19, 20, 0.34)' }}
                    />

                    <motion.nav
                        id="primary-mobile-nav"
                        aria-label="Navigation mobile"
                        className="fixed inset-x-0 top-[calc(env(safe-area-inset-top)+0px)] z-50 md:hidden"
                        initial={{ y: -14, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -14, opacity: 0 }}
                        transition={{ duration: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
                    >
                        <div className="container-page pt-3">
                            <div ref={drawerRef} className="relative overflow-hidden rounded-4xl border p-4 shadow-[0_28px_90px_rgba(18,19,20,0.16)]" style={mobilePanelStyle}>
                                <div aria-hidden className="absolute -right-16 -top-20 h-48 w-48 rounded-full opacity-40 blur-3xl" style={{ background: 'var(--lilac)' }} />
                                <div aria-hidden className="absolute -bottom-24 -left-16 h-52 w-52 rounded-full opacity-35 blur-3xl" style={{ background: 'var(--sage)' }} />

                                <div className="relative border-b pb-4" style={{ borderColor: 'color-mix(in oklab, var(--border-soft) 80%, transparent)' }}>
                                    <p className="text-[10px] uppercase tracking-[0.24em] text-(--sage)">{BRAND.signature}</p>
                                    <p className="mt-3 text-lg font-semibold text-(--text-strong)">{BRAND.name}</p>
                                    <p className="mt-1 text-sm text-(--text-muted)">{BRAND.stack}</p>
                                </div>

                                <motion.div className="relative mt-4 space-y-1" initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.05 } } }}>
                                    {NAV.map((n: NavItem) => {
                                        const active = isActive(n.href);

                                        return (
                                            <motion.div key={n.href} variants={item}>
                                                <Link
                                                    href={n.href}
                                                    onClick={onClose}
                                                    className="group flex items-center justify-between rounded-2xl px-3 py-3 text-base font-medium transition"
                                                    style={{
                                                        color: active ? 'var(--text-strong)' : 'var(--text)',
                                                        background: active ? 'color-mix(in oklab, var(--accent) 8%, var(--surface-1))' : 'transparent',
                                                    }}
                                                >
                                                    <span>{n.label}</span>
                                                    <span
                                                        aria-hidden
                                                        className="transition group-hover:translate-x-0.5"
                                                        style={{ color: active ? 'var(--accent)' : 'var(--text-muted)' }}
                                                    >
                                                        →
                                                    </span>
                                                </Link>
                                            </motion.div>
                                        );
                                    })}

                                    <motion.div variants={item} className="pt-4">
                                        <Link
                                            href="/contact"
                                            onClick={onClose}
                                            className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold transition"
                                            style={{
                                                color: 'var(--surface-1)',
                                                background: 'var(--accent)',
                                                borderColor: 'var(--accent)',
                                            }}
                                        >
                                            Échanger
                                            <ArrowUpRight size={16} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                        </Link>
                                    </motion.div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.nav>
                </>
            )}
        </AnimatePresence>
    );
}
