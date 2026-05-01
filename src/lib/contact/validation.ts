import type { ContactPayload } from '@/types/contact';

function isEmail(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/** Normalise une valeur inconnue en chaîne trimée, ou chaîne vide. */
function asString(value: unknown): string {
    return typeof value === 'string' ? value.trim() : '';
}

/**
 * Parse le body JSON sans lever d'exception.
 *
 * Pourquoi retourner `null` plutôt qu'une erreur ?
 * L'API de contact veut un flux de validation uniforme : toute entrée invalide
 * aboutit à la même réponse 400 pour limiter la fuite d'informations côté attaquant.
 */
export async function parseJsonBody(req: Request): Promise<unknown | null> {
    try {
        return await req.json();
    } catch {
        return null;
    }
}

/**
 * Valide et normalise le payload de contact côté serveur.
 *
 * Cette fonction joue le rôle de barrière métier centrale : on ne dépend pas
 * uniquement des validations front, car l'endpoint peut être appelé hors UI.
 */
export function parseContactPayload(value: unknown): ContactPayload | null {
    if (!value || typeof value !== 'object') return null;

    const body = value as Record<string, unknown>;

    const name = asString(body.name);
    const email = asString(body.email);
    const subject = asString(body.subject) || 'Demande de contact via le portfolio';
    const message = asString(body.message);
    const company = asString(body.company);
    const formStartedAt = typeof body.formStartedAt === 'number' ? body.formStartedAt : NaN;

    if (name.length < 2 || name.length > 120) return null;
    if (!isEmail(email)) return null;
    if (subject.length < 3 || subject.length > 200) return null;
    if (message.length < 10 || message.length > 5000) return null;
    if (!Number.isFinite(formStartedAt)) return null;

    return { name, email, subject, message, company, formStartedAt };
}
