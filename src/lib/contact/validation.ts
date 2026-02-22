export type ContactPayload = {
    name: string;
    email: string;
    subject: string;
    message: string;
    company: string;
    formStartedAt: number;
};

function isEmail(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function asString(value: unknown): string {
    return typeof value === 'string' ? value.trim() : '';
}

export async function parseJsonBody(req: Request): Promise<unknown | null> {
    try {
        return await req.json();
    } catch {
        return null;
    }
}

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
