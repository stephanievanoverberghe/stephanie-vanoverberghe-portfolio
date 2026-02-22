// src/components/layout/header/header.data.ts

export const NAV = [
    { href: '/', label: 'Accueil' },
    { href: '/projects', label: 'Projets' },
    { href: '/skills', label: 'Compétences' },
    { href: '/contact', label: 'Contact' },
] as const;

export type NavItem = (typeof NAV)[number];

export const BRAND = {
    initials: 'VS',
    name: 'Vanoverberghe Stéphanie',
    title: 'Développeuse Front-End — React / Next.js',
    avatarSrc: '/images/stephanie-vanoverberghe.webp',
} as const;
