declare module 'vitest' {
    export const describe: (name: string, fn: () => void) => void;
    export const it: (name: string, fn: () => void | Promise<void>) => void;
    export const beforeEach: (fn: () => void | Promise<void>) => void;
    export const expect: {
        <T = unknown>(
            value: T,
        ): {
            toBe: (expected: unknown) => void;
            toEqual: (expected: unknown) => void;
            not: {
                toHaveBeenCalled: () => void;
            };
        };
    };
    export const vi: {
        fn: () => (...args: unknown[]) => unknown;
        mocked: <T>(value: T) => T;
        clearAllMocks: () => void;
        mock: (path: string, factory: () => Record<string, unknown>) => void;
    };
}

declare module 'vitest/config' {
    export function defineConfig(config: Record<string, unknown>): Record<string, unknown>;
}
