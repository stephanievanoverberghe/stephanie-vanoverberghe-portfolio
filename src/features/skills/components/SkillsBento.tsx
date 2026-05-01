import { Code2, Database, Eye, Gauge, Workflow } from 'lucide-react';
import Chip from '@/components/ui/Chip';
import { skillsPageContent } from '@/content/skills-page';

const iconByKey = {
    frontend: Code2,
    design: Eye,
    quality: Gauge,
    workflow: Workflow,
    backend: Database,
} as const;

function SkillCard({ item }: { item: (typeof skillsPageContent.pillars.items)[number] }) {
    const Icon = iconByKey[item.key];

    return (
        <article
            className="surface-card surface-card-hover group relative overflow-hidden rounded-[1.8rem] p-5"
        >
            <span
                aria-hidden
                className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full opacity-35"
                style={{
                    background: `radial-gradient(circle, color-mix(in oklab, var(--${item.tone}) 30%, transparent), transparent 65%)`,
                }}
            />

            <div className="relative">
                <div className="grid h-12 w-12 place-items-center rounded-2xl border tone-accent-soft">
                    <Icon size={22} className="text-(--text-strong)" />
                </div>

                <h3 className="mt-5 text-xl font-semibold leading-tight tracking-[-0.04em] text-(--text-strong)">{item.title}</h3>

                <p className="mt-3 text-sm leading-6 text-(--text)">{item.desc}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                    {item.chips.map((chip) => (
                        <Chip key={chip.label} kind={chip.kind} size="sm">
                            {chip.label}
                        </Chip>
                    ))}
                </div>
            </div>
        </article>
    );
}

export default function SkillsBento() {
    const { pillars } = skillsPageContent;

    return (
        <section className="space-y-8">
            <div className="max-w-3xl">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-(--accent)">{pillars.kicker}</p>

                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-(--text-strong) sm:text-4xl">{pillars.title}</h2>

                <p className="mt-3 text-sm leading-6 text-(--text)">{pillars.intro}</p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {pillars.items.map((item, index) => (
                    <div key={item.key} className={pillars.items.length % 3 === 2 && index === pillars.items.length - 1 ? 'sm:col-span-2 xl:col-span-1' : ''}>
                        <SkillCard item={item} />
                    </div>
                ))}
            </div>
        </section>
    );
}
