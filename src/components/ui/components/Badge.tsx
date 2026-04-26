import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

type Tone = 'accent' | 'sage' | 'lilac' | 'gold';

const toneMap: Record<Tone, string> = {
    accent: 'border-(--accent)/35 bg-(--accent)/8 text-(--accent)',
    sage: 'border-(--sage)/35 bg-(--sage)/12 text-(--text-strong)',
    lilac: 'border-(--lilac)/40 bg-(--lilac)/20 text-(--text-strong)',
    gold: 'border-(--gold)/40 bg-(--gold)/16 text-(--text-strong)',
};

type BadgeProps = {
    children: ReactNode;
    tone?: Tone;
    className?: string;
};

export function Badge({ children, tone = 'accent', className }: BadgeProps) {
    return <span className={cn('inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-[0.08em]', toneMap[tone], className)}>{children}</span>;
}
