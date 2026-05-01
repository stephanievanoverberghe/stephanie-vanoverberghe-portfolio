import { ArrowUpRight, type LucideIcon } from 'lucide-react';

import { contactContent } from '@/content/contact';

type ActionCardProps = {
    href: string;
    icon: LucideIcon;
    title: string;
    description: string;
    external?: boolean;
};

function ActionCard({ href, icon: Icon, title, description, external }: ActionCardProps) {
    return (
        <a
            href={href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
            className="group flex items-center justify-between gap-4 rounded-[1.4rem] border border-(--border-soft) bg-(--surface-1) p-4 transition hover:-translate-y-0.5 hover:shadow-[0_16px_42px_rgba(18,19,20,0.08)]"
        >
            <span className="flex min-w-0 items-center gap-3">
                <span
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border"
                    style={{
                        borderColor: 'color-mix(in oklab, var(--sage) 28%, var(--border-soft))',
                        background: 'color-mix(in oklab, var(--sage) 10%, var(--surface-1))',
                    }}
                >
                    <Icon size={18} className="text-(--text-strong)" />
                </span>

                <span className="min-w-0">
                    <span className="block text-sm font-semibold text-(--text-strong)">{title}</span>
                    <span className="mt-0.5 block truncate text-xs text-(--text)">{description}</span>
                </span>
            </span>

            <ArrowUpRight size={17} className="shrink-0 text-(--accent) transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
    );
}

export default function ContactAside() {
    const { aside } = contactContent;

    return (
        <aside className="space-y-5 lg:sticky lg:top-24">
            <section className="relative overflow-hidden rounded-4xl border border-(--border-soft) bg-(--surface-1) p-5 shadow-(--shadow-card) sm:p-6">
                <div aria-hidden className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-(--lilac)/25 blur-3xl" />

                <div className="relative">
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-(--accent)">{aside.kicker}</p>

                    <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-(--text-strong)">{aside.title}</h2>

                    <p className="mt-2 text-sm leading-6 text-(--text)">{aside.intro}</p>

                    <div className="mt-5 grid gap-3">
                        {contactContent.actions.map((action) => (
                            <ActionCard key={action.href} {...action} />
                        ))}
                    </div>
                </div>
            </section>

            <section
                className="rounded-[1.7rem] border border-(--border-soft) p-5"
                style={{
                    background: 'color-mix(in oklab, var(--sage) 10%, var(--surface-1))',
                }}
            >
                <p className="text-sm font-semibold text-(--text-strong)">{aside.noteTitle}</p>
                <p className="mt-2 text-sm leading-6 text-(--text)">{aside.note}</p>
            </section>
        </aside>
    );
}
