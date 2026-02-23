// src/components/layout/footer/Footer.tsx

import { FooterCta } from './FooterCta';
import { FooterLinks } from './FooterLinks';

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer role="contentinfo" className="mt-14 border-t border-(--border-soft)">
            <div className="container-page py-10 space-y-10">
                <FooterCta />
                <FooterLinks />

                <hr className="hr-soft" aria-hidden="true" />

                <section className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-(--text-strong)">© {year} — Portfolio React/Next.js</p>

                    <p className="text-sm opacity-70">Next.js · TypeScript · Tailwind · Framer Motion</p>

                    <a href="#top" className="text-sm hover:opacity-90" aria-label="Revenir en haut de page">
                        Haut de page ↑
                    </a>
                </section>
            </div>
        </footer>
    );
}
