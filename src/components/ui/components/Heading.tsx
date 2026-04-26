import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

const variants = {
    display: 'text-[length:var(--heading-display-size)] leading-[var(--heading-display-leading)] tracking-[var(--heading-display-tracking)]',
    h1: 'text-[length:var(--heading-h1-size)] leading-[var(--heading-h1-leading)] tracking-[var(--heading-h1-tracking)]',
    h2: 'text-[length:var(--heading-h2-size)] leading-[var(--heading-h2-leading)] tracking-[var(--heading-h2-tracking)]',
    h3: 'text-[length:var(--heading-h3-size)] leading-[var(--heading-h3-leading)] tracking-[var(--heading-h3-tracking)]',
} as const;

type HeadingProps = {
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p';
    variant?: keyof typeof variants;
    className?: string;
    children: ReactNode;
};

export function Heading({ as: Component = 'h2', variant = 'h2', className, children }: HeadingProps) {
    return <Component className={cn('font-semibold text-(--text-strong)', variants[variant], className)}>{children}</Component>;
}
