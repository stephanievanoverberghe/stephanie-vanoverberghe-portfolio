'use client';

import Link from 'next/link';
import * as React from 'react';

/** --- Nouvelle classification --- */
type ChipColor = 'neutral' | 'accent' | 'sage' | 'lilac' | 'gold';
type ChipAppearance = 'soft' | 'solid' | 'outline' | 'ghost';
type ChipSize = 'xs' | 'sm' | 'md';
type ChipTone = 'subtle' | 'normal' | 'bold'; // ← contrôle la “force” visuelle (par défaut: subtle)

/** --- Ancienne API (toujours supportée) --- */
type LegacyVariant = 'default' | 'accent' | 'lilac' | 'outline';

type BaseProps = {
    children: React.ReactNode;
    className?: string;

    /** API recommandée */
    color?: ChipColor; // default: 'neutral'
    appearance?: ChipAppearance; // default: 'soft'
    tone?: ChipTone; // default: 'subtle'

    /** API legacy mappée en interne */
    variant?: LegacyVariant;

    size?: ChipSize; // default: 'md'
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

/** utilitaire minimal */
function cn(...parts: (string | false | null | undefined)[]) {
    return parts.filter(Boolean).join(' ');
}

/** Rétrocompatibilité (variant -> color/appearance) */
function mapLegacy(variant?: LegacyVariant): { color: ChipColor; appearance: ChipAppearance } | null {
    if (!variant) return null;
    switch (variant) {
        case 'accent':
            return { color: 'accent', appearance: 'soft' };
        case 'lilac':
            return { color: 'lilac', appearance: 'soft' };
        case 'outline':
            return { color: 'accent', appearance: 'outline' };
        case 'default':
        default:
            return { color: 'neutral', appearance: 'soft' };
    }
}

/** Couleur de base */
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

/** Coefficients (plus doux en "subtle") */
function coeffs(tone: ChipTone) {
    // Pourcentage de la couleur dans le fond (soft) et le bord
    if (tone === 'bold') return { bg: 22, border: 60, borderActive: 72, outlineMix: 50 };
    if (tone === 'normal') return { bg: 16, border: 48, borderActive: 64, outlineMix: 42 };
    // subtle (par défaut) — très doux
    return { bg: 11, border: 36, borderActive: 54, outlineMix: 34 };
}

/** Styles appearance × color × tone */
function styleByAppearance(appearance: ChipAppearance, color: ChipColor, tone: ChipTone, active?: boolean): React.CSSProperties {
    const base = token(color);
    const surface = 'var(--surface-1)';
    const borderSoft = 'var(--border-soft)';
    const { bg, border, borderActive, outlineMix } = coeffs(tone);

    if (appearance === 'solid') {
        // Solid assourdi (pas flashy) : on mélange la couleur avec la surface pour la calmer
        // Texte sombre en subtle/normal, clair seulement en bold.
        return {
            background: `color-mix(in oklab, ${base} ${tone === 'bold' ? 72 : 58}%, ${surface})`,
            borderColor: `color-mix(in oklab, ${base} ${tone === 'bold' ? 68 : 46}%, ${borderSoft})`,
            color: tone === 'bold' ? '#FDFDFD' : 'var(--text-strong)',
        };
    }

    if (appearance === 'outline') {
        return {
            background: 'transparent',
            borderColor: active ? `color-mix(in oklab, ${base} ${outlineMix}%, ${borderSoft})` : borderSoft,
            color: 'var(--text)',
        };
    }

    if (appearance === 'ghost') {
        return {
            background: 'transparent',
            borderColor: 'transparent',
            color: `color-mix(in oklab, ${base} 48%, var(--text))`, // teinte légère dans le texte
        };
    }

    // soft (par défaut) — extrêmement discret
    return {
        background: `color-mix(in oklab, ${base} ${bg}%, ${surface})`,
        borderColor: `color-mix(in oklab, ${base} ${active ? borderActive : border}%, ${borderSoft})`,
        color: 'var(--text)',
    };
}

/** Sizing */
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

export default function Chip(props: ChipProps) {
    const { children, className, size = 'md', leading, trailing, active, disabled, onRemove, ariaLabel } = props;

    // Résolution API + fallback legacy
    const legacy = mapLegacy(props.variant);
    const color = (props.color ?? legacy?.color ?? 'neutral') as ChipColor;
    const appearance = (props.appearance ?? legacy?.appearance ?? 'soft') as ChipAppearance;
    const tone = (props.tone ?? 'subtle') as ChipTone;

    const styles: React.CSSProperties = {
        ...styleByAppearance(appearance, color, tone, active),
        outlineColor: 'var(--ring-focus)',
        opacity: disabled ? 0.6 : 1,
        cursor: disabled ? 'not-allowed' : undefined,
        transition: 'border-color .2s, background-color .2s, color .2s',
    };

    const base = (
        <span
            className={cn(
                'chip inline-flex items-center gap-2 select-none',
                sizeClasses(size),
                'focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2',
                className
            )}
            style={styles}
            aria-label={ariaLabel}
            aria-pressed={props.as === 'button' ? !!active : undefined}
            aria-disabled={disabled || undefined}
            data-appearance={appearance}
            data-color={color}
            data-tone={tone}
            data-state={active ? 'active' : 'inactive'}
        >
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
                        background: 'color-mix(in oklab, var(--accent) 6%, var(--surface-1))',
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

    // Liens
    if ('href' in props && props.href) {
        const external = props.external ?? false;
        return external ? (
            <a href={props.href} target="_blank" rel="noopener noreferrer" className="inline-block" aria-disabled={disabled || undefined}>
                {base}
            </a>
        ) : (
            <Link href={props.href} className="inline-block" aria-disabled={disabled || undefined}>
                {base}
            </Link>
        );
    }

    // Bouton
    if (props.as === 'button') {
        return (
            <button type="button" className="inline-block bg-transparent border-0 p-0" disabled={disabled}>
                {base}
            </button>
        );
    }

    // Span
    return base;
}
