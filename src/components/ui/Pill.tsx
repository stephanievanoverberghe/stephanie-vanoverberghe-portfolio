import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

type PillTone = 'soft' | 'accent';

type PillProps = {
    children: ReactNode;
    tone?: PillTone;
    className?: string;
};

const toneClasses: Record<PillTone, string> = {
    soft: 'pill pill-soft',
    accent: 'pill pill-accent',
};

export default function Pill({ children, tone = 'soft', className }: PillProps) {
    return <span className={cn(toneClasses[tone], className)}>{children}</span>;
}
