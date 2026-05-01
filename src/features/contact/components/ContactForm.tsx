'use client';

import * as React from 'react';
import { Send } from 'lucide-react';

import Button from '@/components/ui/Button';
import { contactContent } from '@/content/contact';
import { useContactForm } from '@/hooks/useContactForm';
import { cn } from '@/lib/cn';

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
    return (
        <label htmlFor={htmlFor} className="text-sm font-semibold text-(--text-strong)">
            {children}
        </label>
    );
}

function InputBase(props: React.InputHTMLAttributes<HTMLInputElement>) {
    return <input {...props} className={cn('field-input text-sm focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2', props.className)} />;
}

function TextareaBase(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
    return <textarea {...props} className={cn('field-textarea text-sm focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2', props.className)} />;
}

export default function ContactForm() {
    const { values, status, statusMessage, updateField, onSubmit } = useContactForm();
    const { form } = contactContent;

    return (
        <form onSubmit={onSubmit} className="surface-card relative overflow-hidden rounded-4xl p-5 sm:p-6 lg:p-8">
            <div aria-hidden className="absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-(--gold)/15 blur-3xl" />

            <div className="sr-only" role={status.state === 'error' ? 'alert' : 'status'} aria-live={status.state === 'error' ? 'assertive' : 'polite'}>
                {statusMessage}
            </div>

            <div className="relative">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-(--gold)">{form.kicker}</p>

                <div className="mt-3 flex items-start justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-semibold tracking-[-0.04em] text-(--text-strong)">{form.title}</h2>
                        <p className="mt-2 max-w-xl text-sm leading-6 text-(--text)">{form.intro}</p>
                    </div>

                    <p className="hidden text-xs font-semibold text-(--text-muted) sm:block">
                        {status.state === 'loading' ? 'Envoi…' : status.state === 'success' ? 'Envoyé ✓' : ''}
                    </p>
                </div>

                <div className="hidden" aria-hidden>
                    <label htmlFor="company">Company</label>
                    <input id="company" value={values.company} onChange={(e) => updateField('company', e.target.value)} />
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                        <FieldLabel htmlFor="name">Nom</FieldLabel>
                        <InputBase id="name" value={values.name} onChange={(e) => updateField('name', e.target.value)} required placeholder="Votre nom" autoComplete="name" />
                    </div>

                    <div className="grid gap-2">
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <InputBase
                            id="email"
                            type="email"
                            value={values.email}
                            onChange={(e) => updateField('email', e.target.value)}
                            required
                            placeholder="votre@email.com"
                            autoComplete="email"
                        />
                    </div>
                </div>

                <div className="mt-4 grid gap-2">
                    <FieldLabel htmlFor="subject">Sujet</FieldLabel>
                    <InputBase id="subject" value={values.subject} onChange={(e) => updateField('subject', e.target.value)} placeholder="Opportunité frontend, échange, projet…" />
                </div>

                <div className="mt-4 grid gap-2">
                    <FieldLabel htmlFor="message">Message</FieldLabel>
                    <TextareaBase
                        id="message"
                        value={values.message}
                        onChange={(e) => updateField('message', e.target.value)}
                        required
                        rows={7}
                        placeholder="Expliquez-moi simplement le contexte, l’opportunité ou le projet."
                    />
                </div>

                {status.state === 'error' ? (
                    <div className="mt-4 rounded-2xl border border-(--border-soft) bg-(--gold)/10 px-4 py-3 text-sm text-(--text)" role="alert">
                        <strong className="text-(--text-strong)">Erreur :</strong> {status.message}
                    </div>
                ) : null}

                {status.state === 'success' ? (
                    <div className="surface-sage-soft mt-4 rounded-2xl border px-4 py-3 text-sm text-(--text)" role="status">
                        <strong className="text-(--text-strong)">Merci !</strong> Votre message est bien parti.
                    </div>
                ) : null}

                <Button type="submit" disabled={status.state === 'loading'} className="mt-6 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60">
                    <Send size={16} />
                    {status.state === 'loading' ? form.loadingLabel : form.submitLabel}
                </Button>
            </div>
        </form>
    );
}
