// src/app/seo.ts

import type { Metadata, Viewport } from 'next';

export const SITE = {
    name: 'Vanoverberghe Stéphanie',
    title: 'Vanoverberghe Stéphanie - Développeuse Front-End (React/Next)',
    description: 'Portfolio front-end React / Next.js - UI/UX, TypeScript, Tailwind. Études de cas, projets déployés, approche produit.',
    url: 'https://www.vanoverberghe-stephanie.dev',
    ogImage: '/og-cover.webp',
    themeColor: '#FF5A3C',
    social: {
        github: 'https://github.com/stephanievanoverberghe',
        linkedin: 'https://www.linkedin.com/in/stephanie-vanoverberghe/',
    },
} as const;

export const metadata: Metadata = {
    metadataBase: new URL(SITE.url),
    title: SITE.title,
    description: SITE.description,
    applicationName: 'Portfolio',
    authors: [{ name: SITE.name }],
    keywords: ['Développeuse Front-End', 'React', 'Next.js', 'TypeScript', 'Tailwind', 'UI/UX', 'Portfolio'],
    alternates: { canonical: '/' },
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon.ico',
        apple: '/favicon.ico',
    },
    openGraph: {
        type: 'website',
        title: SITE.title,
        description: SITE.description,
        url: '/',
        siteName: `Portfolio — ${SITE.name}`,
        images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: 'Portfolio — couverture' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: SITE.title,
        description: SITE.description,
        images: [SITE.ogImage],
    },
    robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: SITE.themeColor };

export function personJsonLd() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: SITE.name,
        jobTitle: 'Développeuse Front-End',
        url: SITE.url,
        sameAs: [SITE.social.github, SITE.social.linkedin],
    };
}
