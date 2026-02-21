// src/components/layout/footer/FooterCta.tsx

import Link from 'next/link';
import { FOOTER } from './footer.data';

export function FooterCta() {
    return (
        <section
            aria-label="Appel à l'action"
            className="relative overflow-hidden rounded-2xl border p-6 sm:p-8"
            style={{ background: 'var(--surface-1)', borderColor: 'var(--border-soft)', boxShadow: 'var(--shadow-card)' }}
        >
            {/* texture douce */}
            <span
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.06]"
                style={{ backgroundImage: 'radial-gradient(1px 1px at 24px 24px, var(--text) 12%, transparent 13%)' }}
            />

            <div className="relative grid items-center gap-6 sm:grid-cols-2">
                <div>
                    <h2 className="text-xl sm:text-2xl font-semibold" style={{ color: 'var(--text-strong)' }}>
                        Travaillons ensemble
                    </h2>
                    <p className="mt-2 opacity-80">Je recherche un poste front-end React/Next.js. Je suis disponible pour échanger rapidement.</p>
                </div>

                <div className="flex flex-wrap gap-3 sm:justify-end">
                    <Link href="/contact" className="btn btn-cta" style={{ color: '#FDFDFD' }}>
                        Me contacter
                    </Link>
                    <a href={FOOTER.cvHref} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
                        Télécharger mon CV
                    </a>
                </div>
            </div>
        </section>
    );
}
