import Image from 'next/image';

import type { GalleryItem } from './gallery.types';

type Props = {
    images: GalleryItem[];
    title?: string;
    activeIndex: number;
    onSelect: (index: number) => void;
};

export function GalleryThumbStrip({ images, title, activeIndex, onSelect }: Props) {
    return (
        <div className="mx-auto flex max-w-4xl gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {images.map((image, index) => {
                const active = index === activeIndex;

                return (
                    <button
                        key={`${image.src}-${index}`}
                        type="button"
                        onClick={() => onSelect(index)}
                        className="relative h-14 w-20 shrink-0 cursor-pointer overflow-hidden rounded-xl border transition md:h-16 md:w-24"
                        style={{
                            borderColor: active ? 'color-mix(in oklab, var(--accent) 58%, var(--surface-1))' : 'color-mix(in oklab, var(--surface-1) 22%, transparent)',
                            boxShadow: active ? '0 10px 28px rgba(2,8,23,0.35)' : undefined,
                        }}
                        aria-label={`Voir l’image ${index + 1}`}
                        aria-current={active ? 'true' : undefined}
                    >
                        <Image src={image.src} alt={image.alt ?? title ?? 'Miniature'} fill sizes="160px" className="object-cover" />

                        <span
                            aria-hidden
                            className="absolute inset-0"
                            style={{
                                boxShadow: active ? 'inset 0 0 0 2px color-mix(in oklab, var(--accent) 65%, transparent)' : 'inset 0 0 0 1px rgba(255,255,255,0.08)',
                            }}
                        />
                    </button>
                );
            })}
        </div>
    );
}
