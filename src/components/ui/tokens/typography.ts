export const typography = {
    heading: {
        display: {
            fontSize: 'clamp(2.6rem, 6vw, 5.8rem)',
            lineHeight: '0.95',
            letterSpacing: '-0.075em',
            fontWeight: '600',
        },
        h1: {
            fontSize: 'clamp(2.1rem, 4.2vw, 3.6rem)',
            lineHeight: '1.02',
            letterSpacing: '-0.05em',
            fontWeight: '600',
        },
        h2: {
            fontSize: 'clamp(1.55rem, 2.8vw, 2.2rem)',
            lineHeight: '1.1',
            letterSpacing: '-0.03em',
            fontWeight: '600',
        },
        h3: {
            fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
            lineHeight: '1.2',
            letterSpacing: '-0.02em',
            fontWeight: '600',
        },
    },
    text: {
        body: {
            fontSize: 'clamp(1rem, 1.1vw, 1.075rem)',
            lineHeight: '1.75',
            letterSpacing: '-0.005em',
        },
        muted: {
            fontSize: '0.95rem',
            lineHeight: '1.65',
            letterSpacing: '-0.002em',
        },
        small: {
            fontSize: '0.8125rem',
            lineHeight: '1.5',
            letterSpacing: '0.01em',
        },
    },
} as const;

export type HeadingVariant = keyof typeof typography.heading;
export type TextVariant = keyof typeof typography.text;
