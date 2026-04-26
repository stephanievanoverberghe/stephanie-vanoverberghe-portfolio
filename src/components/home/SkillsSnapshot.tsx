// src/components/home/SkillsSnapshot.tsx

import { Code2, Eye, Gauge, Layers3 } from 'lucide-react';

import Chip from '@/components/ui/Chip';
import { chipPropsByKind } from './home.utils';

const skillsGroups = [
    {
        icon: Eye,
        kicker: 'Regard',
        title: 'Interface, usage & direction visuelle',
        text: 'Je pense l’interface comme un espace à lire, à comprendre et à parcourir : hiérarchie, rythme, contraste, cohérence et expérience utilisateur.',
        chips: [
            { label: 'UI/UX', kind: 'design' },
            { label: 'Design system', kind: 'design' },
            { label: 'Responsive', kind: 'design' },
            { label: 'Accessibilité', kind: 'architecture' },
        ],
    },
    {
        icon: Code2,
        kicker: 'Structure',
        title: 'Frontend React / Next.js',
        text: 'Je transforme une intention visuelle en composants React propres, maintenables et réutilisables, avec une attention particulière à la qualité du code.',
        chips: [
            { label: 'React', kind: 'tech' },
            { label: 'Next.js App Router', kind: 'tech' },
            { label: 'TypeScript', kind: 'tech' },
            { label: 'Tailwind CSS', kind: 'tech' },
        ],
    },
    {
        icon: Gauge,
        kicker: 'Qualité',
        title: 'Performance, accessibilité & finition',
        text: 'Je fais attention aux détails invisibles qui changent l’expérience : temps de chargement, rendu fluide, lisibilité, accessibilité et cohérence responsive.',
        chips: [
            { label: 'Performance Web', kind: 'architecture' },
            { label: 'A11y', kind: 'architecture' },
            { label: 'SEO technique', kind: 'architecture' },
            { label: 'Vercel', kind: 'tool' },
        ],
    },
    {
        icon: Layers3,
        kicker: 'Produit',
        title: 'Logique projet & livraison',
        text: 'J’aime comprendre le besoin avant de coder : clarifier l’objectif, organiser les contenus, découper les composants et livrer une interface solide.',
        chips: [
            { label: 'Git', kind: 'tool' },
            { label: 'Zod', kind: 'tech' },
            { label: 'MongoDB', kind: 'tech' },
            { label: 'Stripe', kind: 'tool' },
        ],
    },
] as const;

export default function SkillsSnapshot() {
    return (
        <section className="space-y-6">
            <div className="max-w-2xl">
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-(--accent)">Compétences</p>

                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-(--text-strong) sm:text-4xl">
                    Du regard créatif
                    <br className="hidden sm:block" /> à la structure front-end.
                </h2>

                <p className="mt-3 text-sm leading-6 text-(--text)">Mon approche mélange sensibilité visuelle, logique produit et construction React propre.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                {skillsGroups.map(({ icon: Icon, kicker, title, text, chips }) => (
                    <article
                        key={title}
                        className="group rounded-[1.6rem] border bg-(--surface-1) p-5 shadow-(--shadow-card) transition hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(18,19,20,0.08)]"
                        style={{ borderColor: 'var(--border-soft)' }}
                    >
                        <div className="flex items-start gap-4">
                            <div
                                className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border"
                                style={{
                                    borderColor: 'color-mix(in oklab, var(--accent) 28%, var(--border-soft))',
                                    background: 'color-mix(in oklab, var(--accent) 8%, var(--surface-1))',
                                }}
                            >
                                <Icon size={20} className="text-(--accent)" />
                            </div>

                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-(--accent)">{kicker}</p>

                                <h3 className="mt-1 text-lg font-semibold leading-snug text-(--text-strong)">{title}</h3>
                            </div>
                        </div>

                        <p className="mt-4 text-sm leading-6 text-(--text)">{text}</p>

                        <div className="mt-5 flex flex-wrap gap-2">
                            {chips.map((chip) => (
                                <Chip key={chip.label} {...chipPropsByKind(chip.kind)}>
                                    {chip.label}
                                </Chip>
                            ))}
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
