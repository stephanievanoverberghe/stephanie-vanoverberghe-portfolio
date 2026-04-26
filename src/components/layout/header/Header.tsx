'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Menu, X } from 'lucide-react';

import { cn } from '@/lib/cn';
import { useScrollState } from './useScrollState';
import { BRAND } from './header.data';
import { headerShellStyle, ribbonStyle } from './header.styles';
import { HeaderBrand } from './HeaderBrand';
import { HeaderDesktopNav } from './HeaderDesktopNav';
import { HeaderMobileMenu } from './HeaderMobileMenu';

export default function Header() {
    const pathname = usePathname();
    const scrolled = useScrollState(8);
    const [open, setOpen] = useState(false);
    const menuButtonRef = useRef<HTMLButtonElement>(null);
    const wasOpenRef = useRef(false);

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 30, mass: 0.2 });

    const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

    useEffect(() => {
        if (!open) return;

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpen(false);
        };

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [open]);

    useEffect(() => {
        if (!open) return;

        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = prev;
        };
    }, [open]);

    useEffect(() => {
        if (wasOpenRef.current && !open) {
            menuButtonRef.current?.focus();
        }

        wasOpenRef.current = open;
    }, [open]);

    return (
        <header role="banner" className="sticky top-0 z-50">
            <motion.div aria-hidden className="h-0.75 w-full origin-left" style={{ scaleX, ...ribbonStyle }} />

            <motion.div
                initial={false}
                animate={{
                    boxShadow: scrolled ? '0 18px 50px rgba(18,19,20,0.08)' : '0 0 0 rgba(0,0,0,0)',
                }}
                className="border-b"
                style={headerShellStyle}
            >
                <div className="hidden border-b md:block" style={{ borderColor: 'color-mix(in oklab, var(--border-soft) 70%, transparent)' }}>
                    <div className="container-page flex items-center justify-between py-1.5">
                        <p className="text-[10px] uppercase tracking-[0.26em] text-(--sage)">{BRAND.signature}</p>
                        <p className="text-[10px] uppercase tracking-[0.22em] text-(--text-muted)">{BRAND.stack}</p>
                    </div>
                </div>

                <div className={cn('container-page flex items-center justify-between transition-[padding] duration-300', scrolled ? 'py-2.5' : 'py-4')}>
                    <HeaderBrand />

                    <HeaderDesktopNav isActive={isActive} />

                    <button
                        type="button"
                        ref={menuButtonRef}
                        className="inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-semibold transition md:hidden"
                        style={{
                            borderColor: 'color-mix(in oklab, var(--sage) 32%, var(--border-soft))',
                            color: 'var(--text-strong)',
                            background: 'color-mix(in oklab, var(--surface-1) 90%, transparent)',
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
