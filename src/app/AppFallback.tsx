// src/app/AppFallback.tsx

export default function AppFallback() {
    return (
        <div className="container-page py-10 animate-pulse">
            <div className="h-7 w-2/3 rounded-md" style={{ background: 'var(--surface-2)' }} />
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="rounded-2xl border" style={{ borderColor: 'var(--border-soft)', background: 'var(--surface-1)' }}>
                        <div className="h-40 rounded-2xl" style={{ background: 'var(--surface-2)' }} />
                        <div className="p-4 space-y-3">
                            <div className="h-4 w-2/3 rounded" style={{ background: 'var(--surface-2)' }} />
                            <div className="h-4 w-1/3 rounded" style={{ background: 'var(--surface-2)' }} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
