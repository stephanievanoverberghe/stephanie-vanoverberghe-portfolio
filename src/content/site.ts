import type { SiteProfile } from '@/types/content';

export const siteProfile: SiteProfile = {
    name: 'Stéphanie Vanoverberghe',
    firstName: 'Stéphanie',
    role: 'Développeuse Front-End React / Next.js',
    signature: 'Créer · Comprendre · Construire',
    availability: 'Recherche CDI Frontend',
    primaryStack: ['React', 'Next.js', 'TypeScript', 'UI/UX'],
    resumeHref: '/cv-vanoverberghe-stephanie.pdf',
    avatar: {
        src: '/images/stephanie-vanoverberghe.webp',
        alt: 'Portrait de Stéphanie Vanoverberghe',
    },
    quote: 'Créer avec sens. Coder avec passion.',
    socials: {
        github: {
            href: 'https://github.com/stephanievanoverberghe',
            label: 'GitHub',
        },
        linkedin: {
            href: 'https://www.linkedin.com/in/stephanie-vanoverberghe/',
            label: 'LinkedIn',
        },
    },
};

export const siteMeta = {
    siteName: 'Portfolio — Vanoverberghe Stéphanie',
    portfolioTitle: 'Vanoverberghe Stéphanie - Développeuse Front-End (React/Next)',
    description: 'Portfolio front-end React / Next.js - UI/UX, TypeScript, Tailwind. Études de cas, projets déployés, approche produit.',
    url: 'https://stephanie-vanoverberghe.dev/',
    ogImage: '/og-cover.webp',
    themeColor: '#FF5A3C',
} as const;
