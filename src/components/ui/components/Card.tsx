import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

type CardProps = {
    children: ReactNode;
    className?: string;
    hoverable?: boolean;
};

export function Card({ children, className, hoverable = false }: CardProps) {
    return (
        <article
            className={cn(
                'rounded-(--radius-card) border border-(--border-soft) bg-(--surface-1) p-6 shadow-(--shadow-card)',
                hoverable && 'transition hover:-translate-y-0.5 hover:shadow-(--shadow-elevated)',
                className,
            )}
        >
            {children}
        </article>
    );
}
