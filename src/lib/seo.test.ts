import { describe, expect, it } from 'vitest';

import { siteMeta } from '@/content/site';

import { buildPageMetadata } from './seo';

describe('buildPageMetadata', () => {
    it('uses the default site Open Graph image', () => {
        const metadata = buildPageMetadata({
            title: 'Accueil',
            description: 'Description accueil',
            canonical: '/',
        });

        expect(metadata.title).toBe('Accueil');
        expect(metadata.description).toBe('Description accueil');
        expect(metadata.alternates?.canonical).toBe('/');
        expect(metadata.openGraph?.images).toEqual([{ url: siteMeta.ogImage, width: 1200, height: 630, alt: 'Accueil' }]);
        expect(metadata.twitter?.images).toEqual([siteMeta.ogImage]);
    });

    it('allows overriding the social image per page', () => {
        const metadata = buildPageMetadata({
            title: 'Projet',
            description: 'Description projet',
            canonical: '/projects/demo',
            image: '/custom-og.webp',
        });

        expect(metadata.openGraph?.url).toBe('/projects/demo');
        expect(metadata.openGraph?.images).toEqual([{ url: '/custom-og.webp', width: 1200, height: 630, alt: 'Projet' }]);
        expect(metadata.twitter?.images).toEqual(['/custom-og.webp']);
    });
});
