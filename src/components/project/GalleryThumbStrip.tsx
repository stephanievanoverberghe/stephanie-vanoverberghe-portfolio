import Image from 'next/image';

import { getGalleryAlt, getGalleryObjectPosition } from './gallery-utils';
import type { GalleryItem } from './gallery-types';

type Props = {
    images: GalleryItem[];
    title?: string;
    activeIndex: number;
    onSelect: (index: number) => void;
};

export function GalleryThumbStrip({ images, title, activeIndex, onSelect }: Props) {
    return (
        <div className="mx-auto flex w-full max-w-4xl gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {images.map((image, index) => {
                const active = index === activeIndex;

                return (
                    <button
                        key={`${image.src}-${index}`}
                        type="button"
                        onClick={() => onSelect(index)}
                        className={`gallery-focus relative h-14 w-20 shrink-0 cursor-pointer overflow-hidden rounded-xl border transition focus-visible:outline-2 focus-visible:outline-offset-2 md:h-16 md:w-24 ${
                            active ? 'gallery-thumb-active' : 'gallery-thumb-inactive'
                        }`}
                        aria-label={`Voir l'image ${index + 1}`}
                        aria-current={active ? 'true' : undefined}
                    >
                        <Image
                            src={image.src}
                            alt={getGalleryAlt(image, title, 'Miniature')}
                            fill
                            sizes="160px"
                            className="object-cover"
                            style={{ objectPosition: getGalleryObjectPosition(image) }}
                        />
                    </button>
                );
            })}
        </div>
    );
}
