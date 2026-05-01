import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

type HeroTitleProps = {
    children: ReactNode;
    className?: string;
};

export default function HeroTitle({ children, className }: HeroTitleProps) {
    return <h1 className={cn('hero-title mt-5 max-w-3xl text-(--text-strong)', className)}>{children}</h1>;
}
