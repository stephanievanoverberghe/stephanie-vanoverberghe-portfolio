'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Mail } from 'lucide-react';

/** Nav principale */
const NAV = [
    { href: '/', label: 'Accueil' },
    { href: '/projects', label: 'Projets' },
    { href: '/skills', label: 'Compétences' },
    { href: '/contact', label: 'Contact' },
] as const;
type NavItem = (typeof NAV)[number];

/** Ombre + compactage au scroll */
function useScrollState(offset = 8) {
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > offset);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [offset]);
    return scrolled;
}

export default function Header() {
    const pathname = usePathname();
    const scrolled = useScrollState(8);
    const [open, setOpen] = useState(false);

    // Ferme le menu mobile à chaque navigation
    useEffect(() => setOpen(false), [pathname]);

    // Ferme sur Échap
    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') setOpen(false);
    }, []);
    useEffect(() => {
        if (!open) return;
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [open, onKeyDown]);

    const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

    return (
        <header role="banner" className="sticky top-0 z-50">
            {/* Ruban */}
            <div
                aria-hidden
                className="h-[3px] w-full"
                style={{
                    background: 'linear-gradient(90deg, var(--accent), var(--sage), var(--lilac), var(--gold))',
                }}
            />

            {/* Barre principale */}
            <motion.div
                initial={false}
                animate={{
                    boxShadow: scrolled ? '0 6px 20px rgba(2,8,23,0.06)' : '0 0 0 rgba(0,0,0,0)',
                    backgroundColor: 'rgba(248,250,252,0.75)',
                    backdropFilter: 'blur(8px)',
                }}
                className="border-b"
                style={{ borderColor: 'var(--border-soft)' }}
            >
                <div className={['container-page', 'flex items-center justify-between', scrolled ? 'py-2' : 'py-3'].join(' ')}>
                    {/* Identité + micro-accent */}
                    <Link href="/" aria-label="Retour à l'accueil" className="group inline-flex items-center gap-2">
                        <span className="font-semibold tracking-wide" style={{ color: 'var(--text-strong)' }}>
                            Vanoverberghe Stéphanie
                        </span>
                        <span aria-hidden className="inline-block h-2 w-2 rounded-full transition-transform group-hover:scale-110" style={{ background: 'var(--accent)' }} />
                    </Link>

                    {/* Navigation desktop */}
                    <nav aria-label="Navigation principale" className="hidden md:flex items-center gap-6">
                        <div className="relative flex items-center gap-6">
                            {NAV.map((item: NavItem) => (
                                <div key={item.href} className="relative">
                                    <Link
                                        href={item.href}
                                        className={['text-sm transition', 'hover:opacity-90', isActive(item.href) ? 'opacity-100' : 'opacity-90'].join(' ')}
                                        style={{ color: 'var(--text)' }}
                                    >
                                        {item.label}
                                    </Link>

                                    {/* Soulignement animé partagé */}
                                    {isActive(item.href) && (
                                        <motion.span
                                            layoutId="nav-underline"
                                            className="absolute -bottom-2 left-0 h-[2px] w-full rounded"
                                            style={{ background: 'var(--accent)' }}
                                            transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="h-6 w-px" aria-hidden="true" style={{ background: 'var(--border-soft)' }} />

                        <Link
                            href="/contact"
                            className="btn btn-cta text-sm inline-flex items-center gap-2"
                            aria-label="Me contacter ou télécharger mon CV"
                            title="Me contacter / CV"
                            style={{ color: '#FDFDFD' }}
                        >
                            <Mail size={16} />
                            Me contacter / CV
                        </Link>
                    </nav>

                    {/* Bouton mobile */}
                    <button
                        className="md:hidden inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm"
                        style={{
                            borderColor: 'var(--border-soft)',
                            color: 'var(--text-strong)',
                            background: 'var(--surface-1)',
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

            {/* Menu mobile*/}
            <AnimatePresence>
                {open && (
                    <motion.nav
                        id="primary-mobile-nav"
                        aria-label="Navigation mobile"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.24, ease: [0.22, 0.61, 0.36, 1] }}
                        className="md:hidden overflow-hidden border-b"
                        style={{
                            borderColor: 'var(--border-soft)',
                            background: 'color-mix(in oklab, var(--paper) 94%, black)',
                        }}
                    >
                        {/* Carte identité */}
                        <div className="container-page py-3">
                            <div
                                className="rounded-2xl p-4 border"
                                style={{
                                    background: 'var(--surface-1)',
                                    borderColor: 'var(--border-soft)',
                                }}
                            >
                                <div className="font-semibold" style={{ color: 'var(--text-strong)' }}>
                                    Vanoverberghe Stéphanie
                                </div>
                                <div className="text-sm opacity-80 mt-1">Front-End React / Next.js - UI/UX - TypeScript</div>
                            </div>
                        </div>

                        {/* Liens */}
                        <div className="container-page pb-3 flex flex-col">
                            {NAV.map((item: NavItem) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="py-2 transition"
                                    style={{
                                        color: isActive(item.href) ? 'var(--text-strong)' : 'var(--text)',
                                    }}
                                >
                                    {item.label}
                                </Link>
                            ))}

                            <Link href="/contact" className="mt-2 btn btn-cta w-fit inline-flex items-center gap-2" style={{ color: '#FDFDFD' }}>
                                <Mail size={16} />
                                Me contacter / CV
                            </Link>
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>
        </header>
    );
}
