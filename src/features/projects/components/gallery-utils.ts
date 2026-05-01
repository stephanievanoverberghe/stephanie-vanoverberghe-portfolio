import type { GalleryItem } from './gallery-types';

export function getGalleryAlt(image: GalleryItem, title?: string, fallback = 'Capture du projet') {
    return image.alt?.trim() || title || fallback;
}

export function getGalleryObjectPosition(image: GalleryItem, fallback = '50% 50%') {
    return image.objectPosition ?? fallback;
}
