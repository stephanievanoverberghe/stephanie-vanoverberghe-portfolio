// src/components/contact/ContactAside.tsx
import { Mail, Phone, FileText, Github, Linkedin, ArrowRight } from 'lucide-react';

function cn(...parts: Array<string | false | null | undefined>) {
    return parts.filter(Boolean).join(' ');
}

function ActionCard({ href, icon, title, desc, external }: { href: string; icon: React.ReactNode; title: string; desc?: string; external?: boolean }) {
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
                        {icon}
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
                    <ActionCard
                        href="mailto:stephanie-vanoverberghe@outlook.fr"
                        icon={<Mail size={18} aria-hidden />}
                        title="Email direct"
                        desc="stephanie-vanoverberghe@outlook.fr"
                    />
                    <ActionCard href="tel:+33624874771" icon={<Phone size={18} aria-hidden />} title="Téléphone" desc="06 24 87 47 71" />
                    <ActionCard
                        href="https://www.linkedin.com/in/stephanie-vanoverberghe/"
                        external
                        icon={<Linkedin size={18} aria-hidden />}
                        title="LinkedIn"
                        desc="Message / opportunités"
                    />
                    <ActionCard href="https://github.com/stephanievanoverberghe" external icon={<Github size={18} aria-hidden />} title="GitHub" desc="Code & projets" />
                    <ActionCard href="/cv-vanoverberghe-stephanie.pdf" external icon={<FileText size={18} aria-hidden />} title="CV (PDF)" desc="Téléchargement" />
                </div>

                {/* bloc simple, pro, sans “API” */}
                <div className="mt-4 rounded-2xl border p-4 text-sm border-(--border-soft) bg-(--surface-1)">
                    <div className="font-semibold text-(--text-strong)">Réponse rapide</div>
                    <div className="mt-1 opacity-80">Je réponds sous 24–48h (jours ouvrés).</div>
                </div>
            </div>
        </aside>
    );
}
