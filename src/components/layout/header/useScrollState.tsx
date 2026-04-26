// src/components/layout/header/useScrollState.ts

'use client';

import { useEffect, useState } from 'react';

export function useScrollState(offset = 8) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > offset);
        };

        onScroll();

        window.addEventListener('scroll', onScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [offset]);

    return scrolled;
}
