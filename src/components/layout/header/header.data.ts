export const NAV = [
    { href: '/', label: 'Accueil' },
    { href: '/projects', label: 'Projets' },
    { href: '/skills', label: 'Compétences' },
    { href: '/contact', label: 'Contact' },
] as const;

export type NavItem = (typeof NAV)[number];

export const BRAND = {
    initials: 'SV',
    name: 'Stéphanie Vanoverberghe',
    title: 'Développeuse Front-End',
    signature: 'Créer · Comprendre · Construire',
    stack: 'React / Next.js / TypeScript',
    avatarSrc: '/images/stephanie-vanoverberghe.webp',
} as const;
