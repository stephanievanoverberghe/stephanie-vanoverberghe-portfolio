import Image from 'next/image';
import { Maximize2 } from 'lucide-react';

import { getGalleryAlt, getGalleryObjectPosition } from './gallery.utils';
import type { GalleryItem } from './gallery.types';

type Props = {
    className?: string;
    images: GalleryItem[];
    title?: string;
    onOpen: (index: number) => void;
};

export function GalleryGrid({ className, images, title, onOpen }: Props) {
    return (
        <div className={className ?? 'grid auto-rows-[200px] gap-4 md:auto-rows-[230px] md:grid-cols-2 lg:grid-cols-3'}>
            {images.map((image, index) => {
                const isHeroTile = index % 5 === 0;

                return (
                    <figure
                        key={`${image.src}-${index}`}
                        className={`gallery-frame group relative overflow-hidden rounded-[1.6rem] transition duration-500 hover:-translate-y-1 hover:shadow-[0_25px_70px_rgba(18,19,20,0.14)] ${
                            isHeroTile ? 'md:col-span-2 md:row-span-2' : ''
                        }`}
                    >
                        <button
                            type="button"
                            onClick={() => onOpen(index)}
                            className="gallery-focus relative block h-full w-full focus-visible:outline-2 focus-visible:outline-offset-2"
                            aria-label={`Ouvrir image ${index + 1}`}
                        >
                            <Image
                                src={image.src}
                                alt={getGalleryAlt(image, title)}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                                className="object-cover transition duration-700 group-hover:scale-[1.04]"
                                style={{ objectPosition: getGalleryObjectPosition(image) }}
                            />

                            <div className="gallery-overlay absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100" aria-hidden />

                            <div className="absolute bottom-0 left-0 right-0 translate-y-4 p-4 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                                {image.alt ? <p className="max-w-[90%] text-sm font-medium leading-snug text-white">{image.alt}</p> : null}
                            </div>

                            <span
                                className="gallery-control absolute right-4 top-4 grid h-10 w-10 scale-90 place-items-center rounded-full opacity-0 transition duration-500 group-hover:scale-100 group-hover:opacity-100"
                                aria-hidden
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
