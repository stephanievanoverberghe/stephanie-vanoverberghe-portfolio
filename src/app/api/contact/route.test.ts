// @ts-nocheck
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/lib/contact/mail', () => ({
    sendContactMail: vi.fn(),
}));

vi.mock('@/lib/contact/rate-limit', () => ({
    getClientKey: vi.fn(),
    isRateLimited: vi.fn(),
}));

vi.mock('@/lib/contact/validation', () => ({
    parseJsonBody: vi.fn(),
    parseContactPayload: vi.fn(),
}));

import { POST } from './route';
import { sendContactMail } from '@/lib/contact/mail';
import { getClientKey, isRateLimited } from '@/lib/contact/rate-limit';
import { parseContactPayload, parseJsonBody } from '@/lib/contact/validation';

const mockedSendContactMail = vi.mocked(sendContactMail);
const mockedGetClientKey = vi.mocked(getClientKey);
const mockedIsRateLimited = vi.mocked(isRateLimited);
const mockedParseJsonBody = vi.mocked(parseJsonBody);
const mockedParseContactPayload = vi.mocked(parseContactPayload);

function createRequest() {
    return new Request('http://localhost:3000/api/contact', {
        method: 'POST',
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
});
