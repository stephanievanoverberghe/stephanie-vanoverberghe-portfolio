// src/components/skills/SkillsCta.tsx
import Link from 'next/link';

export default function SkillsCTA() {
    return (
        <section className="panel p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h2 className="text-base sm:text-lg font-semibold" style={{ color: 'var(--text-strong)' }}>
                        Disponible pour un poste front-end
                    </h2>
                    <p className="mt-1 opacity-85">Je peux présenter ces études de cas en format entretien (décisions, trade-offs, perf/a11y, structure).</p>
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
