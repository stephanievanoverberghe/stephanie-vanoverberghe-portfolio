import type { ReactNode } from 'react';

type PageHeroProps = {
    children: ReactNode;
    as?: 'section' | 'header';
    className?: string;
};

export default function PageHero({ children, as = 'section', className }: PageHeroProps) {
    const Component = as;

    return (
        <Component className={`page-hero ${className ?? ''}`.trim()}>
            <div aria-hidden className="page-hero-glow page-hero-glow-top" />
            <div aria-hidden className="page-hero-glow page-hero-glow-bottom" />
            <div className="relative">{children}</div>
        </Component>
    );
}
