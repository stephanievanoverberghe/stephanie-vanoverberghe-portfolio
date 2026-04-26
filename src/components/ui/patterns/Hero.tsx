import type { ReactNode } from 'react';

import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Heading } from '../components/Heading';
import { Text } from '../components/Text';
import { Stack } from '../primitives/Stack';

type HeroAction = {
    label: string;
    href: string;
    variant?: 'primary' | 'secondary' | 'ghost';
};

type HeroProps = {
    kicker?: string;
    title?: string;
    description?: string;
    actions?: HeroAction[];
    aside?: ReactNode;
    children?: ReactNode;
};

export function Hero({ kicker, title, description, actions, aside, children }: HeroProps) {
    return (
        <section className="relative overflow-hidden rounded-(--radius-card) border border-(--border-soft) bg-(--surface-1) p-6 shadow-(--shadow-card) sm:p-8 lg:p-10">
            <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-(--lilac)/30 blur-3xl" />
            <div aria-hidden className="absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-(--sage)/20 blur-3xl" />

            <div className="relative grid gap-8 lg:grid-cols-[1fr_420px]">
                <Stack gap="md">
                    {kicker ? <Badge tone="gold">{kicker}</Badge> : null}
                    {title ? (
                        <Heading as="h1" variant="display">
                            {title}
                        </Heading>
                    ) : null}
                    {description ? <Text className="max-w-2xl">{description}</Text> : null}
                    {actions?.length ? (
                        <div className="flex flex-wrap gap-3">
                            {actions.map((action) => (
                                <Button key={action.href} href={action.href} variant={action.variant ?? 'primary'}>
                                    {action.label}
                                </Button>
                            ))}
                        </div>
                    ) : null}
                    {children}
                </Stack>

                {aside ? <aside>{aside}</aside> : null}
            </div>
        </section>
    );
}
