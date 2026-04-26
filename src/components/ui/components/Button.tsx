import type { ButtonHTMLAttributes, ReactNode } from 'react';
import Link, { type LinkProps } from 'next/link';

import { cn } from '@/lib/cn';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

type BaseProps = {
    children: ReactNode;
    className?: string;
    variant?: ButtonVariant;
};

type LinkButtonProps = BaseProps &
    Omit<LinkProps, 'href'> & {
        href: string;
        target?: string;
        rel?: string;
        ariaLabel?: string;
    };

type NativeButtonProps = BaseProps &
    ButtonHTMLAttributes<HTMLButtonElement> & {
        href?: undefined;
    };

type ButtonProps = LinkButtonProps | NativeButtonProps;

const variants: Record<ButtonVariant, string> = {
    primary: 'border-transparent bg-(--accent) text-white hover:opacity-95 active:translate-y-px',
    secondary: 'border-(--border-soft) bg-(--surface-1) text-(--text-strong) hover:bg-black/2',
    ghost: 'border-(--border-soft) bg-transparent text-(--text-strong) hover:border-(--accent)',
};

const base = 'inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition duration-200 ease-[var(--ease-standard)] focusable';

export function Button(props: ButtonProps) {
    const { className, variant = 'primary', children } = props;

    if (typeof props.href === 'string') {
        const { href, target, rel, ariaLabel, ...rest } = props;

        return (
            <Link href={href} className={cn(base, variants[variant], className)} target={target} rel={rel} aria-label={ariaLabel} {...rest}>
                {children}
            </Link>
        );
    }

    const { type = 'button', ...rest } = props;

    return (
        <button type={type} className={cn(base, variants[variant], className)} {...rest}>
            {children}
        </button>
    );
}
