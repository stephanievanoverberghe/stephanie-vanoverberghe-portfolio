'use client';

import * as React from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

import { cn } from '@/lib/cn';
import { GalleryGrid } from './GalleryGrid';
import { GalleryThumbStrip } from './GalleryThumbStrip';
import type { GalleryItem } from './gallery.types';

export type { GalleryItem } from './gallery.types';

type Props = {
    images: GalleryItem[];
    title?: string;
    className?: string;
    open?: boolean;
    startIndex?: number;
    onClose?: () => void;
};

export default function GalleryLightbox({ images, title, className, open, startIndex = 0, onClose }: Props) {
    const isControlled = typeof open === 'boolean';
    const [internalOpen, setInternalOpen] = React.useState(false);
    const [internalIndex, setInternalIndex] = React.useState<number | null>(null);
    const isOpen = isControlled ? !!open : internalOpen;
    const [controlledIndex, setControlledIndex] = React.useState(startIndex);

    React.useEffect(() => {
        if (!isControlled || !open) return;
        setControlledIndex(startIndex);
    }, [isControlled, open, startIndex]);

    const openIndex = isControlled ? (isOpen ? controlledIndex : null) : internalIndex;

    const close = React.useCallback(() => {
        if (isControlled) onClose?.();
        else {
            setInternalOpen(false);
            setInternalIndex(null);
        }
    }, [isControlled, onClose]);

    const prev = React.useCallback(() => {
        if (openIndex === null) return;
        const nextIdx = (openIndex - 1 + images.length) % images.length;
        if (isControlled) setControlledIndex(nextIdx);
        else setInternalIndex(nextIdx);
    }, [openIndex, images.length, isControlled]);

    const next = React.useCallback(() => {
        if (openIndex === null) return;
        const nextIdx = (openIndex + 1) % images.length;
        if (isControlled) setControlledIndex(nextIdx);
        else setInternalIndex(nextIdx);
    }, [openIndex, images.length, isControlled]);

    React.useEffect(() => {
        if (!isOpen) return;

        const prevOverflow = document.documentElement.style.overflow;
        document.documentElement.style.overflow = 'hidden';

        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') close();
            if (e.key === 'ArrowLeft') prev();
            if (e.key === 'ArrowRight') next();
        };

        window.addEventListener('keydown', onKey);
        return () => {
            document.documentElement.style.overflow = prevOverflow;
            window.removeEventListener('keydown', onKey);
        };
    }, [isOpen, close, prev, next]);

    const current = openIndex !== null ? images[openIndex] : null;
    const idx = openIndex ?? 0;

    const ctrlCls =
        'inline-flex items-center justify-center rounded-full border transition ' +
        'focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 ' +
        'hover:scale-[1.04] active:scale-[0.98]';

    const ctrlStyle: React.CSSProperties = {
        outlineColor: 'var(--ring-focus)',
        borderColor: 'color-mix(in oklab, var(--surface-1) 40%, transparent)',
        color: 'var(--surface-1)',
        background: 'color-mix(in oklab, var(--ink) 42%, transparent)',
        boxShadow: '0 10px 30px rgba(2,8,23,0.35)',
    };

    return (
        <>
            <GalleryGrid
                className={className}
                images={images}
                title={title}
                onOpen={(i) => {
                    if (isControlled) setControlledIndex(i);
                    else {
                        setInternalIndex(i);
                        setInternalOpen(true);
                    }
                }}
            />

            {isOpen && current ? (
                <div role="dialog" aria-modal="true" aria-label="Visionneuse" className="fixed inset-0 z-999">
                    <button
                        type="button"
                        aria-label="Fermer"
                        onClick={close}
                        className="absolute inset-0"
                        style={{ background: 'color-mix(in oklab, var(--ink) 74%, transparent)' }}
                    />
                    <div className="absolute inset-0 backdrop-blur-[10px]" />

                    <div className="relative mx-auto flex h-full max-w-6xl flex-col px-3 py-4 md:px-6 md:py-6">
                        <div className="flex items-center justify-between gap-3">
                            <div
                                className="text-xs md:text-sm opacity-85 px-3 py-1 rounded-full border"
                                style={{
                                    color: 'var(--surface-1)',
                                    borderColor: 'color-mix(in oklab, var(--surface-1) 28%, transparent)',
                                    background: 'color-mix(in oklab, var(--ink) 40%, transparent)',
                                }}
                            >
                                {idx + 1} / {images.length}
                            </div>

                            <button type="button" onClick={close} className={cn(ctrlCls, 'h-10 w-10 md:h-12 md:w-12 cursor-pointer')} style={ctrlStyle} aria-label="Fermer">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="relative mt-3 flex-1">
                            <div
                                className="absolute inset-0 rounded-2xl border overflow-hidden"
                                style={{
                                    borderColor: 'color-mix(in oklab, var(--surface-1) 24%, transparent)',
                                    background: 'color-mix(in oklab, var(--ink) 18%, transparent)',
                                    boxShadow: '0 30px 90px rgba(2,8,23,0.45)',
                                }}
                            />
                            <div className="relative h-full rounded-2xl overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center p-3 md:p-6">
                                    <div
                                        className="relative w-full h-full rounded-xl overflow-hidden"
                                        style={{ background: 'color-mix(in oklab, var(--surface-1) 70%, transparent)' }}
                                    >
                                        <Image key={current.src} src={current.src} alt={current.alt ?? title ?? 'Image'} fill sizes="100vw" className="object-cover" priority />
                                    </div>
                                </div>

                                <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2 md:px-4">
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            prev();
                                        }}
                                        className={cn(ctrlCls, 'h-10 w-10 md:h-12 md:w-12 cursor-pointer')}
                                        style={ctrlStyle}
                                        aria-label="Précédent"
                                    >
                                        <ChevronLeft className="h-5 w-5" />
                                    </button>

                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            next();
                                        }}
                                        className={cn(ctrlCls, 'h-10 w-10 md:h-12 md:w-12 cursor-pointer')}
                                        style={ctrlStyle}
                                        aria-label="Suivant"
                                    >
                                        <ChevronRight className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="mt-3 space-y-3">
                            {current.alt ? (
                                <div className="text-center text-sm opacity-90" style={{ color: 'var(--surface-1)' }}>
                                    {current.alt}
                                </div>
                            ) : null}

                            <GalleryThumbStrip
                                images={images}
                                title={title}
                                activeIndex={idx}
                                onSelect={(i) => {
                                    if (isControlled) setControlledIndex(i);
                                    else setInternalIndex(i);
                                }}
                            />
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
}
