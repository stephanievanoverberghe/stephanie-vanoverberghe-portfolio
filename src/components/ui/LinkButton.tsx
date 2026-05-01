import Link from 'next/link';
import type { ReactNode } from 'react';

type LinkButtonProps = {
    href: string;
    children: ReactNode;
    variant?: 'primary' | 'secondary';
    className?: string;
};

const baseClass =
    'inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] transition focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2';

const stylesByVariant = {
    primary: {
        className: 'text-white hover:-translate-y-0.5',
        style: {
            background: 'linear-gradient(135deg, var(--accent), color-mix(in oklab, var(--accent) 78%, var(--ink)))',
            outlineColor: 'var(--ring-focus)',
        },
    },
    secondary: {
        className: 'border text-(--text-strong) hover:-translate-y-0.5',
        style: {
            borderColor: 'color-mix(in oklab, var(--gold) 46%, var(--border-soft))',
            background: 'color-mix(in oklab, var(--gold) 12%, var(--surface-1))',
            outlineColor: 'var(--ring-focus)',
        },
    },
} as const;

export default function LinkButton({ href, children, variant = 'primary', className }: LinkButtonProps) {
    const tone = stylesByVariant[variant];

    return (
        <Link href={href} className={[baseClass, tone.className, className ?? ''].filter(Boolean).join(' ')} style={tone.style}>
            {children}
        </Link>
    );
}
