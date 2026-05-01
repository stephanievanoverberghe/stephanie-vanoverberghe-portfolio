import Link from 'next/link';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { cn } from '@/lib/cn';

type ButtonVariant = 'primary' | 'secondary';
type ButtonSize = 'md' | 'sm';

const variantClasses: Record<ButtonVariant, string> = {
    primary: 'btn-premium btn-premium-primary',
    secondary: 'btn-premium btn-premium-soft',
};

const sizeClasses: Record<ButtonSize, string> = {
    md: '',
    sm: 'px-4 py-2.5 text-xs',
};

type CommonProps = {
    children: ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    className?: string;
};

type ButtonProps = CommonProps &
    (
        | ({ href: string; external?: boolean } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>)
        | ({ href?: never; external?: never } & ButtonHTMLAttributes<HTMLButtonElement>)
    );

function classes(variant: ButtonVariant, size: ButtonSize, className?: string) {
    return cn('inline-flex items-center gap-2 transition hover:-translate-y-0.5', variantClasses[variant], sizeClasses[size], className);
}

export default function Button(props: ButtonProps) {
    const { children, variant = 'primary', size = 'md', className } = props;

    if ('href' in props && props.href) {
        const { href, external = false } = props;

        if (external) {
            return (
                <a href={href} target="_blank" rel="noopener noreferrer" className={classes(variant, size, className)}>
                    {children}
                </a>
            );
        }

        return (
            <Link href={href} className={classes(variant, size, className)}>
                {children}
            </Link>
        );
    }

    const { type = 'button', ...buttonProps } = props;

    return (
        <button type={type} {...buttonProps} className={classes(variant, size, className)}>
            {children}
        </button>
    );
}
