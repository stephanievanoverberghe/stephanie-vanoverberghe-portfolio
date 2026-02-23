// src/components/layout/header/useScrollState.ts

'use client';

import { useEffect, useState } from 'react';

/**
 * Hook UI pour piloter les variations du header selon le scroll.
 *
 * Le listener est passif pour ne pas bloquer le thread principal pendant
 * le défilement, point sensible pour la fluidité perçue sur mobile.
 */
export function useScrollState(offset = 8) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > offset);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [offset]);

    return scrolled;
}
