import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

import { cn } from '@/lib/cn';

type BoxProps<T extends ElementType = 'div'> = {
    as?: T;
    className?: string;
    children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'className' | 'children'>;

export function Box<T extends ElementType = 'div'>({ as, className, children, ...rest }: BoxProps<T>) {
    const Component = as ?? 'div';
    return (
        <Component className={cn(className)} {...rest}>
            {children}
        </Component>
    );
}
