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
    // Défense applicative "low-cost" : on rejette les origines externes pour
    // limiter les soumissions cross-site opportunistes sur l'endpoint public.
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
    // Règle métier anti-spam : un humain ne soumet généralement pas le formulaire
    // en moins de quelques secondes, et on ignore aussi les timestamps trop anciens.
    const elapsed = Date.now() - formStartedAt;
    return elapsed >= MIN_SUBMISSION_DELAY_MS && elapsed <= MAX_SUBMISSION_WINDOW_MS;
}

function isMailConfigured() {
    const resendKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO;
    const from = process.env.CONTACT_FROM;

    const ok = !!resendKey && !!to && !!from;

    return {
        ok,
        resendKey,
        to,
        from,
    };
}

/**
 * Endpoint de contact avec garde-fous cumulés.
 *
 * Pourquoi plusieurs couches ? Chaque mécanisme (origine, rate limit, honeypot,
 * délai minimal) peut être contourné isolément, mais leur combinaison réduit
 * fortement le bruit sans complexifier l'expérience utilisateur légitime.
 */
export async function POST(req: Request) {
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
        // Honeypot rempli => probable bot. On répond 200 pour ne pas donner de signal
        // exploitable aux scripts automatisés.
        return NextResponse.json({ ok: true }, { status: 200 });
    }

    if (!isHumanSubmissionDelay(payload.formStartedAt)) {
        console.warn('[api/contact] blocked by minimum submit delay');
        return invalidPayloadResponse();
    }

    const mailConfig = isMailConfigured();

    // ✅ Mode "portfolio" : si le service mail n'est pas configuré, on ne renvoie PAS 500.
    // On répond OK pour que l'UI reste fluide (ex: preview, environnement de recruteur),
    // tout en loggant clairement le problème côté serveur.
    if (!mailConfig.ok) {
        console.warn('[api/contact] mail not configured (missing env) — skipping send', {
            hasResendKey: !!mailConfig.resendKey,
            hasTo: !!mailConfig.to,
            hasFrom: !!mailConfig.from,
        });

        return NextResponse.json({ ok: true, message: "Message reçu. L'envoi d'email n'est pas configuré sur cet environnement." }, { status: 200 });
    }

    try {
        const mailError = await sendContactMail(payload, {
            apiKey: mailConfig.resendKey!,
            from: mailConfig.from!,
            to: mailConfig.to!,
        });

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
