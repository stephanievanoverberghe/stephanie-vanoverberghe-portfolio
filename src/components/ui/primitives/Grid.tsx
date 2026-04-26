import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

type GridColumns = 1 | 2 | 3 | 4;

const columns: Record<GridColumns, string> = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4',
};

type GridProps = {
    cols?: GridColumns;
    gap?: 'sm' | 'md' | 'lg';
    className?: string;
    children: ReactNode;
};

export function Grid({ cols = 2, gap = 'md', className, children }: GridProps) {
    const gapClass = gap === 'sm' ? 'gap-3' : gap === 'lg' ? 'gap-8' : 'gap-5';
    return <div className={cn('grid', columns[cols], gapClass, className)}>{children}</div>;
}
