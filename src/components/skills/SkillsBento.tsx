import { Code2, Eye, Gauge, Workflow } from 'lucide-react';
import Chip from '@/components/ui/Chip';
import { skillsPageContent } from '@/content/skills-page';

const iconByKey = {
    frontend: Code2,
    design: Eye,
    quality: Gauge,
    workflow: Workflow,
} as const;

function SkillCard({ item, size = 'md' }: { item: (typeof skillsPageContent.pillars.items)[number]; size?: 'lg' | 'md' }) {
    const Icon = iconByKey[item.key];

    const isLarge = size === 'lg';

    return (
        <article
            className={[
                'group relative overflow-hidden rounded-[1.8rem] border bg-(--surface-1) shadow-(--shadow-card) transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(18,19,20,0.08)]',
                isLarge ? 'p-7 lg:p-8' : 'p-5',
            ].join(' ')}
            style={{ borderColor: 'var(--border-soft)' }}
        >
            {/* glow */}
            <span
                aria-hidden
                className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full opacity-35"
                style={{
                    background: `radial-gradient(circle, color-mix(in oklab, var(--${item.tone}) 30%, transparent), transparent 65%)`,
                }}
            />

            <div className="relative">
                {/* icon */}
                <div
                    className="grid h-12 w-12 place-items-center rounded-2xl border"
                    style={{
                        borderColor: `color-mix(in oklab, var(--${item.tone}) 30%, var(--border-soft))`,
                        background: `color-mix(in oklab, var(--${item.tone}) 10%, var(--surface-1))`,
                    }}
                >
                    <Icon size={22} className="text-(--text-strong)" />
                </div>

                {/* title */}
                <h3 className={['mt-5 font-semibold leading-tight tracking-[-0.04em] text-(--text-strong)', isLarge ? 'text-3xl sm:text-4xl' : 'text-xl'].join(' ')}>
                    {item.title}
                </h3>

                {/* desc */}
                <p className="mt-3 text-sm leading-6 text-(--text)">{item.desc}</p>

                {/* chips */}
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

    const [a, b, c, d] = pillars.items;

    return (
        <section className="space-y-8">
            {/* Header */}
            <div className="max-w-3xl">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-(--accent)">{pillars.kicker}</p>

                <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-[-0.05em] text-(--text-strong)">{pillars.title}</h2>

                <p className="mt-3 text-sm leading-6 text-(--text)">{pillars.intro}</p>
            </div>

            {/* Grid */}
            <div className="grid gap-5 lg:grid-cols-3">
                {/* LEFT BIG */}
                <div className="lg:col-span-2">{a && <SkillCard item={a} size="lg" />}</div>

                {/* RIGHT TOP */}
                <div>{b && <SkillCard item={b} />}</div>

                {/* BOTTOM ROW */}
                <div className="lg:col-span-3 grid gap-5 sm:grid-cols-2">
                    {c && <SkillCard item={c} />}
                    {d && <SkillCard item={d} />}
                </div>
            </div>
        </section>
    );
}
