import { ArrowRight, Download } from 'lucide-react';

import Button from '@/components/ui/Button';
import { footerContent } from '@/content/footer';
import { siteProfile } from '@/content/site';

export function FooterCta() {
    return (
        <section
            aria-label={footerContent.cta.ariaLabel}
            className="surface-card relative overflow-hidden rounded-4xl p-6 sm:p-8 lg:p-10"
        >
            <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-(--lilac)/30 blur-3xl" />
            <div aria-hidden className="absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-(--sage)/25 blur-3xl" />

            <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.28em] text-(--gold)">{footerContent.cta.kicker}</p>

                    <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-[0.98] tracking-[-0.06em] text-(--text-strong) sm:text-5xl">{footerContent.cta.title}</h2>

                    <p className="mt-5 max-w-2xl text-sm leading-6 text-(--text)">{footerContent.profile.intent}</p>
                </div>

                <div className="flex flex-wrap gap-3 lg:justify-end">
                    <Button href="/contact">
                        {footerContent.cta.contactLabel}
                        <ArrowRight size={17} />
                    </Button>

                    <Button href={siteProfile.resumeHref} external variant="secondary">
                        <Download size={17} />
                        {footerContent.cta.resumeLabel}
                    </Button>
                </div>
            </div>
        </section>
    );
}
