import Link from 'next/link';

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer role="contentinfo" className="mt-14 border-t" style={{ borderColor: 'var(--border-soft)' }}>
            {/* Ruban harmonique (écho du header) */}
            <div
                aria-hidden
                className="h-[3px] w-full"
                style={{
                    background: 'linear-gradient(90deg, var(--accent), var(--sage), var(--lilac), var(--gold))',
                }}
            />

            <div className="container-page py-10 space-y-10">
                {/* CTA final */}
                <section aria-label="Appel à l'action" className="rounded-2xl border p-6 sm:p-8" style={{ background: 'var(--surface-1)', borderColor: 'var(--border-soft)' }}>
                    <div className="grid items-center gap-6 sm:grid-cols-2">
                        <div>
                            <h2 className="text-xl sm:text-2xl font-semibold" style={{ color: 'var(--text-strong)' }}>
                                Envie de collaborer ?
                            </h2>
                            <p className="mt-2 opacity-80">Je recherche un poste front-end React/Next.js. Parlons de vos besoins.</p>
                        </div>
                        <div className="flex flex-wrap gap-3 sm:justify-end">
                            <Link
                                href="/contact"
                                className="btn btn-cta"
                                aria-label="Me contacter"
                                title="Me contacter"
                                style={{ color: '#FDFDFD' }} /* texte clair, pas blanc pur */
                            >
                                Me contacter
                            </Link>
                            <a href="/cv-vanoverberghe-stephanie.pdf" className="btn btn-secondary" aria-label="Télécharger mon CV en PDF" title="Télécharger mon CV">
                                Télécharger mon CV
                            </a>
                        </div>
                    </div>
                </section>

                {/* Corps du footer */}
                <section className="grid gap-8 sm:grid-cols-3">
                    {/* Identité */}
                    <div>
                        <div className="font-semibold tracking-wide" style={{ color: 'var(--text-strong)' }}>
                            Vanoverberghe Stéphanie
                        </div>
                        <p className="mt-1 text-sm opacity-80">Développeuse Front-End - React · Next.js · TypeScript · UI/UX</p>
                    </div>

                    {/* Navigation rapide */}
                    <nav aria-label="Liens du site" className="grid gap-2 content-start">
                        <Link href="/" className="text-sm hover:opacity-90">
                            Accueil
                        </Link>
                        <Link href="/projets" className="text-sm hover:opacity-90">
                            Projets
                        </Link>
                        <Link href="/competences" className="text-sm hover:opacity-90">
                            Compétences
                        </Link>
                        <Link href="/contact" className="text-sm hover:opacity-90">
                            Contact
                        </Link>
                    </nav>

                    {/* Raccourcis utiles */}
                    <div className="grid gap-2 content-start">
                        <a href="/cv-vanoverberghe-stephanie.pdf" className="text-sm hover:opacity-90">
                            CV (PDF)
                        </a>
                        <Link href="/contact" className="text-sm hover:opacity-90">
                            Me contacter
                        </Link>

                        <a href="https://github.com/stephanievanoverberghe" className="text-sm hover:opacity-90">
                            GitHub
                        </a>
                        <a href="https://www.linkedin.com/in/stephanie-vanoverberghe/" className="text-sm hover:opacity-90">
                            LinkedIn
                        </a>
                    </div>
                </section>

                <hr className="hr-soft" aria-hidden="true" />

                {/* Bas de page */}
                <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm" style={{ color: 'var(--text-strong)' }}>
                        © {year} Vanoverberghe Stéphanie - Portfolio React/Next.js
                    </p>
                    <p className="text-sm opacity-70">Construit avec Next.js · Tailwind · TypeScript · Framer Motion</p>
                    <a href="#" className="text-sm hover:opacity-90" aria-label="Revenir en haut de page">
                        Haut de page ↑
                    </a>
                </section>
            </div>
        </footer>
    );
}
