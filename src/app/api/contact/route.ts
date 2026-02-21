// src/app/api/contact/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Payload = {
    name: string;
    email: string;
    subject?: string;
    message: string;
    company?: string;
};

function isEmail(v: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function badRequest(message: string) {
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
}

export async function POST(req: Request) {
    try {
        const resendKey = process.env.RESEND_API_KEY;
        const to = process.env.CONTACT_TO;
        const from = process.env.CONTACT_FROM;

        if (!resendKey || !to || !from) {
            return NextResponse.json({ ok: false, error: 'Configuration serveur manquante (env).' }, { status: 500 });
        }

        const body = (await req.json()) as Partial<Payload>;

        const name = (body.name ?? '').trim();
        const email = (body.email ?? '').trim();
        const subject = (body.subject ?? 'Demande de contact via le portfolio').trim();
        const message = (body.message ?? '').trim();
        const company = (body.company ?? '').trim();

        if (company) {
            return NextResponse.json({ ok: true }, { status: 200 });
        }

        if (!name || name.length < 2) return badRequest('Nom invalide.');
        if (!email || !isEmail(email)) return badRequest('Email invalide.');
        if (!message || message.length < 10) return badRequest('Message trop court.');
        if (message.length > 5000) return badRequest('Message trop long.');

        const resend = new Resend(resendKey);

        const text = ['Nouveau message depuis le portfolio', '', `Nom: ${name}`, `Email: ${email}`, `Sujet: ${subject}`, '', 'Message:', message].join('\n');

        const { error } = await resend.emails.send({
            from,
            to,
            subject: `[Portfolio] ${subject}`,
            replyTo: `${name} <${email}>`,
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
