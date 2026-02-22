import { NextResponse } from 'next/server';

import { sendContactMail } from '@/lib/contact/mail';
import { getClientKey, isRateLimited } from '@/lib/contact/rate-limit';
import { parseContactPayload, parseJsonBody } from '@/lib/contact/validation';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MIN_SUBMISSION_DELAY_MS = 3_000;
const MAX_SUBMISSION_WINDOW_MS = 1000 * 60 * 60 * 24;

function invalidPayloadResponse() {
    return NextResponse.json({ ok: false, error: 'Données de contact invalides.' }, { status: 400 });
}

function isAllowedRequestSource(req: Request): boolean {
    const expectedOrigin = new URL(req.url).origin;
    const origin = req.headers.get('origin');
    const referer = req.headers.get('referer');

    if (origin && origin !== expectedOrigin) {
        return false;
    }

    if (!referer) {
        return true;
    }

    try {
        return new URL(referer).origin === expectedOrigin;
    } catch {
        return false;
    }
}

function isHumanSubmissionDelay(formStartedAt: number): boolean {
    const elapsed = Date.now() - formStartedAt;
    return elapsed >= MIN_SUBMISSION_DELAY_MS && elapsed <= MAX_SUBMISSION_WINDOW_MS;
}

export async function POST(req: Request) {
    const resendKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO;
    const from = process.env.CONTACT_FROM;

    if (!resendKey || !to || !from) {
        return NextResponse.json({ ok: false, error: 'Configuration serveur manquante (env).' }, { status: 500 });
    }

    if (!isAllowedRequestSource(req)) {
        console.warn('[api/contact] blocked by origin/referer check');
        return invalidPayloadResponse();
    }

    const clientKey = getClientKey(req);
    if (isRateLimited(clientKey)) {
        console.warn('[api/contact] rate limit hit', { clientKey });
        return NextResponse.json({ ok: false, error: 'Trop de requêtes, merci de réessayer dans une minute.' }, { status: 429 });
    }

    const raw = await parseJsonBody(req);
    const payload = parseContactPayload(raw);

    if (!payload) {
        return invalidPayloadResponse();
    }

    if (payload.company) {
        return NextResponse.json({ ok: true }, { status: 200 });
    }

    if (!isHumanSubmissionDelay(payload.formStartedAt)) {
        console.warn('[api/contact] blocked by minimum submit delay');
        return invalidPayloadResponse();
    }

    try {
        const mailError = await sendContactMail(payload, { apiKey: resendKey, from, to });

        if (mailError) {
            console.error('[api/contact] mail send failed', { error: mailError });
            return NextResponse.json({ ok: false, error: 'Erreur interne.' }, { status: 500 });
        }

        return NextResponse.json({ ok: true }, { status: 200 });
    } catch (error) {
        console.error('[api/contact] unexpected mail error', { error });
        return NextResponse.json({ ok: false, error: 'Erreur interne.' }, { status: 500 });
    }
}
