'use client';

import * as React from 'react';
import { Send } from 'lucide-react';

import { useContactForm } from '@/hooks/useContactForm';

function cn(...parts: Array<string | false | null | undefined>) {
    return parts.filter(Boolean).join(' ');
}

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
    return (
        <label htmlFor={htmlFor} className="text-sm font-medium text-(--text-strong)">
            {children}
        </label>
    );
}

function InputBase(props: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            className={cn(
                'w-full rounded-xl border px-3 py-2.5 text-sm transition border-(--border-soft) bg-(--surface-2/42) text-(--text) outline-(--ring-focus)',
                'focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2',
                'placeholder:opacity-60',
                props.className,
            )}
        />
    );
}

function TextareaBase(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
    return (
        <textarea
            {...props}
            className={cn(
                'w-full rounded-xl border px-3 py-2.5 text-sm transition border-(--border-soft) bg-(--surface-2/42) text-(--text) outline-(--ring-focus)',
                'focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2',
                'placeholder:opacity-60',
                props.className,
            )}
        />
    );
}

/**
 * Formulaire de contact côté client.
 *
 * L'affichage reste local à ce composant, tandis que la logique métier
 * (state + soumission) est externalisée dans `useContactForm`.
 */
export default function ContactForm() {
    const { values, status, statusMessage, updateField, onSubmit } = useContactForm();

    return (
        <form onSubmit={onSubmit} className="panel p-6 sm:p-8">
            <div className="sr-only" role={status.state === 'error' ? 'alert' : 'status'} aria-live={status.state === 'error' ? 'assertive' : 'polite'}>
                {statusMessage}
            </div>

            <div className="flex items-start justify-between gap-3">
                <div>
                    <h2 className="text-lg font-semibold text-(--text-strong)">Envoyer un message</h2>
                </div>

                <div className="text-xs opacity-70" aria-hidden>
                    {status.state === 'loading' ? 'Envoi…' : status.state === 'success' ? 'Message envoyé ✓' : ''}
                </div>
            </div>

            <div className="hidden" aria-hidden>
                <label htmlFor="company">Company</label>
                <input id="company" value={values.company} onChange={(e) => updateField('company', e.target.value)} />
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                    <FieldLabel htmlFor="name">Nom</FieldLabel>
                    <InputBase id="name" value={values.name} onChange={(e) => updateField('name', e.target.value)} required placeholder="Ex : Marie Dupont" autoComplete="name" />
                </div>

                <div className="grid gap-2">
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <InputBase
                        id="email"
                        type="email"
                        value={values.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        required
                        placeholder="Ex : marie@domaine.com"
                        autoComplete="email"
                    />
                </div>
            </div>

            <div className="mt-4 grid gap-2">
                <FieldLabel htmlFor="subject">Sujet</FieldLabel>
                <InputBase id="subject" value={values.subject} onChange={(e) => updateField('subject', e.target.value)} />
            </div>

            <div className="mt-4 grid gap-2">
                <FieldLabel htmlFor="message">Message</FieldLabel>
                <TextareaBase
                    id="message"
                    value={values.message}
                    onChange={(e) => updateField('message', e.target.value)}
                    required
                    rows={7}
                    placeholder="Contexte, objectifs, contraintes, liens (si besoin)…"
                />
            </div>

            {status.state === 'error' ? (
                <div
                    className="mt-4 rounded-2xl border px-4 py-3 text-sm border-(--border-soft) bg-(--gold/10) text-(--text) outline-(--ring-focus)"
                    role="alert"
                    aria-live="assertive"
                >
                    <span style={{ color: 'var(--text-strong)' }}>Erreur :</span> <span className="opacity-85">{status.message}</span>
                </div>
            ) : null}

            {status.state === 'success' ? (
                <div
                    className="mt-4 rounded-2xl border px-4 py-3 text-sm"
                    role="status"
                    aria-live="polite"
                    style={{
                        borderColor: 'color-mix(in oklab, var(--sage) 40%, var(--border-soft))',
                        background: 'color-mix(in oklab, var(--sage) 10%, var(--surface-1))',
                    }}
                >
                    <span style={{ color: 'var(--text-strong)' }}>Merci !</span> <span className="opacity-85">Je reviens vers toi rapidement.</span>
                </div>
            ) : null}

            <div className="mt-6 flex flex-wrap gap-3">
                <button
                    type="submit"
                    className="btn btn-cta inline-flex items-center gap-2 cursor-pointer"
                    style={{ color: '#FDFDFD' }}
                    disabled={status.state === 'loading'}
                    aria-disabled={status.state === 'loading'}
                >
                    <Send size={16} aria-hidden />
                    {status.state === 'loading' ? 'Envoi…' : 'Envoyer'}
                </button>
            </div>
        </form>
    );
}
