'use client';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    return (
        <div className="container-page py-16">
            <h1 className="text-2xl font-semibold" style={{ color: 'var(--text-strong)' }}>
                Oups… une erreur est survenue.
            </h1>
            <p className="mt-2 opacity-80">{process.env.NODE_ENV === 'development' ? error.message : 'Un imprévu est arrivé. On réessaie ?'}</p>
            <button onClick={reset} className="mt-6 btn btn-cta" aria-label="Réessayer" title="Réessayer">
                Réessayer
            </button>
        </div>
    );
}
