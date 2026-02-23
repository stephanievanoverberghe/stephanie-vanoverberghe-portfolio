// src/components/skills/SkillsProjectsBento.tsx
import type { Project } from '@/lib/projects';
import SkillsProjectTile from '@/components/skills/SkillsProjectTile';

type Props = {
    projects: Project[];
};

function coverSrc(p: Project) {
    return p.hero?.image ?? p.logo?.image ?? '/images/projects/placeholder.png';
}

function coverAlt(p: Project) {
    return p.hero?.alt ?? p.logo?.alt ?? p.title;
}

function pickTags(p: Project) {
    // On privilégie stack, sinon role
    const tags = [...(p.stack ?? []), ...(p.role ?? [])].filter(Boolean);
    return tags.slice(0, 6);
}

function pickHighlights(p: Project) {
    const h = (p.highlights ?? []).filter(Boolean);
    return h.length ? h.slice(0, 3) : ['UI/UX', 'Perf/SEO', 'Accessibilité'];
}

function sortMostRecentFirst(projects: Project[]) {
    // Si tu as `year` (number) : c’est parfait
    // Sinon on retombe sur l’ordre d’entrée
    return [...projects].sort((a, b) => {
        const ay = typeof a.year === 'number' ? a.year : -1;
        const by = typeof b.year === 'number' ? b.year : -1;
        return by - ay;
    });
}

export default function SkillsProjectsBento({ projects }: Props) {
    const ordered = sortMostRecentFirst(projects);
    const last3 = ordered.slice(0, 3);

    const p0 = last3[0];
    const p1 = last3[1];
    const p2 = last3[2];

    if (!p0) return null;

    return (
        <section className="space-y-5">
            <div className="space-y-2">
                <span className="text-xs uppercase tracking-[0.14em] text-(--accent)">Études de cas</span>
                <h2 className="text-lg font-semibold text-(--text-strong)">Mise en pratique sur projets réels</h2>
                <p className="text-sm opacity-80 max-w-[85ch]">
                    Chaque projet illustre une capacité : clarifier un parcours, exécuter une UI premium, et garder une base technique propre (perf/SEO/a11y).
                </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* big (le plus récent) */}
                <div className="lg:col-span-2">
                    <SkillsProjectTile
                        size="lg"
                        title={p0.title}
                        subtitle={p0.subtitle ?? 'Étude de cas'}
                        hrefCase={`/projects/${p0.slug}`}
                        demoUrl={p0.links?.demo}
                        cover={coverSrc(p0)}
                        coverAlt={coverAlt(p0)}
                        tags={pickTags(p0)}
                        highlights={pickHighlights(p0)}
                        tone="accent"
                    />
                </div>

                {/* small column (2 suivants) */}
                <div className="grid gap-6">
                    {p1 ? (
                        <SkillsProjectTile
                            size="sm"
                            title={p1.title}
                            subtitle={p1.subtitle ?? 'Étude de cas'}
                            hrefCase={`/projects/${p1.slug}`}
                            demoUrl={p1.links?.demo}
                            cover={coverSrc(p1)}
                            coverAlt={coverAlt(p1)}
                            tags={pickTags(p1)}
                            highlights={pickHighlights(p1)}
                            tone="lilac"
                        />
                    ) : null}

                    {p2 ? (
                        <SkillsProjectTile
                            size="sm"
                            title={p2.title}
                            subtitle={p2.subtitle ?? 'Étude de cas'}
                            hrefCase={`/projects/${p2.slug}`}
                            demoUrl={p2.links?.demo}
                            cover={coverSrc(p2)}
                            coverAlt={coverAlt(p2)}
                            tags={pickTags(p2)}
                            highlights={pickHighlights(p2)}
                            tone="sage"
                        />
                    ) : null}
                </div>
            </div>
        </section>
    );
}
