import { NextResponse } from 'next/server';

import { sendContactMail } from '@/lib/contact/mail';
import { getClientKey, isRateLimited } from '@/lib/contact/rate-limit';
import { parseContactPayload, parseJsonBody } from '@/lib/contact/validation';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function invalidPayloadResponse() {
    return NextResponse.json({ ok: false, error: 'Données de contact invalides.' }, { status: 400 });
}

export async function POST(req: Request) {
    const resendKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO;
    const from = process.env.CONTACT_FROM;

    if (!resendKey || !to || !from) {
        return NextResponse.json({ ok: false, error: 'Configuration serveur manquante (env).' }, { status: 500 });
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
