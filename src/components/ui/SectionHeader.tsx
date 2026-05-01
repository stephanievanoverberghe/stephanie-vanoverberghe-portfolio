import type { ReactNode } from 'react';

type SectionHeaderProps = {
    kicker: string;
    title: ReactNode;
    intro?: string;
    align?: 'left' | 'center';
    className?: string;
};

export default function SectionHeader({ kicker, title, intro, align = 'left', className }: SectionHeaderProps) {
    const alignment = align === 'center' ? 'text-center mx-auto' : '';

    return (
        <div className={[align === 'center' ? 'max-w-3xl' : 'max-w-2xl', alignment, className ?? ''].filter(Boolean).join(' ')}>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-(--accent)">{kicker}</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-(--text-strong) sm:text-4xl">{title}</h2>
            {intro ? <p className="mt-3 text-sm leading-6 text-(--text)">{intro}</p> : null}
        </div>
    );
}
