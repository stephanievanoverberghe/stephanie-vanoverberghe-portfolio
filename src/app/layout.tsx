import type { Metadata, Viewport } from 'next';
import { Suspense } from 'react';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import RouteTransition from '@/components/RouteTransition';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const display = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-display', display: 'swap' });

export const metadata: Metadata = {
    metadataBase: new URL('https://www.vanoverberghe-stephanie.dev'),
    title: 'Vanoverberghe Stéphanie — Développeuse Front-End (React/Next)',
    description: 'Portfolio front-end React / Next.js — créative, dynamique, sensible et professionnelle. Études de cas, UI/UX, TypeScript, Tailwind.',
    keywords: ['Développeuse Front-End', 'React', 'Next.js', 'TypeScript', 'Tailwind', 'UI/UX', 'Portfolio'],
    authors: [{ name: 'Vanoverberghe Stéphanie' }],
    openGraph: {
        type: 'website',
        title: 'Vanoverberghe Stéphanie — Développeuse Front-End',
        description: 'Portfolio front-end React / Next.js — études de cas (Mystères à la carte, Alchimiste Créations, Ancre-toi).',
        url: '/',
        siteName: 'Portfolio — Vanoverberghe Stéphanie',
        images: [{ url: '/og-cover.jpg', width: 1200, height: 630, alt: 'Portfolio — couverture' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Vanoverberghe Stéphanie — Développeuse Front-End',
        description: 'Portfolio front-end React / Next.js — créatif & technique, études de cas, UI/UX.',
        images: ['/og-cover.jpg'],
    },
    robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: '#FF5A3C' }; // --accent

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const ldJson = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Vanoverberghe Stéphanie',
        jobTitle: 'Développeuse Front-End',
        url: 'https://www.vanoverberghe-stephanie.dev',
        sameAs: [] as string[],
    };

    return (
        <html lang="fr" className={`${inter.variable} ${display.variable}`}>
            <body className="bg-[var(--bg)] text-[var(--text)] antialiased">
                <a
                    href="#main"
                    className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[9999] focus:bg-[var(--surface-1)] focus:text-[var(--text-strong)] focus:px-3 focus:py-2 focus:rounded-md focus:shadow-card"
                >
                    Aller au contenu
                </a>

                <Header />

                {/* Suspense global + transitions inter-pages */}
                <Suspense fallback={<AppFallback />}>
                    <RouteTransition>
                        <main id="main" className="min-h-dvh">
                            {children}
                        </main>
                    </RouteTransition>
                </Suspense>

                <Footer />

                {/* JSON-LD SEO */}
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }} />
            </body>
        </html>
    );
}

/** Fallback global — squelettes doux, tokens (pas de noir/blanc purs) */
function AppFallback() {
    return (
        <div className="container-page py-10 animate-pulse">
            <div className="h-7 w-2/3 rounded-md" style={{ background: 'var(--surface-2)' }} />
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="rounded-2xl border" style={{ borderColor: 'var(--border-soft)', background: 'var(--surface-1)' }}>
                        <div className="h-40 rounded-2xl" style={{ background: 'var(--surface-2)' }} />
                        <div className="p-4 space-y-3">
                            <div className="h-4 w-2/3 rounded" style={{ background: 'var(--surface-2)' }} />
                            <div className="h-4 w-1/3 rounded" style={{ background: 'var(--surface-2)' }} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
