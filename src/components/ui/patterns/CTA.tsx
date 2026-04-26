import { ArrowUpRight } from 'lucide-react';

import { Button } from '../components/Button';
import { Heading } from '../components/Heading';
import { Text } from '../components/Text';

type CTAProps = {
    title: string;
    description: string;
    href: string;
    label: string;
};

export function CTA({ title, description, href, label }: CTAProps) {
    return (
        <section className="rounded-(--radius-card) border border-(--border-soft) bg-(--surface-2) p-6 sm:p-8">
            <Heading as="h2" variant="h2">
                {title}
            </Heading>
            <Text className="mt-3 max-w-2xl">{description}</Text>
            <Button href={href} className="mt-6">
                {label}
                <ArrowUpRight size={16} />
            </Button>
        </section>
    );
}
