'use client';

import * as React from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export type GalleryItem = { src: string; alt?: string };

type Props = {
    images: GalleryItem[];
    title?: string;
    className?: string;
};

export default function GalleryLightbox({ images, title, className }: Props) {
    const [openIndex, setOpenIndex] = React.useState<number | null>(null);
    const isOpen = openIndex !== null;

    const close = React.useCallback(() => setOpenIndex(null), []);
    const prev = React.useCallback(() => {
        if (openIndex === null) return;
        setOpenIndex((idx) => (idx! - 1 + images.length) % images.length);
    }, [openIndex, images.length]);
    const next = React.useCallback(() => {
        if (openIndex === null) return;
        setOpenIndex((idx) => (idx! + 1) % images.length);
    }, [openIndex, images.length]);

    React.useEffect(() => {
        if (!isOpen) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') close();
            if (e.key === 'ArrowLeft') prev();
            if (e.key === 'ArrowRight') next();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [isOpen, close, prev, next]);

    // style commun flèches + fermer
    const ctrlBaseCls =
        'inline-flex items-center justify-center rounded-full border transition ' +
        'focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 ' +
        'hover:scale-[1.04] active:scale-[0.98] cursor-pointer';
    const ctrlBaseStyle: React.CSSProperties = {
        outlineColor: 'var(--ring-focus)',
        borderColor: 'color-mix(in oklab, var(--surface-1) 45%, transparent)',
        color: 'var(--surface-1)',
        background: 'color-mix(in oklab, var(--ink) 38%, transparent)',
        boxShadow: '0 6px 24px rgba(2,8,23,0.28)',
    };

    return (
        <>
            {/* Grille des vignettes */}
            <div className={className ?? 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3'}>
                {images.map((g, i) => (
                    <figure key={g.src} className="overflow-hidden rounded-xl border hover-scale" style={{ borderColor: 'var(--border-soft)', background: 'var(--surface-1)' }}>
                        <button
                            type="button"
                            onClick={() => setOpenIndex(i)}
                            className="relative block aspect-[4/3] w-full focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2"
                            style={{ outlineColor: 'var(--ring-focus)' }}
                            aria-label={`Agrandir l’image ${i + 1} sur ${images.length}`}
                        >
                            <Image
                                src={g.src}
                                alt={g.alt ?? title ?? 'Image de la galerie'}
                                fill
                                sizes="(max-width: 768px) 100vw, 33vw"
                                className="object-cover"
                                priority={false}
                            />
                        </button>
                        {g.alt ? (
                            <figcaption className="p-2 text-xs opacity-70" style={{ color: 'var(--text)' }}>
                                {g.alt}
                            </figcaption>
                        ) : null}
                    </figure>
                ))}
            </div>

            {/* Lightbox */}
            {isOpen && (
                <div role="dialog" aria-modal="true" aria-label="Visionneuse d’images" className="fixed inset-0 z-[999] flex flex-col">
                    {/* Backdrop cliquable MAIS sans cursor pointer */}
                    <button
                        type="button"
                        aria-label="Fermer"
                        onClick={close}
                        className="absolute inset-0"
                        style={{
                            background: 'color-mix(in oklab, var(--ink) 72%, transparent)',
                            cursor: 'default',
                        }}
                    />

                    {/* Barre d’actions (pas de cursor pointer ici non plus) */}
                    <div className="pointer-events-none flex items-center justify-between p-3 md:p-4" style={{ color: 'var(--surface-1)' }}>
                        <span className="pointer-events-auto text-xs md:text-sm opacity-85 bg-[color:var(--ink)]/40 px-2 py-1 rounded">
                            {openIndex! + 1} / {images.length}
                        </span>

                        {/* Bouton Fermer — même design que les flèches + pointer uniquement ici */}
                        <button
                            onClick={close}
                            className={`${ctrlBaseCls} pointer-events-auto h-10 w-10 md:h-12 md:w-12`}
                            style={ctrlBaseStyle}
                            aria-label="Fermer la visionneuse"
                            title="Fermer"
                        >
                            <X />
                        </button>
                    </div>

                    {/* Zone image + contrôles */}
                    <div className="relative flex-1">
                        {/* Image */}
                        <div className="absolute inset-0 flex items-center justify-center p-3 md:p-6">
                            <div
                                className="relative w-full max-w-5xl aspect-[16/9] rounded-xl overflow-hidden"
                                style={{ background: 'var(--surface-1)', boxShadow: 'var(--shadow-card)' }}
                            >
                                <Image
                                    key={images[openIndex!].src}
                                    src={images[openIndex!].src}
                                    alt={images[openIndex!].alt ?? title ?? 'Image'}
                                    fill
                                    sizes="100vw"
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        </div>

                        {/* Flèches (même style que Fermer) */}
                        <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2 md:px-4">
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    prev();
                                }}
                                aria-label="Image précédente"
                                className={`${ctrlBaseCls} h-10 w-10 md:h-12 md:w-12`}
                                style={ctrlBaseStyle}
                                title="Précédent"
                            >
                                <ChevronLeft />
                            </button>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    next();
                                }}
                                aria-label="Image suivante"
                                className={`${ctrlBaseCls} h-10 w-10 md:h-12 md:w-12`}
                                style={ctrlBaseStyle}
                                title="Suivant"
                            >
                                <ChevronRight />
                            </button>
                        </div>
                    </div>

                    {/* Légende */}
                    {images[openIndex!].alt ? (
                        <div className="px-4 pb-4 text-center text-sm" style={{ color: 'var(--surface-1)' }}>
                            {images[openIndex!].alt}
                        </div>
                    ) : null}
                </div>
            )}
        </>
    );
}
