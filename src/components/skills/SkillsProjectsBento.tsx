// src/components/skills/SkillsProjectsBento.tsx
import SkillsProjectTile from '@/components/skills/SkillsProjectTile';

export default function SkillsProjectsBento() {
    return (
        <section className="space-y-5">
            <div className="space-y-2">
                <span className="text-xs uppercase tracking-[0.14em]" style={{ color: 'var(--accent)' }}>
                    Études de cas
                </span>
                <h2 className="text-lg font-semibold" style={{ color: 'var(--text-strong)' }}>
                    Mise en pratique sur projets réels
                </h2>
                <p className="text-sm opacity-80 max-w-[85ch]">
                    Chaque projet illustre une capacité : clarifier un parcours, exécuter une UI premium, et garder une base technique propre (perf/SEO/a11y).
                </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* big */}
                <div className="lg:col-span-2">
                    <SkillsProjectTile
                        size="lg"
                        title="Mystères à la carte"
                        subtitle="Escape game culinaire — landing immersive & conversion"
                        hrefCase="/projects/mysteres-a-la-carte"
                        demoUrl="https://mysteres-a-la-carte.vercel.app/"
                        cover="/images/projects/mysteres-a-la-carte/desktop-hero.png"
                        coverAlt="Aperçu Mystères à la carte"
                        tags={['Next.js', 'TypeScript', 'Tailwind', 'UI/UX', 'Framer Motion']}
                        highlights={['Dark UI lisible', 'Parcours vers réservation', 'Micro-interactions sobres']}
                        tone="accent"
                    />
                </div>

                {/* small column */}
                <div className="grid gap-6">
                    <SkillsProjectTile
                        size="sm"
                        title="Alchimiste Créations"
                        subtitle="Vitrine freelance — offre claire & crédible"
                        hrefCase="/projects/alchimiste-creations"
                        demoUrl="https://alchimiste-creations.vercel.app/"
                        cover="/images/projects/alchimiste-creations/desktop-hero.png"
                        coverAlt="Aperçu Alchimiste Créations"
                        tags={['Next.js', 'TypeScript', 'Tailwind', 'SSG/SEO']}
                        highlights={['Structure scannable', 'CTA cohérents', 'Base SEO/OG']}
                        tone="lilac"
                    />

                    <SkillsProjectTile
                        size="sm"
                        title="Ancre-toi"
                        subtitle="Formation — Stripe & accès via logique produit"
                        hrefCase="/projects/ancre-toi"
                        demoUrl="https://ancretoi.vercel.app/"
                        cover="/images/projects/ancre-toi/desktop-hero.png"
                        coverAlt="Aperçu Ancre-toi"
                        tags={['Next.js', 'MongoDB', 'Stripe', 'Webhooks']}
                        highlights={['Parcours pédagogique', 'Activation accès', 'Espace membre clair']}
                        tone="sage"
                    />
                </div>
            </div>
        </section>
    );
}
