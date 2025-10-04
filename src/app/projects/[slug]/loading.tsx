export default function ProjectLoading() {
    return (
        <article className="container-page py-8 animate-pulse">
            {/* Hero 21:9 */}
            <div className="aspect-[21/9] w-full rounded-2xl" style={{ background: 'var(--surface-2)' }} />

            {/* Titre + sous-titre */}
            <div className="mt-6 h-8 w-2/3 rounded" style={{ background: 'var(--surface-2)' }} />
            <div className="mt-3 h-5 w-1/3 rounded" style={{ background: 'var(--surface-2)' }} />

            {/* Chips stack */}
            <div className="mt-5 flex flex-wrap gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="h-7 w-24 rounded-full border" style={{ background: 'var(--surface-1)', borderColor: 'var(--border-soft)' }} />
                ))}
            </div>

            {/* Paragraphes */}
            <div className="mt-6 space-y-3">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="h-4 w-full max-w-[72ch] rounded" style={{ background: 'var(--surface-2)' }} />
                ))}
            </div>

            {/* Galerie */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="aspect-[3/2] w-full rounded-2xl" style={{ background: 'var(--surface-2)' }} />
                ))}
            </div>
        </article>
    );
}
