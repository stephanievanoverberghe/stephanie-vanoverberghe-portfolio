import Link from 'next/link';
import Chip from '@/components/ui/Chip';
import { whyMeContent } from '@/content/why-me';

function Kicker({ children }: { children: React.ReactNode }) {
    return <span className="text-xs uppercase tracking-[0.14em] text-(--accent)">{children}</span>;
}

function Stat({ label, value }: { label: string; value: string }) {
    return (
        <div
            className="rounded-2xl border px-4 py-3 border-(--border-soft)"
            style={{
                background: 'color-mix(in oklab, var(--surface-2) 58%, var(--surface-1))',
            }}
        >
            <div className="text-sm font-semibold text-(--text-strong)">{value}</div>
            <div className="text-xs opacity-75">{label}</div>
        </div>
    );
}

export default function SkillsHero() {
    return (
        <header className="relative overflow-hidden rounded-2xl border p-6 sm:p-10 border-(--border-soft) bg-(--surface-1) shadow-(--shadow-card)">
            <div className="relative space-y-6">
                <div className="space-y-2">
                    <Kicker>{whyMeContent.kicker}</Kicker>

                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-(--text-strong)">
                        {whyMeContent.title}
                        <span className="opacity-70"> · {whyMeContent.subtitle}</span>
                    </h1>

                    <p className="opacity-80 max-w-[80ch]">{whyMeContent.intro}</p>
                </div>

                <div className="hr-soft" />

                <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
                    <div className="space-y-5">
                        <div className="flex flex-wrap gap-2">
                            {whyMeContent.chips.map((chip) => (
                                <Chip key={chip.label} kind={chip.kind}>
                                    {chip.label}
                                </Chip>
                            ))}
                        </div>

                        <div
                            className="rounded-2xl border p-4 sm:p-5 border-(--border-soft)"
                            style={{
                                background: 'color-mix(in oklab, var(--surface-2) 54%, var(--surface-1))',
                            }}
                        >
                            <div className="text-sm font-semibold text-(--text-strong)">{whyMeContent.contributionTitle}</div>

                            <ul className="mt-3 space-y-2 text-sm opacity-85">
                                {whyMeContent.sections.map((section) => (
                                    <li key={section.icon} className="flex gap-2">
                                        <span aria-hidden>•</span>
                                        <span>{section.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <Link href="/projects" className="btn btn-secondary">
                                Voir les projets
                            </Link>
                            <Link href="/contact" className="btn btn-cta text-(--surface-1)">
                                Me contacter
                            </Link>
                        </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                        {whyMeContent.stats.map((stat) => (
                            <Stat key={stat.label} label={stat.label} value={stat.value} />
                        ))}
                    </div>
                </div>
            </div>
        </header>
    );
}
