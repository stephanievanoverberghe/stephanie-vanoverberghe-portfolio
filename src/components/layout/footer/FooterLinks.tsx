// src/components/layout/footer/FooterLinks.tsx

import Link from 'next/link';
import { FOOTER } from './footer.data';

function ExternalLink({ href, label }: { href: string; label: string }) {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="text-sm hover:opacity-90">
            {label}
        </a>
    );
}

export function FooterLinks() {
    return (
        <section className="grid gap-10 sm:grid-cols-3">
            <div>
                <div className="text-sm font-semibold" style={{ color: 'var(--text-strong)' }}>
                    {FOOTER.name}
                </div>
                <p className="mt-2 text-sm opacity-80">{FOOTER.role}</p>

                <div className="mt-4 inline-flex items-center gap-2 text-xs opacity-70">
                    <span className="h-2 w-2 rounded-full" style={{ background: 'var(--accent)' }} aria-hidden />
                    Disponible · France · Remote/Hybride
                </div>
            </div>

            <nav aria-label="Navigation rapide" className="grid gap-2 content-start">
                <div className="text-xs font-semibold uppercase tracking-[0.14em] opacity-70">Portfolio</div>
                {FOOTER.links.site.map((l) => (
                    <Link key={l.href} href={l.href} className="text-sm hover:opacity-90">
                        {l.label}
                    </Link>
                ))}
            </nav>

            <div className="grid gap-2 content-start">
                <div className="text-xs font-semibold uppercase tracking-[0.14em] opacity-70">Liens</div>
                <ExternalLink href={FOOTER.cvHref} label="CV (PDF)" />
                {FOOTER.links.socials.map((l) => (
                    <ExternalLink key={l.href} href={l.href} label={l.label} />
                ))}
            </div>
        </section>
    );
}
