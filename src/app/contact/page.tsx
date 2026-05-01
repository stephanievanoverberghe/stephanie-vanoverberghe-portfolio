import type { Metadata } from 'next';

import ContactAside from '@/components/contact/ContactAside';
import ContactForm from '@/components/contact/ContactForm';
import ContactHero from '@/components/contact/ContactHero';
import { contactContent } from '@/content/contact';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
    title: contactContent.metadata.title,
    description: contactContent.metadata.description,
    canonical: '/contact',
});

export const dynamic = 'force-static';

export default function ContactPage() {
    return (
        <main className="container-page space-y-10 py-12">
            <ContactHero />

            <section className="grid items-start gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                <ContactForm />
                <ContactAside />
            </section>
        </main>
    );
}
