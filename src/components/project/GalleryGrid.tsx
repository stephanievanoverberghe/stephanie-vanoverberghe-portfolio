import Image from 'next/image';

import type { GalleryItem } from './gallery.types';

type Props = {
    className?: string;
    images: GalleryItem[];
    title?: string;
    onOpen: (index: number) => void;
};

export function GalleryGrid({ className, images, title, onOpen }: Props) {
    return (
        <div className={className ?? 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3'}>
            {images.map((g, i) => (
                <figure
                    key={g.src}
                    className="group overflow-hidden rounded-2xl border hover:shadow-[0_14px_40px_rgba(2,8,23,0.10)] transition border-(--border-soft) bg-(--surface-1) shadow-(--shadow-card)"
                >
                    <button
                        type="button"
                        onClick={() => onOpen(i)}
                        className="relative block w-full aspect-4/3 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 outline-(--ring-focus)"
                        style={{ outlineColor: 'var(--ring-focus)' }}
                        aria-label={`Ouvrir l’image ${i + 1} sur ${images.length}`}
                    >
                        <Image
                            src={g.src}
                            alt={g.alt ?? title ?? 'Image'}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        />
                        <span
                            aria-hidden
                            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition"
                            style={{ boxShadow: 'inset 0 -80px 120px rgba(2,8,23,0.18)' }}
                        />
                    </button>

                    {g.alt ? (
                        <figcaption className="px-3 py-2 text-xs opacity-75" style={{ color: 'var(--text)' }}>
                            {g.alt}
                        </figcaption>
                    ) : null}
                </figure>
            ))}
        </div>
    );
}
