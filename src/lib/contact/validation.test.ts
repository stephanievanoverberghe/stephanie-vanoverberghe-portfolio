import { describe, expect, it, vi } from 'vitest';

import { parseContactPayload, parseJsonBody } from './validation';

describe('contact validation', () => {
    it('parses and normalizes a valid payload', () => {
        const payload = parseContactPayload({
            name: '  Jane Doe  ',
            email: 'jane@example.com',
            subject: '  Besoin de contact  ',
            message: '  Bonjour, je souhaite échanger sur une mission frontend.  ',
            company: '  ',
            formStartedAt: 1234,
        });

        expect(payload).toEqual({
            name: 'Jane Doe',
            email: 'jane@example.com',
            subject: 'Besoin de contact',
            message: 'Bonjour, je souhaite échanger sur une mission frontend.',
            company: '',
            formStartedAt: 1234,
        });
    });

    it('falls back to the default subject when subject is empty', () => {
        const payload = parseContactPayload({
            name: 'Jane Doe',
            email: 'jane@example.com',
            subject: '   ',
            message: 'Bonjour, je souhaite échanger sur une mission frontend.',
            company: '',
            formStartedAt: 1234,
        });

        expect(payload?.subject).toBe('Demande de contact via le portfolio');
    });

    it('rejects invalid payloads', () => {
        expect(
            parseContactPayload({
                name: 'J',
                email: 'not-an-email',
                subject: 'Hi',
                message: 'court',
                company: '',
                formStartedAt: 'nope',
            }),
        ).toBeNull();
    });

    it('returns parsed JSON when request.json succeeds', async () => {
        const req = {
            json: vi.fn().mockResolvedValue({ ok: true }),
        } as unknown as Request;

        await expect(parseJsonBody(req)).resolves.toEqual({ ok: true });
    });

    it('returns null when request.json throws', async () => {
        const req = {
            json: vi.fn().mockRejectedValue(new Error('bad json')),
        } as unknown as Request;

        await expect(parseJsonBody(req)).resolves.toBeNull();
    });
});
