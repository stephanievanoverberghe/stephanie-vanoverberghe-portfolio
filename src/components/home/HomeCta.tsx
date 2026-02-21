// src/components/home/HomeCta.tsx
import Link from 'next/link';

export default function HomeCta() {
    return (
        <section className="card p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <p className="text-sm uppercase tracking-[0.14em] opacity-70">Contact</p>
                    <p className="mt-2 text-base font-semibold" style={{ color: 'var(--text-strong)' }}>
                        Disponible pour un poste Front-End React / Next.js
                    </p>
                    <p className="mt-1 text-sm opacity-80">Je réponds rapidement — échange possible cette semaine.</p>
                </div>

                <div className="flex flex-wrap gap-3">
                    <a href="/cv-vanoverberghe-stephanie.pdf" className="btn btn-secondary">
                        Télécharger mon CV
                    </a>
                    <Link href="/contact" className="btn btn-cta" style={{ color: '#FDFDFD' }}>
                        Me contacter
                    </Link>
                </div>
            </div>
        </section>
    );
}
