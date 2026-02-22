import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { MockInstance } from '@vitest/spy';

vi.mock('@/lib/contact/mail', () => ({ sendContactMail: vi.fn() }));
vi.mock('@/lib/contact/rate-limit', () => ({ getClientKey: vi.fn(), isRateLimited: vi.fn() }));
vi.mock('@/lib/contact/validation', () => ({ parseJsonBody: vi.fn(), parseContactPayload: vi.fn() }));

import { POST } from './route';
import { sendContactMail } from '@/lib/contact/mail';
import { getClientKey, isRateLimited } from '@/lib/contact/rate-limit';
import { parseContactPayload, parseJsonBody } from '@/lib/contact/validation';

const mockedSendContactMail = sendContactMail as unknown as MockInstance<typeof sendContactMail>;
const mockedGetClientKey = getClientKey as unknown as MockInstance<typeof getClientKey>;
const mockedIsRateLimited = isRateLimited as unknown as MockInstance<typeof isRateLimited>;
const mockedParseJsonBody = parseJsonBody as unknown as MockInstance<typeof parseJsonBody>;
const mockedParseContactPayload = parseContactPayload as unknown as MockInstance<typeof parseContactPayload>;

function createRequest(body: unknown = {}) {
    return new Request('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            origin: 'http://localhost:3000',
            referer: 'http://localhost:3000/contact',
        },
        body: JSON.stringify(body),
    });
}

describe('POST /api/contact', () => {
    beforeEach(() => {
        vi.clearAllMocks();

        process.env.RESEND_API_KEY = 'resend_key';
        process.env.CONTACT_TO = 'to@example.com';
        process.env.CONTACT_FROM = 'from@example.com';

        mockedGetClientKey.mockReturnValue('test-client');
        mockedIsRateLimited.mockReturnValue(false);
        mockedParseJsonBody.mockResolvedValue({});
    });

    it('returns 400 when payload is invalid', async () => {
        mockedParseContactPayload.mockReturnValue(null);

        const response = await POST(createRequest());
        expect(response.status).toBe(400);
    });

    it('returns 200 when honeypot is filled', async () => {
        mockedParseContactPayload.mockReturnValue({
            name: 'Test User',
            email: 'test@example.com',
            subject: 'Sujet de test',
            message: 'Ceci est un message valide de test.',
            company: 'bot-field',
            formStartedAt: Date.now() - 5_000,
        });

        const response = await POST(createRequest());

        expect(response.status).toBe(200);
        expect(mockedSendContactMail).not.toHaveBeenCalled();
    });

    it('returns 429 when rate limit is exceeded', async () => {
        mockedIsRateLimited.mockReturnValue(true);

        const response = await POST(createRequest());
        expect(response.status).toBe(429);
    });

    it('returns 400 when origin header is invalid', async () => {
        const response = await POST(
            new Request('http://localhost:3000/api/contact', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    origin: 'https://evil.example',
                },
                body: JSON.stringify({}),
            }),
        );

        expect(response.status).toBe(400);
        expect(mockedIsRateLimited).not.toHaveBeenCalled();
    });

    it('returns 400 when submission delay is too short', async () => {
        mockedParseContactPayload.mockReturnValue({
            name: 'Test User',
            email: 'test@example.com',
            subject: 'Sujet de test',
            message: 'Ceci est un message valide de test.',
            company: '',
            formStartedAt: Date.now() - 500,
        });

        const response = await POST(createRequest());

        expect(response.status).toBe(400);
        expect(mockedSendContactMail).not.toHaveBeenCalled();
    });
});
