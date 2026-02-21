// src/components/contact/ContactForm.tsx
'use client';

import * as React from 'react';
import { Send } from 'lucide-react';

function cn(...parts: Array<string | false | null | undefined>) {
    return parts.filter(Boolean).join(' ');
}

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
    return (
        <label htmlFor={htmlFor} className="text-sm font-medium" style={{ color: 'var(--text-strong)' }}>
            {children}
        </label>
    );
}

function InputBase(props: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            className={cn(
                'w-full rounded-xl border px-3 py-2.5 text-sm transition',
                'focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2',
                'placeholder:opacity-60',
                props.className,
            )}
            style={{
                borderColor: 'var(--border-soft)',
                background: 'color-mix(in oklab, var(--surface-2) 42%, var(--surface-1))',
                color: 'var(--text)',
                outlineColor: 'var(--ring-focus)',
            }}
        />
    );
}

function TextareaBase(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
    return (
        <textarea
            {...props}
            className={cn(
                'w-full rounded-xl border px-3 py-2.5 text-sm transition',
                'focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2',
                'placeholder:opacity-60',
                props.className,
            )}
            style={{
                borderColor: 'var(--border-soft)',
                background: 'color-mix(in oklab, var(--surface-2) 42%, var(--surface-1))',
                color: 'var(--text)',
                outlineColor: 'var(--ring-focus)',
            }}
        />
    );
}

type Status = { state: 'idle' } | { state: 'loading' } | { state: 'success' } | { state: 'error'; message: string };

export default function ContactForm() {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [subject, setSubject] = React.useState('Demande de contact');
    const [message, setMessage] = React.useState('');

    // honeypot
    const [company, setCompany] = React.useState('');

    const [status, setStatus] = React.useState<Status>({ state: 'idle' });

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setStatus({ state: 'loading' });

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, subject, message, company }),
            });

            const data = (await res.json()) as { ok: boolean; error?: string };

            if (!res.ok || !data.ok) {
                setStatus({ state: 'error', message: data.error ?? 'Erreur lors de l’envoi.' });
                return;
            }

            setStatus({ state: 'success' });
            setMessage('');
        } catch {
            setStatus({ state: 'error', message: 'Impossible de contacter le serveur.' });
        }
    }

    return (
        <form onSubmit={onSubmit} className="panel p-6 sm:p-8">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <h2 className="text-lg font-semibold" style={{ color: 'var(--text-strong)' }}>
                        Envoyer un message
                    </h2>
                    <p className="mt-1 text-sm opacity-75">Ton email sert uniquement à te recontacter.</p>
                </div>

                <div className="text-xs opacity-70">{status.state === 'loading' ? 'Envoi…' : status.state === 'success' ? 'Message envoyé ✓' : ''}</div>
            </div>

            {/* honeypot */}
            <div className="hidden" aria-hidden>
                <label htmlFor="company">Company</label>
                <input id="company" value={company} onChange={(e) => setCompany(e.target.value)} />
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                    <FieldLabel htmlFor="name">Nom</FieldLabel>
                    <InputBase id="name" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Ex : Marie Dupont" autoComplete="name" />
                </div>

                <div className="grid gap-2">
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <InputBase
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Ex : marie@domaine.com"
                        autoComplete="email"
                    />
                </div>
            </div>

            <div className="mt-4 grid gap-2">
                <FieldLabel htmlFor="subject">Sujet</FieldLabel>
                <InputBase id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
            </div>

            <div className="mt-4 grid gap-2">
                <FieldLabel htmlFor="message">Message</FieldLabel>
                <TextareaBase
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={7}
                    placeholder="Contexte, objectifs, contraintes, liens (si besoin)…"
                />
            </div>

            {/* Alerts */}
            {status.state === 'error' ? (
                <div
                    className="mt-4 rounded-2xl border px-4 py-3 text-sm"
                    style={{
                        borderColor: 'color-mix(in oklab, var(--gold) 45%, var(--border-soft))',
                        background: 'color-mix(in oklab, var(--gold) 10%, var(--surface-1))',
                    }}
                >
                    <span style={{ color: 'var(--text-strong)' }}>Erreur :</span> <span className="opacity-85">{status.message}</span>
                </div>
            ) : null}

            {status.state === 'success' ? (
                <div
                    className="mt-4 rounded-2xl border px-4 py-3 text-sm"
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
                    className="btn btn-cta inline-flex items-center gap-2"
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
