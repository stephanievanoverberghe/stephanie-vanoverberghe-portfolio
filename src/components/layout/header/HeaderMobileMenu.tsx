// src/components/layout/header/HeaderMobileMenu.tsx

'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { BRAND, NAV, type NavItem } from './header.data';

const item = {
    hidden: { opacity: 0, y: 6 },
    show: { opacity: 1, y: 0 },
};

export function HeaderMobileMenu({ open, onClose, isActive }: { open: boolean; onClose: () => void; isActive: (href: string) => boolean }) {
    const drawerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open || !drawerRef.current) return;

        const container = drawerRef.current;
        const selector = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
        const getFocusable = () => Array.from(container.querySelectorAll<HTMLElement>(selector));

        const initialFocusable = getFocusable();
        initialFocusable[0]?.focus();

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key !== 'Tab') return;

            const focusable = getFocusable();
            if (focusable.length === 0) return;

            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            const active = document.activeElement;

            if (e.shiftKey && active === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && active === last) {
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
                        style={{ background: 'rgba(2,8,23,0.38)' }}
                    />

                    <motion.nav
                        id="primary-mobile-nav"
                        aria-label="Navigation mobile"
                        className="fixed left-0 right-0 top-[calc(env(safe-area-inset-top)+0px)] z-50 md:hidden"
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ duration: 0.18, ease: [0.22, 0.61, 0.36, 1] }}
                    >
                        <div className="container-page pt-3">
                            <div className="rounded-2xl border overflow-hidden border-(--border-soft) bg-(--surface-1)">
                                <div ref={drawerRef} className="rounded-2xl border overflow-hidden border-(--border-soft) bg-(--surface-1)">
                                    <div className="font-semibold text-(--text-strong)">{BRAND.name}</div>
                                    <div className="mt-1 text-sm opacity-80">{BRAND.title}</div>
                                </div>

                                <motion.div className="p-3" initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.05 } } }}>
                                    {NAV.map((n: NavItem) => {
                                        const active = isActive(n.href);
                                        return (
                                            <motion.div key={n.href} variants={item}>
                                                <Link
                                                    href={n.href}
                                                    onClick={onClose}
                                                    className="flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium transition"
                                                    style={{
                                                        color: active ? 'var(--text-strong)' : 'var(--text)',
                                                        background: active ? 'color-mix(in oklab, var(--accent) 9%, var(--surface-1))' : 'transparent',
                                                        border: active ? '1px solid color-mix(in oklab, var(--accent) 22%, var(--border-soft))' : '1px solid transparent',
                                                    }}
                                                >
                                                    {n.label}
                                                    <span aria-hidden className="opacity-70">
                                                        →
                                                    </span>
                                                </Link>
                                            </motion.div>
                                        );
                                    })}

                                    <motion.div variants={item} className="mt-2">
                                        <Link href="/contact" onClick={onClose} className="btn btn-cta w-full inline-flex items-center justify-center gap-2 text-(--surface-1)">
                                            <Mail size={16} />
                                            Me contacter
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
