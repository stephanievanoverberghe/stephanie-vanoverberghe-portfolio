import type { Metadata } from 'next';
import { siteMeta } from '@/content/site';

const DEFAULT_OG_IMAGE = siteMeta.ogImage;

type PageMetadataArgs = {
    title: string;
    description: string;
    canonical: `/${string}` | '/';
    image?: string;
};

/**
 * Construit des metadata cohérentes pour les pages statiques du portfolio.
 *
 * Cette fonction évite la duplication des blocs Open Graph / Twitter
 * et garantit une base homogène pour le SEO du site.
 */
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
            siteName: siteMeta.siteName,
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
