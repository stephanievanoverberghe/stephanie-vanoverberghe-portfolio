// src/components/ui/Chip.tsx
'use client';

import Link from 'next/link';
import * as React from 'react';

/** Catégories simples */
type ChipKind = 'neutral' | 'tech' | 'design' | 'tool' | 'architecture';

/** Palette directe (override éventuel) */
type ChipColor = 'neutral' | 'accent' | 'sage' | 'lilac' | 'gold';

/** Anciennes props (tolérées mais ignorées) */
type LegacyAppearance = 'soft' | 'solid' | 'outline' | 'ghost';
type LegacyTone = 'subtle' | 'normal' | 'bold';
type LegacyVariant = 'default' | 'accent' | 'lilac' | 'outline';

type ChipSize = 'xs' | 'sm' | 'md';

type BaseProps = {
    children: React.ReactNode;
    className?: string;

    /** NOUVEAU : catégorie → couleur automatique */
    kind?: ChipKind;

    /** Option : couleur directe si tu veux forcer */
    color?: ChipColor;

    /** Optionnels et ignorés (compat) */
    appearance?: LegacyAppearance; // ignoré
    tone?: LegacyTone; // ignoré
    variant?: LegacyVariant; // ignoré

    size?: ChipSize; // default: 'md'
    dot?: boolean; // petit point coloré
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

/* ---------- utils ---------- */
function cn(...parts: (string | false | null | undefined)[]) {
    return parts.filter(Boolean).join(' ');
}

/** mapping Catégorie → Couleur palette */
function colorFromKind(kind?: ChipKind): ChipColor {
    switch (kind) {
        case 'tech':
            return 'accent';
        case 'design':
            return 'lilac';
        case 'tool':
            return 'sage';
        case 'architecture':
            return 'gold';
        case 'neutral':
        default:
            return 'neutral';
    }
}

/** token palette */
function token(color: ChipColor) {
    switch (color) {
        case 'accent':
            return 'var(--accent)';
        case 'sage':
            return 'var(--sage)';
        case 'lilac':
            return 'var(--lilac)';
        case 'gold':
            return 'var(--gold)';
        case 'neutral':
        default:
            return 'var(--text)';
    }
}

/** désaturation légère pour un rendu feutré */
function calm(base: string) {
    return `color-mix(in oklab, ${base} 86%, var(--text) 14%)`;
}

/** style unique “soft” (ultra simple) */
function softStyle(base: string, active?: boolean): React.CSSProperties {
    const blendSurface = 'var(--surface-1)';
    const borderSoft = 'var(--border-soft)';
    const bgPct = 7; // teinte très douce
    const borderPct = active ? 28 : 20; // bordure légèrement teintée
    return {
        background: `color-mix(in oklab, ${base} ${bgPct}%, ${blendSurface})`,
        borderColor: `color-mix(in oklab, ${base} ${borderPct}%, ${borderSoft})`,
        color: 'var(--text)',
    };
}

function sizeClasses(size: ChipSize) {
    switch (size) {
        case 'xs':
            return 'px-2 py-0.5 text-[0.75rem]';
        case 'sm':
            return 'px-2.5 py-1 text-xs';
        case 'md':
        default:
            return 'px-3 py-1.5 text-[0.8125rem]';
    }
}

/* ---------- component ---------- */
export default function Chip(props: ChipProps) {
    const { children, className, size = 'md', kind, color: colorOverride, dot, leading, trailing, active, disabled, onRemove, ariaLabel } = props;

    // couleur finale : override > kind > neutral
    const color = colorOverride ?? colorFromKind(kind);
    const base = calm(token(color));

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

    // wrappers interactifs
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

    return body; // span
}
