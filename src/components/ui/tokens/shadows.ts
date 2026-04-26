export const shadows = {
    card: '0 8px 30px hsl(220 38% 10% / 0.06)',
    elevated: '0 16px 40px hsl(220 38% 10% / 0.1)',
} as const;

export type ShadowToken = keyof typeof shadows;
