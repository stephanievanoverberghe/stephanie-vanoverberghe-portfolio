import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/services/contact', () => ({
    submitContact: vi.fn(),
}));

import { submitContact } from '@/services/contact';

const mockedSubmitContact = vi.mocked(submitContact);

function createSubmitEvent() {
    return {
        preventDefault: vi.fn(),
    } as unknown as React.FormEvent<HTMLFormElement>;
}

describe('useContactForm', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    async function setupHook() {
        vi.resetModules();

        const stateSlots: unknown[] = [];
        let useStateCall = 0;

        vi.doMock('react', async () => {
            const actual = await vi.importActual<typeof import('react')>('react');
            return {
                ...actual,
                useState: <T>(initializer: T | (() => T)) => {
                    const slot = useStateCall++;
                    if (stateSlots[slot] === undefined) {
                        stateSlots[slot] = typeof initializer === 'function' ? (initializer as () => T)() : initializer;
                    }

                    const setState = (value: T | ((prev: T) => T)) => {
                        const prev = stateSlots[slot] as T;
                        stateSlots[slot] = typeof value === 'function' ? (value as (prev: T) => T)(prev) : value;
                    };

                    return [stateSlots[slot] as T, setState] as const;
                },
                useCallback: <T extends (...args: never[]) => unknown>(fn: T) => fn,
            };
        });

        const { useContactForm } = await import('./useContactForm');
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const hook = useContactForm();

        return { hook, stateSlots };
    }

    it('starts in idle state', async () => {
        const { hook } = await setupHook();

        expect(hook.status).toEqual({ state: 'idle' });
        expect(hook.statusMessage).toBe('');
    });

    it('sets loading then success on successful submit', async () => {
        mockedSubmitContact.mockResolvedValueOnce({ ok: true });
        const { hook, stateSlots } = await setupHook();

        await hook.onSubmit(createSubmitEvent());

        expect(stateSlots[2]).toEqual({ state: 'success' });
    });

    it('sets error when API returns ok=false', async () => {
        mockedSubmitContact.mockResolvedValueOnce({ ok: false, error: 'Service indisponible' });
        const { hook, stateSlots } = await setupHook();

        await hook.onSubmit(createSubmitEvent());

        expect(stateSlots[2]).toEqual({ state: 'error', message: 'Service indisponible' });
    });

    it('sets error when submit throws', async () => {
        mockedSubmitContact.mockRejectedValueOnce(new Error('network'));
        const { hook, stateSlots } = await setupHook();

        await hook.onSubmit(createSubmitEvent());

        expect(stateSlots[2]).toEqual({ state: 'error', message: 'Impossible de contacter le serveur.' });
    });
});
