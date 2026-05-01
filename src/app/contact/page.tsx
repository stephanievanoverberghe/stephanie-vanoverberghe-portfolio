import type { Metadata } from 'next';

import ContactAside from '@/features/contact/components/ContactAside';
import ContactForm from '@/features/contact/components/ContactForm';
import ContactHero from '@/features/contact/components/ContactHero';
import { contactContent } from '@/content/contact';
import { buildPageMetadata } from '@/lib/seo';
import PageShell from '@/components/layout/PageShell';

export const metadata: Metadata = buildPageMetadata({
    title: contactContent.metadata.title,
    description: contactContent.metadata.description,
    canonical: '/contact',
});

export const dynamic = 'force-static';

export default function ContactPage() {
    return (
        <PageShell className="space-y-10 py-12">
            <ContactHero />

            <section className="grid items-start gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                <ContactForm />
                <ContactAside />
            </section>
        </PageShell>
    );
}
