import type { Metadata } from 'next';

const DEFAULT_OG_IMAGE = '/og-cover.webp';
const SITE_NAME = 'Portfolio — Vanoverberghe Stéphanie';

type PageMetadataArgs = {
    title: string;
    description: string;
    canonical: `/${string}` | '/';
    image?: string;
};

export function buildPageMetadata({ title, description, canonical, image = DEFAULT_OG_IMAGE }: PageMetadataArgs): Metadata {
    return {
        title,
        description,
        alternates: { canonical },
        openGraph: {
            type: 'website',
            title,
            description,
            url: canonical,
            siteName: SITE_NAME,
            images: [{ url: image, width: 1200, height: 630, alt: title }],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [image],
        },
    };
}
