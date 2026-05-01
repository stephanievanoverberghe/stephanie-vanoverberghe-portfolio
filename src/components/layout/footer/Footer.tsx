import Link from 'next/link';
import { FooterCta } from './FooterCta';
import { FooterLinks } from './FooterLinks';
import { footerContent } from '@/content/footer';

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer role="contentinfo" className="mt-16 border-t border-(--border-soft)">
            <div className="container-page py-10 sm:py-12">
                <div className="space-y-8">
                    <FooterCta />
                    <FooterLinks />

                    <div className="flex flex-col gap-4 border-t border-(--border-soft) pt-6 text-sm lg:flex-row lg:items-center lg:justify-between">
                        <div className="space-y-2">
                            <p className="font-medium text-(--text)">
                                © {year} — {footerContent.legal.copyrightTemplate}
                            </p>

                            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                                {footerContent.legal.links.map((link) => (
                                    <Link key={link.href} href={link.href} className="font-semibold text-(--text-muted) transition hover:text-(--accent)">
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <a href="#top" className="font-semibold text-(--accent)" aria-label={footerContent.legal.backToTopAriaLabel}>
                            {footerContent.legal.backToTopLabel}
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
