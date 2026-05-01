import type { ReactNode } from 'react';

import Button from './Button';

type LinkButtonProps = {
    href: string;
    children: ReactNode;
    variant?: 'primary' | 'secondary';
    className?: string;
};

export default function LinkButton({ href, children, variant = 'primary', className }: LinkButtonProps) {
    return (
        <Button href={href} variant={variant} className={className}>
            {children}
        </Button>
    );
}
