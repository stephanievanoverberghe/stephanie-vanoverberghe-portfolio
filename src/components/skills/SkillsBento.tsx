// src/components/skills/SkillsBento.tsx
import { Code2, LayoutGrid, Workflow, Boxes } from 'lucide-react';
import Chip from '@/components/ui/Chip';

function BentoCard({
    icon: Icon,
    title,
    desc,
    tone,
    items,
}: {
    icon: React.ElementType;
    title: string;
    desc: string;
    tone: 'accent' | 'sage' | 'lilac' | 'gold';
    items: Array<{ kind: 'tech' | 'design' | 'tool' | 'architecture'; label: string }>;
}) {
    return (
        <article className="panel p-6 relative overflow-hidden">
            <span
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-35"
                style={{ background: `radial-gradient(circle, color-mix(in oklab, var(--${tone}) 30%, transparent), transparent 62%)` }}
            />

            <div className="relative flex items-start gap-3">
                <div
                    className="shrink-0 h-11 w-11 rounded-2xl border flex items-center justify-center border-(--border-soft) shadow-(--shadow-card)"
                    style={{ background: 'color-mix(in oklab, var(--surface-2) 58%, var(--surface-1))' }}
                >
                    <Icon className="h-5 w-5 text-(--text-strong)" />
                </div>

                <div className="min-w-0">
                    <h2 className="text-base sm:text-lg font-semibold text-(--text-strong)">{title}</h2>
                    <p className="mt-1 text-sm opacity-80">{desc}</p>

                    <div className="mt-4 flex flex-wrap gap-2">
                        {items.map((c) => (
                            <Chip key={c.label} kind={c.kind} size="sm">
                                {c.label}
                            </Chip>
                        ))}
                    </div>
                </div>
            </div>
        </article>
    );
}

export default function SkillsBento() {
    return (
        <section className="space-y-4">
            <h2 className="text-lg font-semibold text-(--text-strong)">Piliers</h2>

            <div className="grid gap-6 lg:grid-cols-3">
                <div className="grid gap-6 lg:col-span-2">
                    <BentoCard
                        icon={Code2}
                        title="Front-end"
                        desc="Composants solides, App Router, rendu, patterns de pages."
                        tone="accent"
                        items={[
                            { kind: 'tech', label: 'React' },
                            { kind: 'tech', label: 'Next.js' },
                            { kind: 'tech', label: 'TypeScript' },
                            { kind: 'tech', label: 'Tailwind' },
                            { kind: 'tech', label: 'next/image' },
                        ]}
                    />

                    <BentoCard
                        icon={LayoutGrid}
                        title="UI/UX"
                        desc="Lisibilité, hiérarchie, micro-interactions, empathie produit."
                        tone="lilac"
                        items={[
                            { kind: 'design', label: 'Design system' },
                            { kind: 'design', label: 'Micro-interactions' },
                            { kind: 'design', label: 'Accessibilité' },
                            { kind: 'design', label: 'UX writing' },
                        ]}
                    />
                </div>

                <div className="grid gap-6">
                    <BentoCard
                        icon={Workflow}
                        title="Workflow"
                        desc="Qualité front + déploiement, vérifs, hygiène repo."
                        tone="sage"
                        items={[
                            { kind: 'tool', label: 'Git' },
                            { kind: 'tool', label: 'Vercel' },
                            { kind: 'tool', label: 'ESLint/Prettier' },
                            { kind: 'tool', label: 'Lighthouse' },
                        ]}
                    />

                    <BentoCard
                        icon={Boxes}
                        title="Architecture"
                        desc="Perf, SEO technique, patterns de rendu, images."
                        tone="gold"
                        items={[
                            { kind: 'architecture', label: 'RSC + Suspense' },
                            { kind: 'architecture', label: 'SSG/ISR' },
                            { kind: 'architecture', label: 'SEO technique' },
                            { kind: 'architecture', label: 'A11y AA' },
                        ]}
                    />
                </div>
            </div>
        </section>
    );
}
