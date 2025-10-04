'use client';

import { useState } from 'react';

export default function ContactPage() {
    const [name, setName] = useState('');
    const [mail, setMail] = useState('');
    const [subject, setSubject] = useState('Demande de contact via le portfolio');
    const [message, setMessage] = useState('');

    const TO = 'ton.email@domaine.com'; // ← remplace ici

    function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        const body = `Bonjour Stéphanie,%0D%0A%0D%0A${encodeURIComponent(message)}%0D%0A%0D%0A— ${encodeURIComponent(name)} (${encodeURIComponent(mail)})`;
        const href = `mailto:${TO}?subject=${encodeURIComponent(subject)}&body=${body}`;
        window.location.href = href;
    }

    return (
        <section className="container-page py-10 space-y-8">
            <header>
                <h1 className="text-2xl sm:text-3xl font-semibold" style={{ color: 'var(--text-strong)' }}>
                    Me contacter
                </h1>
                <p className="mt-2 opacity-80 max-w-[65ch]">Un projet, une idée, une opportunité ? Écris-moi - réponse rapide.</p>
            </header>

            <form onSubmit={onSubmit} className="card p-6 sm:p-8">
                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                        <label htmlFor="name" className="text-sm" style={{ color: 'var(--text-strong)' }}>
                            Votre nom
                        </label>
                        <input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="rounded-lg border px-3 py-2 bg-[var(--surface-1)]"
                            style={{ borderColor: 'var(--border-soft)', color: 'var(--text)' }}
                        />
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="mail" className="text-sm" style={{ color: 'var(--text-strong)' }}>
                            Votre email
                        </label>
                        <input
                            id="mail"
                            type="email"
                            value={mail}
                            onChange={(e) => setMail(e.target.value)}
                            required
                            className="rounded-lg border px-3 py-2 bg-[var(--surface-1)]"
                            style={{ borderColor: 'var(--border-soft)', color: 'var(--text)' }}
                        />
                    </div>
                </div>

                <div className="mt-4 grid gap-2">
                    <label htmlFor="subject" className="text-sm" style={{ color: 'var(--text-strong)' }}>
                        Sujet
                    </label>
                    <input
                        id="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="rounded-lg border px-3 py-2 bg-[var(--surface-1)]"
                        style={{ borderColor: 'var(--border-soft)', color: 'var(--text)' }}
                    />
                </div>

                <div className="mt-4 grid gap-2">
                    <label htmlFor="message" className="text-sm" style={{ color: 'var(--text-strong)' }}>
                        Message
                    </label>
                    <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        rows={6}
                        className="rounded-lg border px-3 py-2 bg-[var(--surface-1)]"
                        style={{ borderColor: 'var(--border-soft)', color: 'var(--text)' }}
                    />
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                    <button type="submit" className="btn btn-cta" style={{ color: '#FDFDFD' }}>
                        Envoyer
                    </button>
                    <a href={`mailto:${TO}`} className="btn btn-secondary">
                        Écrire directement
                    </a>
                </div>
            </form>

            {/* Liens externes (nouvel onglet, sécurisé) */}
            <aside className="rounded-2xl border p-5" style={{ background: 'var(--surface-1)', borderColor: 'var(--border-soft)' }}>
                <h2 className="text-lg font-semibold" style={{ color: 'var(--text-strong)' }}>
                    Raccourcis
                </h2>
                <div className="mt-3 flex flex-wrap gap-4">
                    <a href="https://github.com/stephanievanoverberghe" target="_blank" rel="noopener noreferrer" className="text-sm hover:opacity-90">
                        GitHub
                    </a>
                    <a href="https://www.linkedin.com/in/stephanie-vanoverberghe/" target="_blank" rel="noopener noreferrer" className="text-sm hover:opacity-90">
                        LinkedIn
                    </a>
                    <a href="/cv-vanoverberghe-stephanie.pdf" target="_blank" rel="noopener noreferrer" className="text-sm hover:opacity-90">
                        CV (PDF)
                    </a>
                </div>
            </aside>
        </section>
    );
}
