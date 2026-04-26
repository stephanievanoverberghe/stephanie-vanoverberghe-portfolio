import type { CSSProperties } from 'react';

export const ribbonStyle: CSSProperties = {
    background: 'linear-gradient(90deg, var(--accent), var(--gold), var(--sage), var(--lilac))',
};

export const headerShellStyle: CSSProperties = {
    background: 'color-mix(in oklab, var(--paper) 82%, transparent)',
    backdropFilter: 'blur(18px)',
    borderColor: 'color-mix(in oklab, var(--border-soft) 78%, transparent)',
};

export const mobilePanelStyle: CSSProperties = {
    background: 'linear-gradient(135deg, color-mix(in oklab, var(--surface-1) 92%, transparent), color-mix(in oklab, var(--surface-2) 82%, transparent))',
    borderColor: 'color-mix(in oklab, var(--sage) 26%, var(--border-soft))',
};
