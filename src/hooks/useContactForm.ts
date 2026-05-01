'use client';

import * as React from 'react';

import { buildContactPayload, CONTACT_FORM_INITIAL_VALUES, getContactStatusMessage, resetContactValuesAfterSuccess } from '@/lib/contact/form';
import { submitContact } from '@/services/contact';
import type { ContactFormStatus, ContactFormValues } from '@/types/contact';

/**
 * Gère l'état complet du formulaire de contact côté client.
 *
 * Le hook reste volontairement fin : la logique testable vit dans des helpers purs,
 * et le hook s'occupe surtout du cycle React et de la synchronisation UI.
 */
export function useContactForm() {
    const [formStartedAt] = React.useState(() => Date.now());
    const [values, setValues] = React.useState<ContactFormValues>(CONTACT_FORM_INITIAL_VALUES);
    const [status, setStatus] = React.useState<ContactFormStatus>({ state: 'idle' });

    const statusMessage = getContactStatusMessage(status);

    /** Met à jour un champ du formulaire sans exposer la logique d'état au composant appelant. */
    const updateField = React.useCallback((field: keyof ContactFormValues, value: string) => {
        setValues((prev) => ({ ...prev, [field]: value }));
    }, []);

    /** Soumet les valeurs courantes et propage un statut directement exploitable dans l'UI. */
    const onSubmit = React.useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setStatus({ state: 'loading' });

            try {
                const result = await submitContact(buildContactPayload(values, formStartedAt));

                if (!result.ok) {
                    setStatus({ state: 'error', message: result.error ?? "Erreur lors de l'envoi." });
                    return;
                }

                setStatus({ state: 'success' });
                setValues((prev) => resetContactValuesAfterSuccess(prev));
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
