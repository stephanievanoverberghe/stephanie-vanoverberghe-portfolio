'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Menu, X } from 'lucide-react';

import { HeaderBrand } from './HeaderBrand';
import { HeaderDesktopNav } from './HeaderDesktopNav';
import { HeaderMobileMenu } from './HeaderMobileMenu';
import { ribbonStyle } from './header.styles';
import { useScrollState } from './useScrollState';

export default function Header() {
    const pathname = usePathname();
    const scrolled = useScrollState(12);
    const [open, setOpen] = useState(false);
    const menuButtonRef = useRef<HTMLButtonElement>(null);

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 30, mass: 0.2 });

    const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

    useEffect(() => {
        if (!open) return;

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setOpen(false);
        };

        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', onKeyDown);

        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [open]);

    return (
        <header className="sticky top-0 z-50">
            <motion.div aria-hidden className="h-0.75 origin-left" style={{ scaleX, ...ribbonStyle }} />

            <div
                className="border-b backdrop-blur-xl"
                style={{
                    borderColor: 'color-mix(in oklab, var(--sage) 24%, transparent)',
                    background: 'color-mix(in oklab, var(--paper) 92%, transparent)',
                    boxShadow: scrolled ? '0 18px 50px rgba(18, 19, 20, 0.07)' : 'none',
                }}
            >
                <div className="container-page">
                    <div className="flex items-center justify-between gap-6 py-4">
                        <HeaderBrand />

                        <button
                            ref={menuButtonRef}
                            type="button"
                            onClick={() => setOpen((value) => !value)}
                            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
                            aria-expanded={open}
                            aria-controls="primary-mobile-nav"
                            className="inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-bold uppercase tracking-[0.18em] text-(--text-strong) lg:hidden"
                            style={{
                                borderColor: 'color-mix(in oklab, var(--sage) 35%, transparent)',
                                background: 'var(--surface-1)',
                            }}
                        >
                            {open ? <X size={18} /> : <Menu size={18} />}
                            Menu
                        </button>
                    </div>

                    <HeaderDesktopNav isActive={isActive} />
                </div>
            </div>

            <HeaderMobileMenu open={open} onClose={() => setOpen(false)} isActive={isActive} />
        </header>
    );
}
