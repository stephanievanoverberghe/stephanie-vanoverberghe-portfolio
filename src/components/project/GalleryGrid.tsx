import Image from 'next/image';
import { Maximize2 } from 'lucide-react';

import type { GalleryItem } from './gallery.types';

type Props = {
    className?: string;
    images: GalleryItem[];
    title?: string;
    onOpen: (index: number) => void;
};

export function GalleryGrid({ className, images, title, onOpen }: Props) {
    return (
        <div className={className ?? 'grid gap-5 md:grid-cols-2 lg:grid-cols-3 auto-rows-[220px] md:auto-rows-[240px]'}>
            {images.map((image, index) => {
                const isLarge = index % 5 === 0; // rythme visuel

                return (
                    <figure
                        key={`${image.src}-${index}`}
                        className={`group relative overflow-hidden rounded-[1.8rem] border transition duration-500 
                        hover:-translate-y-1 hover:shadow-[0_25px_70px_rgba(18,19,20,0.14)]
                        ${isLarge ? 'md:col-span-2 md:row-span-2' : ''}`}
                        style={{
                            borderColor: 'var(--border-soft)',
                            background: 'linear-gradient(135deg, color-mix(in oklab, var(--surface-2) 70%, var(--surface-1)), var(--surface-1))',
                        }}
                    >
                        <button
                            onClick={() => onOpen(index)}
                            className="relative block w-full h-full focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2"
                            style={{ outlineColor: 'var(--ring-focus)' }}
                            aria-label={`Ouvrir image ${index + 1}`}
                        >
                            {/* IMAGE */}
                            <Image
                                src={image.src}
                                alt={image.alt ?? title ?? 'Capture'}
                                fill
                                sizes="(max-width: 768px) 100vw, 33vw"
                                className="object-cover transition duration-700 group-hover:scale-[1.05]"
                            />

                            {/* GRAIN TEXTURE */}
                            <div
                                aria-hidden
                                className="absolute inset-0 opacity-[0.06]"
                                style={{
                                    backgroundImage: 'radial-gradient(1px 1px at 24px 24px, var(--text) 12%, transparent 13%)',
                                }}
                            />

                            {/* OVERLAY */}
                            <div
                                className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100"
                                style={{
                                    background: 'linear-gradient(to top, rgba(18,19,20,0.55), transparent 60%)',
                                }}
                            />

                            {/* CONTENT */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                                {image.alt && <p className="text-sm font-medium text-white leading-snug max-w-[90%]">{image.alt}</p>}
                            </div>

                            {/* ICON */}
                            <span
                                className="absolute top-4 right-4 grid h-10 w-10 place-items-center rounded-full border opacity-0 transition duration-500 group-hover:opacity-100 group-hover:scale-100 scale-90"
                                style={{
                                    borderColor: 'color-mix(in oklab, var(--surface-1) 30%, transparent)',
                                    background: 'color-mix(in oklab, var(--ink) 46%, transparent)',
                                    color: 'white',
                                }}
                            >
                                <Maximize2 size={16} />
                            </span>
                        </button>
                    </figure>
                );
            })}
        </div>
    );
}
