import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

const stackGap = {
    xs: 'gap-2',
    sm: 'gap-3',
    md: 'gap-5',
    lg: 'gap-8',
    xl: 'gap-12',
} as const;

type StackProps = {
    as?: 'div' | 'section' | 'article' | 'header' | 'footer';
    gap?: keyof typeof stackGap;
    className?: string;
    children: ReactNode;
};

export function Stack({ as: Component = 'div', gap = 'md', className, children }: StackProps) {
    return <Component className={cn('flex flex-col', stackGap[gap], className)}>{children}</Component>;
}
