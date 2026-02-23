// src/app/projets/loading.tsx
export default function Loading() {
    return (
        <section className="container-page py-10 animate-pulse space-y-6">
            <div className="h-7 w-48 rounded-md bg-(--surface-2)" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="rounded-2xl border overflow-hidden bg-(--surface-1) border-(--border-soft)">
                        <div className="aspect-16/10 w-full bg-(--surface-2)" />
                        <div className="p-5 space-y-3">
                            <div className="h-5 w-2/3 rounded bg-(--surface-2)" />
                            <div className="h-4 w-1/2 rounded bg-(--surface-2)" />
                            <div className="mt-2 flex gap-2">
                                <div className="h-6 w-16 rounded-full bg-(--surface-2)" />
                                <div className="h-6 w-20 rounded-full bg-(--surface-2)" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
