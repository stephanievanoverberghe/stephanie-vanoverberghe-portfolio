import * as React from 'react';

export type ChipKind = 'neutral' | 'tech' | 'design' | 'tool' | 'architecture';
export type ChipColor = 'neutral' | 'accent' | 'sage' | 'lilac' | 'gold';
export type ChipSize = 'xs' | 'sm' | 'md';

export function colorFromKind(kind?: ChipKind): ChipColor {
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

function calm(base: string) {
    return `color-mix(in oklab, ${base} 86%, var(--text) 14%)`;
}

export function getChipBaseColor(color: ChipColor) {
    return calm(token(color));
}

export function softStyle(base: string, active?: boolean): React.CSSProperties {
    const blendSurface = 'var(--surface-1)';
    const borderSoft = 'var(--border-soft)';
    const bgPct = 7;
    const borderPct = active ? 28 : 20;
    return {
        background: `color-mix(in oklab, ${base} ${bgPct}%, ${blendSurface})`,
        borderColor: `color-mix(in oklab, ${base} ${borderPct}%, ${borderSoft})`,
        color: 'var(--text)',
    };
}

export function sizeClasses(size: ChipSize) {
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
