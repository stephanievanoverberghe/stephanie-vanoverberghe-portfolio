// src/components/layout/header/header.data.ts

export const NAV = [
    { href: '/', label: 'Accueil' },
    { href: '/projects', label: 'Projets' },
    { href: '/skills', label: 'Compétences' },
    { href: '/about', label: 'À propos' },
] as const;

export type NavItem = (typeof NAV)[number];

export const BRAND = {
    initials: 'VS',
    name: 'Stéphanie Vanoverberghe',
    title: 'Développeuse Frontend',
    baseline: 'Créer · Comprendre · Construire',
    stack: ['TypeScript', 'React', 'Next.js'],
    avatarSrc: '/images/stephanie-vanoverberghe.webp',
    resumeHref: '/cv-stephanie-vanoverberghe.pdf',
} as const;
