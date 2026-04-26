import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

type BentoGridProps = {
    children: ReactNode;
    className?: string;
};

export function BentoGrid({ children, className }: BentoGridProps) {
    return <div className={cn('grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[180px]', className)}>{children}</div>;
}

type BentoItemProps = {
    children: ReactNode;
    className?: string;
};

export function BentoItem({ children, className }: BentoItemProps) {
    return <article className={cn('rounded-(--radius-card) border border-(--border-soft) bg-(--surface-1) p-5 shadow-(--shadow-card)', className)}>{children}</article>;
}
