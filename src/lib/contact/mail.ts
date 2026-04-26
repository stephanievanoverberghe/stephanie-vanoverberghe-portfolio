import { Resend } from 'resend';

import type { ContactPayload } from '@/types/contact';

export type ContactMailConfig = {
    apiKey: string;
    from: string;
    to: string;
};

/**
 * Envoie l'email de contact via Resend.
 *
 * Le retour est volontairement simplifié (`string | null`) pour découpler
 * la route API du SDK Resend : l'appelant gère un contrat stable et testable.
 */
export async function sendContactMail(payload: ContactPayload, config: ContactMailConfig): Promise<string | null> {
    const resend = new Resend(config.apiKey);

    const text = ['Nouveau message depuis le portfolio', '', `Nom: ${payload.name}`, `Email: ${payload.email}`, `Sujet: ${payload.subject}`, '', 'Message:', payload.message].join(
        '\n',
    );

    const { error } = await resend.emails.send({
        from: config.from,
        to: config.to,
        subject: `[Portfolio] ${payload.subject}`,
        replyTo: `${payload.name} <${payload.email}>`,
        text,
    });

    return error?.message ?? null;
}
