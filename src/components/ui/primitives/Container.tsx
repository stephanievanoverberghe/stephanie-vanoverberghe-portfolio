import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

type ContainerProps = {
    className?: string;
    children: ReactNode;
    size?: 'md' | 'lg' | 'xl';
};

const sizes = {
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
} as const;

export function Container({ className, children, size = 'xl' }: ContainerProps) {
    return <div className={cn('mx-auto w-full px-4 sm:px-6 md:px-8', sizes[size], className)}>{children}</div>;
}
