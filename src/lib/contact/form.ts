import type { ContactFormStatus, ContactFormValues, ContactPayload } from '@/types/contact';

/** Valeurs par défaut du formulaire de contact côté client. */
export const CONTACT_FORM_INITIAL_VALUES: ContactFormValues = {
    name: '',
    email: '',
    subject: 'Demande de contact',
    message: '',
    company: '',
};

/** Construit le message d'état affiché dans l'interface. */
export function getContactStatusMessage(status: ContactFormStatus): string {
    if (status.state === 'loading') return 'Envoi du message en cours.';
    if (status.state === 'success') return 'Message envoyé avec succès. Je reviens vers vous rapidement.';
    if (status.state === 'error') return `Erreur lors de l'envoi : ${status.message}`;
    return '';
}

/** Prépare le payload envoyé à l'API en ajoutant le timestamp de départ du formulaire. */
export function buildContactPayload(values: ContactFormValues, formStartedAt: number): ContactPayload {
    return { ...values, formStartedAt };
}

/** Réinitialise uniquement le champ message après un envoi réussi. */
export function resetContactValuesAfterSuccess(values: ContactFormValues): ContactFormValues {
    return { ...values, message: '' };
}
