import { afterEach, describe, expect, it, vi } from 'vitest';

import { submitContact } from './contact';
import type { ContactPayload } from '@/types/contact';

const payload: ContactPayload = {
    name: 'Jane Doe',
    email: 'jane@example.com',
    subject: 'Sujet',
    message: 'Bonjour',
    company: '',
    formStartedAt: Date.now() - 10_000,
};

describe('submitContact', () => {
    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it('returns ok response when API succeeds', async () => {
        vi.stubGlobal(
            'fetch',
            vi.fn().mockResolvedValue({
                ok: true,
                json: vi.fn().mockResolvedValue({ ok: true }),
            }),
        );

        const result = await submitContact(payload);

        expect(result).toEqual({ ok: true });
        expect(fetch).toHaveBeenCalledWith('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
    });

    it('returns normalized error when response is not ok', async () => {
        vi.stubGlobal(
            'fetch',
            vi.fn().mockResolvedValue({
                ok: false,
                json: vi.fn().mockResolvedValue({ ok: false, error: 'Rate limit' }),
            }),
        );

        const result = await submitContact(payload);

        expect(result).toEqual({ ok: false, error: 'Rate limit' });
    });

    it('throws when network fails', async () => {
        vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network down')));

        await expect(submitContact(payload)).rejects.toThrow('network down');
    });
});
