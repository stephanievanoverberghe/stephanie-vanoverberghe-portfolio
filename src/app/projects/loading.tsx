export default function ProjectsGridLoading() {
    return (
        <section className="container-page py-10 animate-pulse">
            <div className="h-7 w-48 rounded-md" style={{ background: 'var(--surface-2)' }} />
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="rounded-2xl border" style={{ borderColor: 'var(--border-soft)', background: 'var(--surface-1)' }}>
                        <div className="aspect-[3/2] w-full rounded-t-2xl" style={{ background: 'var(--surface-2)' }} />
                        <div className="p-4 space-y-3">
                            <div className="h-5 w-2/3 rounded" style={{ background: 'var(--surface-2)' }} />
                            <div className="h-4 w-1/3 rounded" style={{ background: 'var(--surface-2)' }} />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
