import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

const variants = {
    body: 'text-[length:var(--text-body-size)] leading-[var(--text-body-leading)] tracking-[var(--text-body-tracking)] text-(--text)',
    muted: 'text-[length:var(--text-muted-size)] leading-[var(--text-muted-leading)] tracking-[var(--text-muted-tracking)] text-(--text-muted)',
    small: 'text-[length:var(--text-small-size)] leading-[var(--text-small-leading)] tracking-[var(--text-small-tracking)] text-(--text-muted)',
} as const;

type TextProps = {
    as?: 'p' | 'span' | 'div';
    variant?: keyof typeof variants;
    className?: string;
    children: ReactNode;
};

export function Text({ as: Component = 'p', variant = 'body', className, children }: TextProps) {
    return <Component className={cn(variants[variant], className)}>{children}</Component>;
}
