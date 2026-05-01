'use client';

import * as React from 'react';
import Image from 'next/image';
import { ArrowUpRight, Images } from 'lucide-react';

import Button from '@/components/ui/Button';
import GalleryLightbox, { type GalleryItem } from '@/components/project/GalleryLightbox';
import { getGalleryAlt, getGalleryObjectPosition } from '@/components/project/gallery.utils';

type Props = {
    images: GalleryItem[];
    title?: string;
};

export default function GalleryPreview({ images, title }: Props) {
    const [open, setOpen] = React.useState(false);
    const [startIndex, setStartIndex] = React.useState(0);

    if (!images.length) return null;

    const [hero, ...rest] = images;
    const previews = rest.slice(0, 4);
    const hiddenCount = Math.max(images.length - 5, 0);

    const openAt = (index: number) => {
        setStartIndex(index);
        setOpen(true);
    };

    return (
        <section className="gallery-surface relative overflow-hidden rounded-[2.25rem] p-5 sm:p-6 lg:p-8">
            <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-(--lilac)/30 blur-3xl" />
            <div aria-hidden className="absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-(--sage)/20 blur-3xl" />

            <div className="relative mb-6 flex flex-wrap items-end justify-between gap-4">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.28em] text-(--gold)">Galerie</p>
                    <h2 className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-(--text-strong)">Captures & détails d&apos;interface.</h2>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-(--text)">
                        Une lecture visuelle du projet : écrans clés, rythme, hiérarchie, composants et choix de mise en page.
                    </p>
                </div>

                <Button type="button" variant="secondary" size="sm" className="cursor-pointer" onClick={() => openAt(0)} aria-label="Ouvrir toute la galerie">
                    <Images size={15} />
                    Ouvrir la galerie
                </Button>
            </div>

            <div className="relative grid gap-4 lg:h-[min(72vh,720px)] lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)] lg:gap-5">
                <button
                    type="button"
                    onClick={() => openAt(0)}
                    className="gallery-focus group relative h-full cursor-pointer overflow-hidden rounded-4xl border bg-(--paper) text-left shadow-(--shadow-card) transition duration-500 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(18,19,20,0.14)] focus-visible:outline-2 focus-visible:outline-offset-2"
                    aria-label="Ouvrir la capture principale"
                >
                    <div className="relative h-full min-h-70 sm:min-h-95 lg:min-h-0">
                        <Image
                            src={hero.src}
                            alt={getGalleryAlt(hero, title, 'Capture principale')}
                            fill
                            sizes="(max-width:640px) 100vw, (max-width:1024px) 92vw, 68vw"
                            className="object-cover transition duration-700 group-hover:scale-[1.03]"
                            style={{ objectPosition: getGalleryObjectPosition(hero, '50% 14%') }}
                            priority={false}
                        />

                        <div aria-hidden className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'radial-gradient(1px 1px at 24px 24px, var(--paper) 12%, transparent 13%)' }} />
                        <div aria-hidden className="gallery-overlay-strong absolute inset-0" />

                        <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-5">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/75">Capture principale</p>
                                <p className="mt-2 max-w-xl text-lg font-semibold leading-snug text-white">{getGalleryAlt(hero, title, 'Aperçu du projet')}</p>
                            </div>

                            <span aria-hidden className="gallery-control grid h-12 w-12 shrink-0 place-items-center rounded-full transition group-hover:-translate-y-1 group-hover:translate-x-1">
                                <ArrowUpRight size={20} />
                            </span>
                        </div>
                    </div>
                </button>

                <div className="grid gap-4 sm:grid-cols-2 lg:h-full lg:grid-cols-1" style={previews.length ? { gridTemplateRows: `repeat(${previews.length}, minmax(0, 1fr))` } : undefined}>
                    {previews.map((image, index) => {
                        const realIndex = index + 1;
                        const isLast = index === previews.length - 1 && hiddenCount > 0;

                        return (
                            <button
                                key={`${image.src}-${realIndex}`}
                                type="button"
                                onClick={() => openAt(realIndex)}
                                className="gallery-focus group relative h-full cursor-pointer overflow-hidden rounded-[1.4rem] border bg-(--paper) shadow-(--shadow-card) transition duration-500 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(18,19,20,0.12)] focus-visible:outline-2 focus-visible:outline-offset-2"
                                aria-label={`Ouvrir la capture ${realIndex + 1}`}
                            >
                                <div className="relative h-full min-h-31 sm:min-h-45 lg:min-h-0">
                                    <Image
                                        src={image.src}
                                        alt={getGalleryAlt(image, title)}
                                        fill
                                        sizes="(max-width:640px) 50vw, (max-width:1024px) 45vw, 30vw"
                                        className="object-cover transition duration-700 group-hover:scale-[1.04]"
                                        style={{ objectPosition: getGalleryObjectPosition(image) }}
                                    />

                                    <div
                                        aria-hidden
                                        className={`absolute inset-0 ${isLast ? 'bg-(--ink)/60' : 'gallery-overlay-soft'}`}
                                    />

                                    <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-3">
                                        <p className="line-clamp-2 text-left text-xs font-semibold leading-5 text-white">
                                            {isLast ? `+${hiddenCount} captures` : getGalleryAlt(image, title, `Capture ${realIndex + 1}`)}
                                        </p>

                                        <span aria-hidden className="gallery-control grid h-8 w-8 shrink-0 place-items-center rounded-full opacity-0 transition group-hover:opacity-100">
                                            <ArrowUpRight size={15} />
                                        </span>
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            <GalleryLightbox images={images} title={title} open={open} startIndex={startIndex} onClose={() => setOpen(false)} className="hidden" />
        </section>
    );
}
