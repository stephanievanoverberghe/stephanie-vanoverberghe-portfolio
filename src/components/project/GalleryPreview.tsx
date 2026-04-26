// src/components/project/GalleryPreview.tsx
'use client';

import * as React from 'react';
import Image from 'next/image';
import GalleryLightbox, { type GalleryItem } from '@/components/project/GalleryLightbox';

type Props = {
    images: GalleryItem[];
    title?: string;
};

export default function GalleryPreview({ images, title }: Props) {
    const [open, setOpen] = React.useState(false);
    const [startIndex, setStartIndex] = React.useState(0);

    const count = images.length;
    if (!count) return null;

    const hero = images[0];
    const s1 = images[1];
    const s2 = images[2];

    const openAt = (i: number) => {
        setStartIndex(i);
        setOpen(true);
    };

    return (
        <section className="space-y-4">
            <div className="flex items-end justify-between gap-4">
                <div>
                    <h3 className="text-base font-semibold text-(--text-strong)">Galerie</h3>
                    <p className="mt-1 text-sm text-(--text)">
                        {count} capture{count > 1 ? 's' : ''}
                    </p>
                </div>

                <button type="button" className="btn btn-secondary cursor-pointer" onClick={() => openAt(0)}>
                    Voir la galerie
                </button>
            </div>

            <div className="grid gap-4 lg:grid-cols-[1.4fr_.6fr]">
                <button
                    type="button"
                    onClick={() => openAt(0)}
                    className="group relative overflow-hidden rounded-2xl border text-left focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer border-(--border-soft) bg-(--surface-1) shadow-(--shadow-card)"
                    style={{ outlineColor: 'var(--ring-focus)' }}
                    aria-label="Ouvrir la galerie"
                >
                    <div className="relative aspect-video">
                        <Image
                            src={hero.src}
                            alt={hero.alt ?? title ?? 'Capture'}
                            fill
                            sizes="(max-width:1024px) 100vw, 70vw"
                            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                            style={{ objectPosition: '50% 12%' }}
                        />
                        <span aria-hidden className="pointer-events-none absolute inset-0" style={{ boxShadow: 'inset 0 -120px 180px rgba(2,8,23,0.18)' }} />
                    </div>
                </button>

                <div className="grid gap-4">
                    {s1 ? (
                        <button
                            type="button"
                            onClick={() => openAt(1)}
                            className="group relative overflow-hidden rounded-2xl border focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer border-(--border-soft) bg-(--surface-1) shadow-(--shadow-card)"
                            style={{ outlineColor: 'var(--ring-focus)' }}
                            aria-label="Ouvrir la galerie"
                        >
                            <div className="relative aspect-16/10">
                                <Image
                                    src={s1.src}
                                    alt={s1.alt ?? title ?? 'Capture'}
                                    fill
                                    sizes="(max-width:1024px) 100vw, 30vw"
                                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                                />
                                <span aria-hidden className="pointer-events-none absolute inset-0" style={{ boxShadow: 'inset 0 -120px 180px rgba(2,8,23,0.18)' }} />
                            </div>
                        </button>
                    ) : null}

                    {s2 ? (
                        <button
                            type="button"
                            onClick={() => openAt(2)}
                            className="group relative overflow-hidden rounded-2xl border focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer border-(--border-soft) bg-(--surface-1) shadow-(--shadow-card)"
                            style={{
                                outlineColor: 'var(--ring-focus)',
                            }}
                            aria-label="Ouvrir la galerie"
                        >
                            <div className="relative aspect-16/10">
                                <Image
                                    src={s2.src}
                                    alt={s2.alt ?? title ?? 'Capture'}
                                    fill
                                    sizes="(max-width:1024px) 100vw, 30vw"
                                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                                />
                                <span aria-hidden className="pointer-events-none absolute inset-0" style={{ boxShadow: 'inset 0 -120px 180px rgba(2,8,23,0.18)' }} />
                            </div>

                            {count > 3 ? (
                                <div
                                    aria-hidden
                                    className="absolute inset-0 flex items-center justify-center text-(--surface-1)"
                                    style={{ background: 'color-mix(in oklab, var(--ink) 48%, transparent)' }}
                                >
                                    <div
                                        className="rounded-full border px-4 py-2 text-sm font-semibold"
                                        style={{
                                            borderColor: 'color-mix(in oklab, var(--surface-1) 26%, transparent)',
                                            background: 'color-mix(in oklab, var(--ink) 28%, transparent)',
                                        }}
                                    >
                                        +{count - 3}
                                    </div>
                                </div>
                            ) : null}
                        </button>
                    ) : null}
                </div>
            </div>

            <GalleryLightbox images={images} title={title} open={open} startIndex={startIndex} onClose={() => setOpen(false)} className="hidden" />
        </section>
    );
}
