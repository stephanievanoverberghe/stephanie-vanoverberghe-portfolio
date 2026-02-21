// src/components/home/home.data.ts
export const FEATURED_SLUGS = ['ancre-toi', 'alchimiste-creations'] as const;

export const HERO = {
    role: 'Développeuse Front-End React / Next.js',
    pitch: 'J’aide à livrer des interfaces claires, rapides et maintenables : design system, performance, accessibilité et micro-interactions utiles.',
    bullets: ['UI/UX — composants réutilisables', 'Performance — images, SSG/ISR, optimisation perçue', 'Accessibilité — focus visible, contrastes, clavier'],
    stats: [
        { label: 'Stack', value: 'Next.js + TS' },
        { label: 'Déploiement', value: 'Vercel' },
        { label: 'Approche', value: 'Produit / UX' },
    ],
} as const;
