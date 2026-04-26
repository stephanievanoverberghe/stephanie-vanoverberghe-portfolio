export type ContactPayload = {
    name: string;
    email: string;
    subject: string;
    message: string;
    company: string;
    formStartedAt: number;
};

export type ContactFormValues = Omit<ContactPayload, 'formStartedAt'>;

export type ContactApiResponse = {
    ok: boolean;
    error?: string;
    message?: string;
};

export type ContactFormStatus = { state: 'idle' } | { state: 'loading' } | { state: 'success' } | { state: 'error'; message: string };
