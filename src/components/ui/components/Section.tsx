import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';
import { Container } from '../primitives/Container';

type SectionProps = {
    children: ReactNode;
    className?: string;
    containerClassName?: string;
    size?: 'md' | 'lg' | 'xl';
};

export function Section({ children, className, containerClassName, size = 'xl' }: SectionProps) {
    return (
        <section className={cn('py-12 md:py-16', className)}>
            <Container className={containerClassName} size={size}>
                {children}
            </Container>
        </section>
    );
}
