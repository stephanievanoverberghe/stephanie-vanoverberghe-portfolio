import Link from 'next/link';
import { ArrowUpRight, Github } from 'lucide-react';

import type { Project } from '@/lib/projects';

type Props = {
    project: Project;
    variant?: 'hero' | 'inline' | 'footer';
};

export default function ProjectActions({ project, variant = 'inline' }: Props) {
    const isHero = variant === 'hero';

    return (
        <div className="flex flex-wrap gap-3">
            {project.links?.demo ? (
                <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-white transition hover:-translate-y-0.5"
                    style={{
                        background: 'linear-gradient(135deg, var(--accent), color-mix(in oklab, var(--accent) 78%, var(--ink)))',
                    }}
                >
                    Voir la démo
                    <ArrowUpRight size={17} />
                </a>
            ) : null}

            {project.links?.repo ? (
                <a
                    href={project.links.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-(--text-strong) transition hover:-translate-y-0.5"
                    style={{
                        borderColor: 'color-mix(in oklab, var(--gold) 46%, var(--border-soft))',
                        background: 'color-mix(in oklab, var(--gold) 12%, var(--surface-1))',
                    }}
                >
                    <Github size={17} />
                    Voir le code
                </a>
            ) : null}

            {isHero ? (
                <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-(--text-strong) transition hover:-translate-y-0.5"
                    style={{
                        borderColor: 'color-mix(in oklab, var(--sage) 34%, var(--border-soft))',
                        background: 'color-mix(in oklab, var(--sage) 10%, var(--surface-1))',
                    }}
                >
                    Me contacter
                </Link>
            ) : null}
        </div>
    );
}
