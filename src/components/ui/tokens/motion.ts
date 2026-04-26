export const motion = {
    duration: {
        fast: '120ms',
        base: '200ms',
        slow: '320ms',
    },
    easing: {
        standard: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
        entrance: 'cubic-bezier(0.16, 1, 0.3, 1)',
    },
} as const;

export type MotionDurationToken = keyof typeof motion.duration;
