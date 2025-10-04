export default function Loading() {
    return (
        <div className="container-page py-10 animate-pulse">
            <div className="h-8 w-1/2 rounded-md" style={{ background: 'var(--surface-2)' }} />
            <div className="mt-6 space-y-3">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="h-4 w-full max-w-[48ch] rounded" style={{ background: 'var(--surface-2)' }} />
                ))}
            </div>
        </div>
    );
}
