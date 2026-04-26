declare module 'vitest' {
    export const describe: (name: string, fn: () => void) => void;
    export const it: (name: string, fn: () => void | Promise<void>) => void;
    export const beforeEach: (fn: () => void | Promise<void>) => void;
    export const afterEach: (fn: () => void | Promise<void>) => void;

    type ExpectChain = {
        toBe: (expected: unknown) => void;
        toEqual: (expected: unknown) => void;
        toThrow: (expected?: unknown) => void;
        toHaveBeenCalled: () => void;
        toHaveBeenCalledTimes: (count: number) => void;
        toHaveBeenCalledWith: (...args: unknown[]) => void;
        not: {
            toHaveBeenCalled: () => void;
            toHaveBeenCalledTimes: (count: number) => void;
        };
        rejects: {
            toThrow: (expected?: unknown) => Promise<void>;
        };
    };

    export const expect: {
        <T = unknown>(value: T): ExpectChain;
    };

    export const vi: {
        fn: <T extends (...args: never[]) => unknown = (...args: never[]) => unknown>() => T & {
            mockResolvedValue: (value: unknown) => unknown;
            mockResolvedValueOnce: (value: unknown) => unknown;
            mockRejectedValue: (value: unknown) => unknown;
            mockRejectedValueOnce: (value: unknown) => unknown;
            mockReturnValue: (value: unknown) => unknown;
            mockReturnValueOnce: (value: unknown) => unknown;
        };
        mocked: <T>(value: T) => T & {
            mockResolvedValue: (value: unknown) => unknown;
            mockResolvedValueOnce: (value: unknown) => unknown;
            mockRejectedValue: (value: unknown) => unknown;
            mockRejectedValueOnce: (value: unknown) => unknown;
            mockReturnValue: (value: unknown) => unknown;
            mockReturnValueOnce: (value: unknown) => unknown;
        };
        clearAllMocks: () => void;
        resetModules: () => void;
        doMock: (path: string, factory: () => unknown) => void;
        importActual: <T>(path: string) => Promise<T>;
        mock: (path: string, factory: () => Record<string, unknown>) => void;
        stubGlobal: (name: string, value: unknown) => void;
        unstubAllGlobals: () => void;
    };
}

declare module 'vitest/config' {
    export function defineConfig(config: Record<string, unknown>): Record<string, unknown>;
}
