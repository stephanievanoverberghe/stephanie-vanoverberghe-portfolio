// src/components/ui/Chip.tsx

'use client';

import Link from 'next/link';
import * as React from 'react';

import { cn } from '@/lib/cn';
import { colorFromKind, getChipBaseColor, sizeClasses, softStyle, type ChipColor, type ChipKind, type ChipSize } from './chip-utils';

type LegacyAppearance = 'soft' | 'solid' | 'outline' | 'ghost';
type LegacyTone = 'subtle' | 'normal' | 'bold';
type LegacyVariant = 'default' | 'accent' | 'lilac' | 'outline';

type BaseProps = {
    children: React.ReactNode;
    className?: string;
    kind?: ChipKind;
    color?: ChipColor;
    appearance?: LegacyAppearance;
    tone?: LegacyTone;
    variant?: LegacyVariant;
    size?: ChipSize;
    dot?: boolean;
    leading?: React.ReactNode;
    trailing?: React.ReactNode;

    active?: boolean;
    disabled?: boolean;
    onRemove?: () => void;
    ariaLabel?: string;
};

type LinkProps = { href?: never; external?: never } | { href: string; external?: boolean };

type ButtonProps = { as?: 'button'; onClick?: React.MouseEventHandler<HTMLButtonElement> } | { as?: 'span'; onClick?: never } | { as?: 'a'; onClick?: never };

export type ChipProps = BaseProps & LinkProps & ButtonProps;

export default function Chip(props: ChipProps) {
    const { children, className, size = 'md', kind, color: colorOverride, dot, leading, trailing, active, disabled, onRemove, ariaLabel } = props;

    const color = colorOverride ?? colorFromKind(kind);
    const base = getChipBaseColor(color);

    const styles: React.CSSProperties = {
        ...softStyle(base, active),
        outlineColor: 'var(--ring-focus)',
        opacity: disabled ? 0.6 : 1,
        cursor: disabled ? 'not-allowed' : undefined,
        transition: 'border-color .2s, background-color .2s, color .2s',
    };

    const body = (
        <span
            className={cn('chip inline-flex items-center gap-2 select-none', sizeClasses(size), className)}
            style={styles}
            aria-label={ariaLabel}
            aria-pressed={props.as === 'button' ? !!active : undefined}
            aria-disabled={disabled || undefined}
            data-kind={kind ?? 'neutral'}
            data-color={color}
            data-state={active ? 'active' : 'inactive'}
        >
            {dot ? <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: `color-mix(in oklab, ${base} 54%, var(--surface-1))` }} /> : null}
            {leading ? (
                <span aria-hidden className="inline-flex">
                    {leading}
                </span>
            ) : null}
            <span>{children}</span>
            {trailing ? (
                <span aria-hidden className="inline-flex">
                    {trailing}
                </span>
            ) : null}

            {onRemove ? (
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        if (!disabled) onRemove();
                    }}
                    className="ml-1 -mr-1 inline-flex h-5 w-5 items-center justify-center rounded-full border"
                    style={{
                        borderColor: 'var(--border-soft)',
                        background: 'color-mix(in oklab, var(--accent) 3%, var(--surface-1))',
                        color: 'var(--text)',
                        opacity: disabled ? 0.6 : 1,
                    }}
                    aria-label="Retirer ce tag"
                    title="Retirer"
                    disabled={disabled}
                >
                    ×
                </button>
            ) : null}
        </span>
    );

    const focusCls = 'inline-block focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2';
    const focusStyle = { outlineColor: 'var(--ring-focus)' } as React.CSSProperties;

    if ('href' in props && props.href) {
        const external = props.external ?? false;
        return external ? (
            <a href={props.href} target="_blank" rel="noopener noreferrer" className={focusCls} style={focusStyle} aria-disabled={disabled || undefined}>
                {body}
            </a>
        ) : (
            <Link href={props.href} className={focusCls} style={focusStyle} aria-disabled={disabled || undefined}>
                {body}
            </Link>
        );
    }

    if (props.as === 'button') {
        return (
            <button type="button" className={focusCls + ' bg-transparent border-0 p-0'} style={focusStyle} disabled={disabled}>
                {body}
            </button>
        );
    }

    return body;
}
