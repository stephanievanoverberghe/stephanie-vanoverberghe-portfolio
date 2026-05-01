/* Styleguide privé pour QA visuelle — non indexé */
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
    title: 'Styleguide — Portfolio',
    robots: { index: false, follow: false },
};

export const dynamic = 'force-static';

function isStyleguideEnabled() {
    if (process.env.STYLEGUIDE_ENABLED === 'true') return true;
    return process.env.NODE_ENV !== 'production';
}

function Swatch({ name, style }: { name: string; style: React.CSSProperties }) {
    return (
        <div className="flex items-center gap-3 rounded-xl border p-3 border-(--border-soft) bg-(--surface-1)">
            <div className="h-10 w-10 rounded-md border border-(--border-soft)" style={style} />
            <div className="text-sm">
                <div className="font-medium text-(--text-strong)">{name}</div>
                <div className="opacity-70">var({name})</div>
            </div>
        </div>
    );
}

export default function StyleguidePage() {
    if (!isStyleguideEnabled()) {
        notFound();
    }

    return (
        <div className="container-page py-10 space-y-10">
            <header>
                <h1 className="text-2xl sm:text-3xl font-semibold text-(--text-strong)">Styleguide — tokens & composants</h1>
                <p className="mt-2 opacity-80 max-w-[70ch]">
                    Page de vérification visuelle (non indexée). On s’assure que tout respire bien et que les couleurs sont harmonieuses — sans noir ni blanc purs.
                </p>
            </header>

            {/* Couleurs */}
            <section className="space-y-4">
                <h2 className="text-lg font-semibold text-(--text-strong)">Couleurs</h2>
                <div className="grid gap-3 sm:grid-cols-3">
                    <Swatch name="--ink" style={{ background: 'var(--ink)' }} />
                    <Swatch name="--paper" style={{ background: 'var(--paper)' }} />
                    <Swatch name="--accent" style={{ background: 'var(--accent)' }} />
                    <Swatch name="--sage" style={{ background: 'var(--sage)' }} />
                    <Swatch name="--lilac" style={{ background: 'var(--lilac)' }} />
                    <Swatch name="--gold" style={{ background: 'var(--gold)' }} />
                    <Swatch name="--surface-1" style={{ background: 'var(--surface-1)' }} />
                    <Swatch name="--surface-2" style={{ background: 'var(--surface-2)' }} />
                    <Swatch name="--text" style={{ background: 'var(--text)' }} />
                </div>
            </section>

            {/* Typographie */}
            <section className="space-y-4">
                <h2 className="text-lg font-semibold text-(--text-strong)">Typographie</h2>
                <div className="card p-5">
                    <p className="text-3xl font-semibold text-(--text-strong)">Titre H1 — identité forte</p>
                    <p className="mt-3 text-2xl font-semibold text-(--text-strong)">Titre H2 — section</p>
                    <p className="mt-2 text-xl font-semibold text-(--text-strong)">Titre H3 — sous-section</p>
                    <p className="mt-3 opacity-90 max-w-[70ch]">
                        Paragraphe de démonstration. On contrôle la lisibilité, le contraste et le rythme. Les couleurs viennent des variables CSS déclarées dans{' '}
                        <code>globals.css</code>.
                    </p>
                    <a href="#" className="mt-2 inline-block hover:opacity-90 text-(--accent)">
                        Lien d’exemple →
                    </a>
                </div>
            </section>

            {/* Boutons */}
            <section className="space-y-4">
                <h2 className="text-lg font-semibold text-(--text-strong)">Boutons</h2>
                <div className="flex flex-wrap gap-3">
                    <button className="btn btn-cta text-(--paper)">CTA principal</button>
                    <button className="btn btn-secondary">Secondaire</button>
                    <button className="btn btn-ghost">Ghost</button>
                </div>
            </section>

            {/* Chips */}
            <section className="space-y-4">
                <h2 className="text-lg font-semibold text-(--text-strong)">Chips</h2>
                <div className="flex flex-wrap gap-2">
                    <span className="chip">Default</span>
                    <span className="pill pill-accent">Accent</span>
                    <span className="surface-sage-soft rounded-full border px-3 py-1.5 text-sm font-semibold text-(--text-strong)">Sauge</span>
                </div>
            </section>

            {/* Cartes */}
            <section className="space-y-4">
                <h2 className="text-lg font-semibold text-(--text-strong)">Cartes</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="card p-5 hover-scale">
                        <div className="h-36 rounded-2xl border bg-(--surface-2) border-(--border-soft)" />
                        <h3 className="mt-4 font-medium text-(--text-strong)">Card — titre</h3>
                        <p className="mt-1 opacity-80">Texte démonstration sur deux lignes maximum.</p>
                        <button className="mt-3 btn btn-secondary">Action</button>
                    </div>
                    <div className="card p-5 hover-scale">
                        <div className="h-36 rounded-2xl border bg-(--surface-2) border-(--border-soft)" />
                        <h3 className="mt-4 font-medium text-(--text-strong)">Card — variante</h3>
                        <p className="mt-1 opacity-80">Autre exemple avec la même grille.</p>
                        <button className="mt-3 btn btn-cta text-(--paper)">Action</button>
                    </div>
                </div>
            </section>

            {/* Helpers */}
            <section className="space-y-3">
                <h2 className="text-lg font-semibold text-(--text-strong)">Helpers</h2>
                <div className="hr-soft" />
                <div>
                    <a href="#top" className="text-sm hover:opacity-90 text-(--accent)">
                        Haut de page ↑
                    </a>
                </div>
            </section>
        </div>
    );
}
