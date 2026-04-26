import type { ContactApiResponse, ContactPayload } from '@/types/contact';

export async function submitContact(payload: ContactPayload): Promise<ContactApiResponse> {
    const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    const data = (await res.json()) as ContactApiResponse;

    if (!res.ok || !data.ok) {
        return { ok: false, error: data.error ?? 'Erreur lors de l’envoi.' };
    }

    return data;
}
