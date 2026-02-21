// src/app/api/contact/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Payload = {
    name: string;
    email: string;
    subject: string;
    message: string;
    company: string;
};

const REQUEST_LIMIT = 5;
const WINDOW_MS = 60_000;

const rateLimitStore = new Map<string, number[]>();

function isEmail(v: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function badRequest(message: string) {
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
}

function getClientKey(req: Request): string {
    const forwardedFor = req.headers.get('x-forwarded-for');
    if (forwardedFor) return forwardedFor.split(',')[0]?.trim() ?? 'unknown';
    return req.headers.get('x-real-ip') ?? 'unknown';
}

function isRateLimited(clientKey: string): boolean {
    const now = Date.now();
    const existing = rateLimitStore.get(clientKey) ?? [];
    const inWindow = existing.filter((time) => now - time < WINDOW_MS);

    if (inWindow.length >= REQUEST_LIMIT) {
        rateLimitStore.set(clientKey, inWindow);
        return true;
    }

    inWindow.push(now);
    rateLimitStore.set(clientKey, inWindow);
    return false;
}

function asString(value: unknown): string {
    return typeof value === 'string' ? value.trim() : '';
}

function parsePayload(value: unknown): Payload | null {
    if (!value || typeof value !== 'object') return null;

    const body = value as Record<string, unknown>;

    const name = asString(body.name);
    const email = asString(body.email);
    const subject = asString(body.subject) || 'Demande de contact via le portfolio';
    const message = asString(body.message);
    const company = asString(body.company);

    if (name.length < 2 || name.length > 120) return null;
    if (!isEmail(email)) return null;
    if (subject.length < 3 || subject.length > 200) return null;
    if (message.length < 10 || message.length > 5000) return null;

    return { name, email, subject, message, company };
}

async function safeJson(req: Request): Promise<unknown | null> {
    try {
        return await req.json();
    } catch {
        return null;
    }
}

export async function POST(req: Request) {
    try {
        const resendKey = process.env.RESEND_API_KEY;
        const to = process.env.CONTACT_TO;
        const from = process.env.CONTACT_FROM;

        if (!resendKey || !to || !from) {
            return NextResponse.json({ ok: false, error: 'Configuration serveur manquante (env).' }, { status: 500 });
        }

        if (isRateLimited(getClientKey(req))) {
            return NextResponse.json({ ok: false, error: 'Trop de requêtes, merci de réessayer dans une minute.' }, { status: 429 });
        }

        const raw = await safeJson(req);
        const payload = parsePayload(raw);

        if (!payload) {
            return badRequest('Données de contact invalides.');
        }

        // Honeypot anti-bot
        if (payload.company) {
            return NextResponse.json({ ok: true }, { status: 200 });
        }

        const resend = new Resend(resendKey);

        const text = [
            'Nouveau message depuis le portfolio',
            '',
            `Nom: ${payload.name}`,
            `Email: ${payload.email}`,
            `Sujet: ${payload.subject}`,
            '',
            'Message:',
            payload.message,
        ].join('\n');

        const { error } = await resend.emails.send({
            from,
            to,
            subject: `[Portfolio] ${payload.subject}`,
            replyTo: `${payload.name} <${payload.email}>`,
            text,
        });

        if (error) {
            return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
        }

        return NextResponse.json({ ok: true }, { status: 200 });
    } catch {
        return NextResponse.json({ ok: false, error: 'Requête invalide.' }, { status: 400 });
    }
}
