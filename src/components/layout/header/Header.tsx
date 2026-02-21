// src/components/layout/header/Header.tsx

'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Menu, X } from 'lucide-react';

import { cn } from './header.utils';
import { useScrollState } from './useScrollState';
import { ribbonStyle, headerBorderStyle } from './header.styles';
import { HeaderBrand } from './HeaderBrand';
import { HeaderDesktopNav } from './HeaderDesktopNav';
import { HeaderMobileMenu } from './HeaderMobileMenu';

export default function Header() {
    const pathname = usePathname();
    const scrolled = useScrollState(8);
    const [open, setOpen] = useState(false);

    // scroll progress ribbon
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 30, mass: 0.2 });

    const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

    useEffect(() => setOpen(false), [pathname]);

    // ESC close
    useEffect(() => {
        if (!open) return;
        const onKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [open]);

    // lock body scroll
    useEffect(() => {
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = prev;
        };
    }, [open]);

    return (
        <header role="banner" className="sticky top-0 z-50">
            {/* single signature ribbon */}
            <motion.div aria-hidden className="h-0.75 w-full origin-left" style={{ scaleX, ...ribbonStyle }} />

            <motion.div
                initial={false}
                animate={{
                    boxShadow: scrolled ? '0 8px 30px rgba(2,8,23,0.08)' : '0 0 0 rgba(0,0,0,0)',
                    backgroundColor: 'rgba(248,250,252,0.78)',
                    backdropFilter: 'blur(10px)',
                }}
                className="border-b"
                style={headerBorderStyle}
            >
                <div className={cn('container-page flex items-center justify-between', scrolled ? 'py-2' : 'py-3')}>
                    <HeaderBrand />
                    <HeaderDesktopNav isActive={isActive} />

                    <button
                        type="button"
                        className="md:hidden inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold"
                        style={{
                            borderColor: 'var(--border-soft)',
                            color: 'var(--text-strong)',
                            background: 'color-mix(in oklab, var(--surface-1) 88%, transparent)',
                        }}
                        onClick={() => setOpen((v) => !v)}
                        aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
                        aria-expanded={open}
                        aria-controls="primary-mobile-nav"
                    >
                        {open ? <X size={18} /> : <Menu size={18} />}
                        Menu
                    </button>
                </div>
            </motion.div>

            <HeaderMobileMenu open={open} onClose={() => setOpen(false)} isActive={isActive} />
        </header>
    );
}
