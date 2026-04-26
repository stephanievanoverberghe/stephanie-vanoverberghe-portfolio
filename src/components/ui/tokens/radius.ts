export const radius = {
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.25rem',
    '2xl': '1.7rem',
    pill: '999px',
} as const;

export type RadiusToken = keyof typeof radius;
