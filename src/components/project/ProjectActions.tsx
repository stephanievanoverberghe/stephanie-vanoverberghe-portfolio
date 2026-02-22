// src/components/project/ProjectActions.tsx
import Link from 'next/link';
import type { Project } from '@/lib/projects';

type Props = {
    project: Project;
    variant?: 'hero' | 'inline' | 'footer';
};

export default function ProjectActions({ project, variant = 'inline' }: Props) {
    const p = project;

    const ctaClass = variant === 'hero' ? 'btn btn-cta' : variant === 'footer' ? 'btn btn-cta' : 'btn btn-secondary';

    return (
        <div className="flex flex-wrap gap-3">
            {p.links?.demo ? (
                <a href={p.links.demo} target="_blank" rel="noopener noreferrer" className={ctaClass} style={{ color: '#FDFDFD' }}>
                    Voir la démo
                </a>
            ) : null}

            {p.links?.repo ? (
                <a href={p.links.repo} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                    Voir le code
                </a>
            ) : null}

            <Link href="/contact" className={variant === 'hero' ? 'btn btn-ghost' : 'btn btn-ghost'}>
                Me contacter
            </Link>
        </div>
    );
}
