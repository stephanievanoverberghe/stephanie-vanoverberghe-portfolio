// src/app/projects/[slug]/loading.tsx
export default function ProjectLoading() {
    return (
        <article className="container-page py-12 animate-pulse">
            <div className="aspect-21/9 w-full rounded-2xl" style={{ background: 'var(--surface-2)' }} />
            <div className="mt-6 h-8 w-2/3 rounded" style={{ background: 'var(--surface-2)' }} />
            <div className="mt-3 h-5 w-1/3 rounded" style={{ background: 'var(--surface-2)' }} />

            <div className="mt-5 flex flex-wrap gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="h-7 w-24 rounded-full border" style={{ background: 'var(--surface-1)', borderColor: 'var(--border-soft)' }} />
                ))}
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-[1.25fr_.75fr]">
                <div className="rounded-2xl border p-6" style={{ background: 'var(--surface-1)', borderColor: 'var(--border-soft)' }}>
                    <div className="h-5 w-32 rounded" style={{ background: 'var(--surface-2)' }} />
                    <div className="mt-4 space-y-3">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="h-4 w-full rounded" style={{ background: 'var(--surface-2)' }} />
                        ))}
                    </div>
                </div>
                <div className="rounded-2xl border p-6" style={{ background: 'var(--surface-1)', borderColor: 'var(--border-soft)' }}>
                    <div className="h-5 w-32 rounded" style={{ background: 'var(--surface-2)' }} />
                    <div className="mt-4 space-y-3">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="h-4 w-full rounded" style={{ background: 'var(--surface-2)' }} />
                        ))}
                    </div>
                </div>
            </div>
        </article>
    );
}
