import { describe, expect, it } from 'vitest';

import type { ContactFormStatus, ContactFormValues } from '@/types/contact';

import { buildContactPayload, CONTACT_FORM_INITIAL_VALUES, getContactStatusMessage, resetContactValuesAfterSuccess } from './form';

const values: ContactFormValues = {
    name: 'Jane Doe',
    email: 'jane@example.com',
    subject: 'Mission frontend',
    message: 'Bonjour, je souhaite échanger.',
    company: '',
};

describe('contact form helpers', () => {
    it('exposes stable initial values', () => {
        expect(CONTACT_FORM_INITIAL_VALUES).toEqual({
            name: '',
            email: '',
            subject: 'Demande de contact',
            message: '',
            company: '',
        });
    });

    it('builds a payload with the form start timestamp', () => {
        expect(buildContactPayload(values, 1234)).toEqual({
            ...values,
            formStartedAt: 1234,
        });
    });

    it('returns the correct UI message for each status', () => {
        const idle: ContactFormStatus = { state: 'idle' };
        const loading: ContactFormStatus = { state: 'loading' };
        const success: ContactFormStatus = { state: 'success' };
        const error: ContactFormStatus = { state: 'error', message: 'Service indisponible' };

        expect(getContactStatusMessage(idle)).toBe('');
        expect(getContactStatusMessage(loading)).toBe('Envoi du message en cours.');
        expect(getContactStatusMessage(success)).toBe('Message envoyé avec succès. Je reviens vers vous rapidement.');
        expect(getContactStatusMessage(error)).toBe("Erreur lors de l'envoi : Service indisponible");
    });

    it('clears only the message after a successful submit', () => {
        expect(resetContactValuesAfterSuccess(values)).toEqual({
            ...values,
            message: '',
        });
    });
});
