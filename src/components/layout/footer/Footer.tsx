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

                    <div className="flex flex-col gap-3 border-t border-(--border-soft) pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
                        <p className="font-medium text-(--text)">
                            © {year} — {footerContent.legal.copyrightTemplate}
                        </p>

                        <a href="#top" className="font-semibold text-(--accent)" aria-label={footerContent.legal.backToTopAriaLabel}>
                            {footerContent.legal.backToTopLabel}
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
