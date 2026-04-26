import Link from 'next/link';
import { ArrowRight, Download } from 'lucide-react';

import { FOOTER } from './footer.data';

export function FooterCta() {
    return (
        <section
            aria-label="Appel à l'action"
            className="relative overflow-hidden rounded-4xl border bg-(--surface-1) p-6 shadow-(--shadow-card) sm:p-8 lg:p-10"
            style={{ borderColor: 'var(--border-soft)' }}
        >
            <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-(--lilac)/30 blur-3xl" />
            <div aria-hidden className="absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-(--sage)/25 blur-3xl" />

            <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.28em] text-(--gold)">Une interface à construire ?</p>

                    <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-[0.98] tracking-[-0.06em] text-(--text-strong) sm:text-5xl">
                        Créons quelque chose
                        <br />
                        de clair, utile et bien pensé.
                    </h2>

                    <p className="mt-5 max-w-2xl text-sm leading-6 text-(--text)">{FOOTER.intent}</p>
                </div>

                <div className="flex flex-wrap gap-3 lg:justify-end">
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-white transition hover:-translate-y-0.5"
                        style={{
                            background: 'linear-gradient(135deg, var(--accent), color-mix(in oklab, var(--accent) 78%, var(--ink)))',
                        }}
                    >
                        Me contacter
                        <ArrowRight size={17} />
                    </Link>

                    <a
                        href={FOOTER.cvHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-(--text-strong) transition hover:-translate-y-0.5"
                        style={{
                            borderColor: 'color-mix(in oklab, var(--gold) 46%, var(--border-soft))',
                            background: 'color-mix(in oklab, var(--gold) 12%, var(--surface-1))',
                        }}
                    >
                        <Download size={17} />
                        CV
                    </a>
                </div>
            </div>
        </section>
    );
}
