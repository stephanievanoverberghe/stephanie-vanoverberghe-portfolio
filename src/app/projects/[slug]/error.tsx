'use client';

export default function ProjectError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
    return (
        <article className="container-page py-16">
            <h2 className="text-xl font-semibold" style={{ color: 'var(--text-strong)' }}>
                Impossible de charger l’étude de cas.
            </h2>
            <p className="mt-2 opacity-80">Vérifie le slug du projet ou réessaie.</p>
            <button onClick={reset} className="mt-6 btn btn-secondary">
                Réessayer
            </button>
        </article>
    );
}
