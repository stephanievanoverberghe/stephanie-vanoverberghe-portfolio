import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('contact rate limit', () => {
    beforeEach(() => {
        vi.resetModules();
        vi.useFakeTimers();
        vi.setSystemTime(new Date('2026-05-01T10:00:00.000Z'));
    });

    it('extracts the first forwarded IP when available', async () => {
        const { getClientKey } = await import('./rate-limit');
        const req = new Request('http://localhost/api/contact', {
            headers: {
                'x-forwarded-for': '203.0.113.10, 10.0.0.1',
            },
        });

        expect(getClientKey(req)).toBe('203.0.113.10');
    });

    it('falls back to x-real-ip then unknown', async () => {
        const { getClientKey } = await import('./rate-limit');

        expect(
            getClientKey(
                new Request('http://localhost/api/contact', {
                    headers: { 'x-real-ip': '198.51.100.7' },
                }),
            ),
        ).toBe('198.51.100.7');

        expect(getClientKey(new Request('http://localhost/api/contact'))).toBe('unknown');
    });

    it('blocks after five requests inside the sliding window and resets after expiry', async () => {
        const { isRateLimited } = await import('./rate-limit');

        expect(isRateLimited('client-1')).toBe(false);
        expect(isRateLimited('client-1')).toBe(false);
        expect(isRateLimited('client-1')).toBe(false);
        expect(isRateLimited('client-1')).toBe(false);
        expect(isRateLimited('client-1')).toBe(false);
        expect(isRateLimited('client-1')).toBe(true);

        vi.advanceTimersByTime(60_001);

        expect(isRateLimited('client-1')).toBe(false);
    });
});
