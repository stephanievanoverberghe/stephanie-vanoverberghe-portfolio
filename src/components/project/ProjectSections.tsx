// src/components/project/ProjectSections.tsx
import Chip from '@/components/ui/Chip';
import type { Project } from '@/lib/projects';

function ListCard({ title, items, tone }: { title: string; items?: string[]; tone: 'sage' | 'lilac' | 'gold' }) {
    if (!items?.length) return null;

    return (
        <section className="panel p-6 relative overflow-hidden">
            <span
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-40"
                style={{
                    background: `radial-gradient(circle, color-mix(in oklab, var(--${tone}) 30%, transparent), transparent 62%)`,
                }}
            />

            <div className="relative flex items-center justify-between gap-3">
                <h3 className="text-base section-title">{title}</h3>
                <Chip size="xs" color={tone}>
                    {items.length}
                </Chip>
            </div>

            <ul className="relative mt-4 space-y-2 text-sm opacity-90">
                {items.map((it) => (
                    <li key={it} className="flex gap-2">
                        <span aria-hidden>•</span>
                        <span>{it}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default function ProjectSections({ project }: { project: Project }) {
    const p = project;

    return (
        <section className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
                <ListCard title="Objectifs" items={p.objectives} tone="sage" />
                <ListCard title="Défis" items={p.challenges} tone="gold" />
                <ListCard title="Solutions" items={p.solutions} tone="lilac" />
            </div>

            {p.highlights?.length ? (
                <section className="panel p-6">
                    <div className="flex items-center justify-between gap-3">
                        <h3 className="text-base section-title">Points forts</h3>
                        <Chip size="xs" color="accent">
                            Résultats
                        </Chip>
                    </div>

                    <ul className="mt-4 grid gap-2 sm:grid-cols-2 text-sm opacity-90">
                        {p.highlights.map((it) => (
                            <li key={it} className="flex gap-2">
                                <span aria-hidden>•</span>
                                <span>{it}</span>
                            </li>
                        ))}
                    </ul>
                </section>
            ) : null}
        </section>
    );
}
