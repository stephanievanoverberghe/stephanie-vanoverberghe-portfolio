// src/components/RouteTransition.tsx

'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function RouteTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [motionAllowed, setMotionAllowed] = useState(false);

    useEffect(() => {
        const media = window.matchMedia('(prefers-reduced-motion: no-preference)');
        const updateMotion = () => setMotionAllowed(media.matches);

        updateMotion();
        media.addEventListener('change', updateMotion);

        return () => media.removeEventListener('change', updateMotion);
    }, []);

    return (
        <div key={pathname} className={motionAllowed ? 'route-transition-enter' : undefined}>
            {children}
        </div>
    );
}
