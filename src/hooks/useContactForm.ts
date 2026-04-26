'use client';

import * as React from 'react';

import { submitContact } from '@/services/contact';
import type { ContactFormStatus, ContactFormValues } from '@/types/contact';

const INITIAL_VALUES: ContactFormValues = {
    name: '',
    email: '',
    subject: 'Demande de contact',
    message: '',
    company: '',
};

export function useContactForm() {
    const [formStartedAt] = React.useState(() => Date.now());
    const [values, setValues] = React.useState<ContactFormValues>(INITIAL_VALUES);
    const [status, setStatus] = React.useState<ContactFormStatus>({ state: 'idle' });

    const statusMessage =
        status.state === 'loading'
            ? 'Envoi du message en cours.'
            : status.state === 'success'
              ? 'Message envoyé avec succès. Je reviens vers vous rapidement.'
              : status.state === 'error'
                ? `Erreur lors de l’envoi : ${status.message}`
                : '';

    const updateField = React.useCallback((field: keyof ContactFormValues, value: string) => {
        setValues((prev) => ({ ...prev, [field]: value }));
    }, []);

    const onSubmit = React.useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setStatus({ state: 'loading' });

            try {
                const result = await submitContact({ ...values, formStartedAt });

                if (!result.ok) {
                    setStatus({ state: 'error', message: result.error ?? 'Erreur lors de l’envoi.' });
                    return;
                }

                setStatus({ state: 'success' });
                setValues((prev) => ({ ...prev, message: '' }));
            } catch {
                setStatus({ state: 'error', message: 'Impossible de contacter le serveur.' });
            }
        },
        [formStartedAt, values],
    );

    return {
        values,
        status,
        statusMessage,
        updateField,
        onSubmit,
    };
}
