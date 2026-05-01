import Link from 'next/link';
import { ArrowUpRight, Github } from 'lucide-react';

import Button from '@/components/ui/Button';
import type { Project } from '@/lib/projects';

type Props = {
    project: Project;
    variant?: 'hero' | 'inline' | 'footer';
};

const labels = {
    demo: 'Voir la démo',
    code: 'Voir le code',
    contact: 'Me contacter',
} as const;

export default function ProjectActions({ project, variant = 'inline' }: Props) {
    const isHero = variant === 'hero';

    return (
        <div className="flex flex-wrap gap-3">
            {project.links?.demo ? (
                <Button href={project.links.demo} external>
                    {labels.demo}
                    <ArrowUpRight size={17} />
                </Button>
            ) : null}

            {project.links?.repo ? (
                <Button href={project.links.repo} external variant="secondary">
                    <Github size={17} />
                    {labels.code}
                </Button>
            ) : null}

            {isHero ? (
                <Link href="/contact" className="btn-premium inline-flex items-center gap-2 link-card-soft">
                    {labels.contact}
                </Link>
            ) : null}
        </div>
    );
}
