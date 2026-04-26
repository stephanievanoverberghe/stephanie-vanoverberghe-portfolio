// src/app/contact/page.tsx

import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import ContactForm from '@/components/contact/ContactForm';
import ContactAside from '@/components/contact/ContactAside';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
    title: 'Contact — Vanoverberghe Stéphanie',
    description: 'Contactez Vanoverberghe Stéphanie, développeuse front-end React / Next.js, pour discuter de votre projet ou d’une opportunité.',
    canonical: '/contact',
});

function Kicker({ children }: { children: ReactNode }) {
    return <span className="text-xs uppercase tracking-[0.14em] text-(--accent)">{children}</span>;
}

export default function ContactPage() {
    return (
        <section className="container-page py-12 space-y-8">
            {/* HERO */}
            <header className="relative overflow-hidden rounded-2xl border p-6 sm:p-10 bg-(--surface-1) border-(--border-soft) shadow-card">
                <div className="relative space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                        <Kicker>Contact</Kicker>
                        <span className="inline-flex items-center gap-2 text-xs font-semibold opacity-80">
                            <Sparkles size={14} aria-hidden />
                            Réponse sous 24–48h
                        </span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-(--text-strong)">Me contacter</h1>

                    <p className="opacity-85 max-w-[75ch]">Un projet, une opportunité, une question ? Laisse-moi un message — je reviens vers toi rapidement.</p>

                    <div className="pt-2">
                        <div className="hr-soft" />
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <Link href="/projects" className="btn btn-secondary">
                            Voir mes projets
                        </Link>
                        <Link href="/skills" className="btn btn-ghost">
                            Compétences
                        </Link>
                        <a href="/cv-vanoverberghe-stephanie.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                            Télécharger mon CV
                        </a>
                    </div>
                </div>
            </header>

            {/* CONTENT */}
            <div className="grid gap-6 md:grid-cols-[1.2fr_.8fr] items-start">
                <ContactForm />
                <ContactAside />
            </div>
        </section>
    );
}
