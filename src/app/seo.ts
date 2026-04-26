import type { Metadata, Viewport } from 'next';

import { siteMeta, siteProfile } from '@/content/site';

export const metadata: Metadata = {
    metadataBase: new URL(siteMeta.url),
    title: siteMeta.portfolioTitle,
    description: siteMeta.description,
    applicationName: 'Portfolio',
    authors: [{ name: siteProfile.name }],
    keywords: ['Développeuse Front-End', 'React', 'Next.js', 'TypeScript', 'Tailwind', 'UI/UX', 'Portfolio'],
    alternates: { canonical: '/' },
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon.ico',
        apple: '/favicon.ico',
    },
    openGraph: {
        type: 'website',
        title: siteMeta.portfolioTitle,
        description: siteMeta.description,
        url: '/',
        siteName: siteMeta.siteName,
        images: [{ url: siteMeta.ogImage, width: 1200, height: 630, alt: 'Portfolio — couverture' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: siteMeta.portfolioTitle,
        description: siteMeta.description,
        images: [siteMeta.ogImage],
    },
    robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: siteMeta.themeColor };

export function personJsonLd() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: siteProfile.name,
        jobTitle: 'Développeuse Front-End',
        url: siteMeta.url,
        sameAs: [siteProfile.socials.github.href, siteProfile.socials.linkedin.href],
    };
}
