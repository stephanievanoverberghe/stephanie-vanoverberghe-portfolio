import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { footerContent } from '@/content/footer';

function ExternalLink({ href, label }: { href: string; label: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="surface-card surface-card-hover group inline-flex items-center justify-between gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-(--text-strong)"
        >
            {label}
            <ArrowUpRight size={15} className="text-(--accent) transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
    );
}

export function FooterLinks() {
    return (
        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
            <div className="surface-card rounded-[1.6rem] p-5">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-(--accent)">{footerContent.profile.signature}</p>
                <h3 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-(--text-strong)">{footerContent.profile.name}</h3>

                <p className="mt-2 text-sm font-semibold text-(--text)">{footerContent.profile.role}</p>

                <p className="mt-4 max-w-md text-sm leading-6 text-(--text)">{footerContent.profile.intent}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                    {footerContent.profile.stack.map((item) => (
                        <span key={item} className="pill pill-soft">
                            {item}
                        </span>
                    ))}
                </div>

                <div className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-(--accent)">
                    <span className="h-2 w-2 rounded-full bg-(--accent)" aria-hidden />
                    {footerContent.profile.availability}
                </div>
            </div>

            <nav aria-label="Navigation rapide" className="surface-card rounded-[1.6rem] p-5">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-(--gold)">{footerContent.navigation.title}</p>

                <div className="mt-4 grid gap-2">
                    {footerContent.navigation.links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="group flex items-center justify-between rounded-2xl px-3 py-2 text-sm font-semibold text-(--text) transition hover:bg-(--surface-2) hover:text-(--text-strong)"
                        >
                            {link.label}
                            <span className="text-(--accent) opacity-0 transition group-hover:opacity-100">→</span>
                        </Link>
                    ))}
                </div>
            </nav>

            <div className="surface-card rounded-[1.6rem] p-5">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-(--gold)">{footerContent.links.title}</p>

                <div className="mt-4 grid gap-3">
                    <ExternalLink href={footerContent.links.resume.href} label={footerContent.links.resume.label} />
                    {footerContent.links.socials.map((link) => (
                        <ExternalLink key={link.href} href={link.href} label={link.label} />
                    ))}
                </div>
            </div>
        </section>
    );
}
