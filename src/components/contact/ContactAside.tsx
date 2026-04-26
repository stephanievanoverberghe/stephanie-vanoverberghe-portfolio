import { ArrowRight, type LucideIcon } from 'lucide-react';

import { CONTACT_ACTIONS } from '@/content/contact';

function cn(...parts: Array<string | false | null | undefined>) {
    return parts.filter(Boolean).join(' ');
}

function ActionCard({ href, icon: Icon, title, desc, external }: { href: string; icon: LucideIcon; title: string; desc?: string; external?: boolean }) {
    return (
        <a
            href={href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
            className={cn('group rounded-2xl border p-4 transition border-(--border-soft) bg-(--surface-1) shadow-(--shadow-card)', 'hover:shadow-[0_14px_40px_rgba(2,8,23,0.10)]')}
        >
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                    <span
                        aria-hidden
                        className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-(--border-soft) bg-(color-mix(in oklab, var(--surface-2) 52%, var(--surface-1))) text-(--text-strong)"
                    >
                        <Icon size={18} aria-hidden />
                    </span>

                    <div>
                        <div className="text-sm font-semibold text-(--text-strong)">{title}</div>
                        {desc ? <div className="mt-0.5 text-xs opacity-75">{desc}</div> : null}
                    </div>
                </div>

                <ArrowRight size={16} aria-hidden className="opacity-60 transition group-hover:translate-x-0.5 group-hover:opacity-90" />
            </div>
        </a>
    );
}

export default function ContactAside() {
    return (
        <aside className="space-y-4 md:sticky md:top-24">
            <div className="panel p-6 bg-(color-mix(in oklab, var(--surface-2) 52%, var(--surface-1))) rounded-2xl border border-(--border-soft)">
                <h3 className="text-sm font-semibold text-(--text-strong)">Contact direct</h3>

                <div className="mt-4 grid gap-3">
                    {CONTACT_ACTIONS.map((action) => (
                        <ActionCard
                            key={`${action.title}-${action.href}`}
                            href={action.href}
                            icon={action.icon}
                            title={action.title}
                            desc={action.description}
                            external={action.external}
                        />
                    ))}
                </div>

                <div className="mt-4 rounded-2xl border p-4 text-sm border-(--border-soft) bg-(--surface-1)">
                    <div className="font-semibold text-(--text-strong)">Réponse rapide</div>
                    <div className="mt-1 opacity-80">Je réponds sous 24–48h (jours ouvrés).</div>
                </div>
            </div>
        </aside>
    );
}
