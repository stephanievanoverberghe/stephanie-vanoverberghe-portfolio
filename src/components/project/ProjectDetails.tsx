import Chip from '@/components/ui/Chip';
import type { Project } from '@/lib/projects';

function ListCard({ title, items, tone }: { title: string; items?: string[]; tone: 'accent' | 'sage' | 'lilac' | 'gold' }) {
    if (!items?.length) return null;

    return (
        <section className="panel relative overflow-hidden p-6">
            <span
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-40"
                style={{
                    background: `radial-gradient(circle, color-mix(in oklab, var(--${tone}) 30%, transparent), transparent 62%)`,
                }}
            />

            <div className="relative flex items-center justify-between gap-3">
                <h3 className="section-title text-base">{title}</h3>
                <Chip size="xs" color={tone}>
                    {items.length}
                </Chip>
            </div>

            <ul className="relative mt-4 space-y-2 text-sm text-(--text)">
                {items.map((item) => (
                    <li key={item} className="flex gap-2">
                        <span aria-hidden>•</span>
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export function hasProjectDetails(project: Project) {
    return Boolean(
        project.vision ||
        project.objectives?.length ||
        project.challenges?.length ||
        project.solutions?.length ||
        project.highlights?.length ||
        project.metrics?.length ||
        project.notableDecisions?.length ||
        project.productPrinciples?.length ||
        project.editorialFoundations?.length ||
        project.uxHighlights?.length ||
        project.uiHighlights?.length ||
        project.nextSteps?.length ||
        project.testing?.strategy ||
        project.testing?.coverage?.length ||
        project.architecture?.summary ||
        project.architecture?.keyPoints?.length ||
        project.architecture?.sections?.length,
    );
}

export default function ProjectDetails({ project }: { project: Project }) {
    const p = project;

    if (!hasProjectDetails(project)) return null;

    return (
        <section className="space-y-6">
            {p.vision ? (
                <section className="panel p-6">
                    <div className="flex items-center justify-between gap-3">
                        <h3 className="section-title text-base">Vision produit</h3>
                        <Chip size="xs" color="accent">
                            Positionnement
                        </Chip>
                    </div>
                    <p className="mt-3 text-sm text-(--text)">{p.vision}</p>
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
                        <h3 className="section-title text-base">Points forts</h3>
                        <Chip size="xs" color="accent">
                            Résultats
                        </Chip>
                    </div>

                    <ul className="mt-4 grid gap-2 text-sm text-(--text) sm:grid-cols-2">
                        {p.highlights.map((item) => (
                            <li key={item} className="flex gap-2">
                                <span aria-hidden>•</span>
                                <span>{item}</span>
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
                        <h3 className="section-title text-base">Testing & qualité</h3>
                        <Chip size="xs" color="accent">
                            Fiabilité
                        </Chip>
                    </div>

                    {p.testing.strategy ? <p className="mt-3 text-sm text-(--text)">{p.testing.strategy}</p> : null}
                    {p.testing.coverage?.length ? (
                        <ul className="mt-4 space-y-2 text-sm text-(--text)">
                            {p.testing.coverage.map((item) => (
                                <li key={item} className="flex gap-2">
                                    <span aria-hidden>•</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    ) : null}
                </section>
            ) : null}

            {p.architecture?.summary || p.architecture?.keyPoints?.length || p.architecture?.sections?.length ? (
                <section className="panel space-y-4 p-6">
                    <div className="flex items-center justify-between gap-3">
                        <h3 className="section-title text-base">Architecture</h3>
                        <Chip size="xs" color="gold">
                            Structure
                        </Chip>
                    </div>

                    {p.architecture.summary ? <p className="text-sm text-(--text)">{p.architecture.summary}</p> : null}
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
