import type { Metadata, Viewport } from 'next';
import { Suspense } from 'react';
import Script from 'next/script';

import './globals.css';

import Header from '@/components/layout/header/Header';
import Footer from '@/components/layout/footer/Footer';
import RouteTransition from '@/components/RouteTransition';

import AppFallback from './AppFallback';
import { metadata as siteMetadata, viewport as siteViewport, personJsonLd } from './seo';

export const metadata: Metadata = siteMetadata;
export const viewport: Viewport = siteViewport;

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fr">
            <body id="top" className="bg-(--bg) text-(--text) antialiased">
                <a
                    href="#main"
                    className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-9999 focus:bg-(--surface-1) focus:text-(--text-strong) focus:px-3 focus:py-2 focus:rounded-md focus:shadow-card"
                >
                    Aller au contenu
                </a>

                <Header />

                <Suspense fallback={<AppFallback />}>
                    <RouteTransition>
                        <main id="main" className="min-h-dvh">
                            {children}
                        </main>
                    </RouteTransition>
                </Suspense>

                <Footer />

                {/* JSON-LD SEO */}
                <Script id="person-jsonld" type="application/ld+json">
                    {JSON.stringify(personJsonLd())}
                </Script>
            </body>
        </html>
    );
}
