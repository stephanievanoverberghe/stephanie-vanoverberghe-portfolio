// src/components/projects/ProjectsHero.tsx
export default function ProjectsHero() {
    return (
        <header className="relative overflow-hidden rounded-2xl border p-6 sm:p-8 border-(--border-soft) bg-(--surface-1) shadow-(--shadow-card)">
            <span
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.06]"
                style={{
                    backgroundImage: 'radial-gradient(1px 1px at 24px 24px, var(--text) 12%, transparent 13%)',
                }}
            />

            <div className="relative space-y-3">
                <p className="text-xs uppercase tracking-[0.14em] text-(--accent)">Projets</p>

                <h1 className="text-2xl sm:text-3xl font-semibold text-(--text-strong)">Études de cas & réalisations</h1>

                <p className="opacity-80 max-w-[70ch]">
                    Deux études de cas détaillées, et quelques projets plus légers. UI/UX, qualité front, performance et attention aux détails.
                </p>

                <div className="pt-2">
                    <div className="hr-soft" />
                </div>
            </div>
        </header>
    );
}
