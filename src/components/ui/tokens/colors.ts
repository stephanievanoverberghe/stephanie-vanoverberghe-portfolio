export const colors = {
    ink: 'hsl(220 12% 8%)',
    paper: 'hsl(210 40% 98%)',

    accent: 'hsl(11 67% 47%)',
    sage: 'hsl(156 18% 63%)',
    lilac: 'hsl(262 42% 82%)',
    gold: 'hsl(41 62% 64%)',

    surface1: 'hsl(0 0% 100%)',
    surface2: 'hsl(258 30% 96%)',

    textStrong: 'hsl(220 15% 14%)',
    text: 'hsl(220 10% 22%)',
    textMuted: 'hsl(220 9% 48%)',

    borderSoft: 'hsl(214 17% 90%)',
    ringFocus: 'hsl(11 67% 47%)',
} as const;

export type ColorToken = keyof typeof colors;

export const colorCssVariables = {
    '--ink': colors.ink,
    '--paper': colors.paper,
    '--accent': colors.accent,
    '--sage': colors.sage,
    '--lilac': colors.lilac,
    '--gold': colors.gold,
    '--surface-1': colors.surface1,
    '--surface-2': colors.surface2,
    '--text-strong': colors.textStrong,
    '--text': colors.text,
    '--text-muted': colors.textMuted,
    '--border-soft': colors.borderSoft,
    '--ring-focus': colors.ringFocus,
} as const;
