// src/components/project/ProjectSections.tsx
import Chip from '@/components/ui/Chip';
import type { Project } from '@/lib/projects';

function ListCard({ title, items, tone }: { title: string; items?: string[]; tone: 'accent' | 'sage' | 'lilac' | 'gold' }) {
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
            {p.vision ? (
                <section className="panel p-6">
                    <div className="flex items-center justify-between gap-3">
                        <h3 className="text-base section-title">Vision produit</h3>
                        <Chip size="xs" color="accent">
                            Positionnement
                        </Chip>
                    </div>
                    <p className="mt-3 text-sm opacity-90">{p.vision}</p>
                </section>
            ) : null}

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
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <ListCard title="Résultats mesurables" items={p.metrics} tone="accent" />
                <ListCard title="Décisions techniques marquantes" items={p.notableDecisions} tone="gold" />
                <ListCard title="Principes produit" items={p.productPrinciples} tone="sage" />
                <ListCard title="Fondations éditoriales" items={p.editorialFoundations} tone="lilac" />
                <ListCard title="Points UX" items={p.uxHighlights} tone="accent" />
                <ListCard title="Points UI" items={p.uiHighlights} tone="lilac" />
                <ListCard title="Prochaines étapes" items={p.nextSteps} tone="sage" />
            </div>

            {p.testing?.strategy || p.testing?.coverage?.length ? (
                <section className="panel p-6">
                    <div className="flex items-center justify-between gap-3">
                        <h3 className="text-base section-title">Testing & qualité</h3>
                        <Chip size="xs" color="accent">
                            Fiabilité
                        </Chip>
                    </div>

                    {p.testing.strategy ? <p className="mt-3 text-sm opacity-90">{p.testing.strategy}</p> : null}
                    {p.testing.coverage?.length ? (
                        <ul className="mt-4 space-y-2 text-sm opacity-90">
                            {p.testing.coverage.map((it) => (
                                <li key={it} className="flex gap-2">
                                    <span aria-hidden>•</span>
                                    <span>{it}</span>
                                </li>
                            ))}
                        </ul>
                    ) : null}
                </section>
            ) : null}

            {p.architecture?.summary || p.architecture?.keyPoints?.length || p.architecture?.sections?.length ? (
                <section className="panel p-6 space-y-4">
                    <div className="flex items-center justify-between gap-3">
                        <h3 className="text-base section-title">Architecture</h3>
                        <Chip size="xs" color="gold">
                            Structure
                        </Chip>
                    </div>

                    {p.architecture.summary ? <p className="text-sm opacity-90">{p.architecture.summary}</p> : null}
                    <ListCard title="Points clés" items={p.architecture.keyPoints} tone="gold" />

                    {p.architecture.sections?.length ? (
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {p.architecture.sections.map((section) => (
                                <ListCard key={section.title} title={section.title} items={section.items} tone="sage" />
                            ))}
                        </div>
                    ) : null}
                </section>
            ) : null}
        </section>
    );
}
