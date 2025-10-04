/* Styleguide privé pour QA visuelle — non indexé */
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Styleguide — Portfolio',
    robots: { index: false, follow: false },
};

export const dynamic = 'force-static';

function Swatch({ name, style }: { name: string; style: React.CSSProperties }) {
    return (
        <div className="flex items-center gap-3 rounded-xl border p-3" style={{ borderColor: 'var(--border-soft)', background: 'var(--surface-1)' }}>
            <div className="h-10 w-10 rounded-md border" style={{ ...style, borderColor: 'var(--border-soft)' }} />
            <div className="text-sm">
                <div className="font-medium" style={{ color: 'var(--text-strong)' }}>
                    {name}
                </div>
                <div className="opacity-70">var({name})</div>
            </div>
        </div>
    );
}

export default function StyleguidePage() {
    return (
        <div className="container-page py-10 space-y-10">
            <header>
                <h1 className="text-2xl sm:text-3xl font-semibold" style={{ color: 'var(--text-strong)' }}>
                    Styleguide — tokens & composants
                </h1>
                <p className="mt-2 opacity-80 max-w-[70ch]">
                    Page de vérification visuelle (non indexée). On s’assure que tout respire bien et que les couleurs sont harmonieuses — sans noir ni blanc purs.
                </p>
            </header>

            {/* Couleurs */}
            <section className="space-y-4">
                <h2 className="text-lg font-semibold" style={{ color: 'var(--text-strong)' }}>
                    Couleurs
                </h2>
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
                <h2 className="text-lg font-semibold" style={{ color: 'var(--text-strong)' }}>
                    Typographie
                </h2>
                <div className="card p-5">
                    <h1 className="text-3xl font-semibold" style={{ color: 'var(--text-strong)' }}>
                        Titre H1 — identité forte
                    </h1>
                    <h2 className="mt-3 text-2xl font-semibold" style={{ color: 'var(--text-strong)' }}>
                        Titre H2 — section
                    </h2>
                    <h3 className="mt-2 text-xl font-semibold" style={{ color: 'var(--text-strong)' }}>
                        Titre H3 — sous-section
                    </h3>
                    <p className="mt-3 opacity-90 max-w-[70ch]">
                        Paragraphe de démonstration. On contrôle la lisibilité, le contraste et le rythme. Les couleurs viennent des variables CSS déclarées dans{' '}
                        <code>globals.css</code>.
                    </p>
                    <a href="#" className="mt-2 inline-block hover:opacity-90" style={{ color: 'var(--accent)' }}>
                        Lien d’exemple →
                    </a>
                </div>
            </section>

            {/* Boutons */}
            <section className="space-y-4">
                <h2 className="text-lg font-semibold" style={{ color: 'var(--text-strong)' }}>
                    Boutons
                </h2>
                <div className="flex flex-wrap gap-3">
                    <button className="btn btn-cta" style={{ color: '#FDFDFD' }}>
                        CTA principal
                    </button>
                    <button className="btn btn-secondary">Secondaire</button>
                    <button className="btn btn-ghost">Ghost</button>
                </div>
            </section>

            {/* Chips */}
            <section className="space-y-4">
                <h2 className="text-lg font-semibold" style={{ color: 'var(--text-strong)' }}>
                    Chips
                </h2>
                <div className="flex flex-wrap gap-2">
                    <span className="chip">Default</span>
                    <span className="chip chip--accent">Accent</span>
                    <span className="chip chip--lilac">Lilas</span>
                </div>
            </section>

            {/* Cartes */}
            <section className="space-y-4">
                <h2 className="text-lg font-semibold" style={{ color: 'var(--text-strong)' }}>
                    Cartes
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="card p-5 hover-scale">
                        <div className="h-36 rounded-2xl border" style={{ background: 'var(--surface-2)', borderColor: 'var(--border-soft)' }} />
                        <h3 className="mt-4 font-medium" style={{ color: 'var(--text-strong)' }}>
                            Card — titre
                        </h3>
                        <p className="mt-1 opacity-80">Texte démonstration sur deux lignes maximum.</p>
                        <button className="mt-3 btn btn-secondary">Action</button>
                    </div>
                    <div className="card p-5 hover-scale">
                        <div className="h-36 rounded-2xl border" style={{ background: 'var(--surface-2)', borderColor: 'var(--border-soft)' }} />
                        <h3 className="mt-4 font-medium" style={{ color: 'var(--text-strong)' }}>
                            Card — variante
                        </h3>
                        <p className="mt-1 opacity-80">Autre exemple avec la même grille.</p>
                        <button className="mt-3 btn btn-cta" style={{ color: '#FDFDFD' }}>
                            Action
                        </button>
                    </div>
                </div>
            </section>

            {/* Helpers */}
            <section className="space-y-3">
                <h2 className="text-lg font-semibold" style={{ color: 'var(--text-strong)' }}>
                    Helpers
                </h2>
                <div className="hr-soft" />
                <div>
                    <a href="#top" className="text-sm hover:opacity-90" style={{ color: 'var(--accent)' }}>
                        Haut de page ↑
                    </a>
                </div>
            </section>
        </div>
    );
}
