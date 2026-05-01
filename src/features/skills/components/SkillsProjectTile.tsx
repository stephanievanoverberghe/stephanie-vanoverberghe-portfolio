import Link from 'next/link';

import Chip from '@/components/ui/Chip';
import ProjectLinkBadge from '@/features/projects/components/ProjectLinkBadge';
import ProjectMedia from '@/features/projects/components/ProjectMedia';
import type { ProjectTone } from '@/lib/project-display';

type Props = {
    title: string;
    subtitle: string;
    hrefCase: string;
    cover: string;
    coverAlt: string;
    tags: string[];
    tone: ProjectTone;
    labels: {
        caseStudy: string;
        read: string;
    };
};

export default function SkillsProjectTile({ title, subtitle, hrefCase, cover, coverAlt, tags, tone, labels }: Props) {
    return (
        <article className="surface-card surface-card-hover group overflow-hidden rounded-[1.6rem]">
            <Link href={hrefCase} className="block">
                <ProjectMedia
                    src={cover}
                    alt={coverAlt}
                    tone={tone}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    frameClassName="rounded-none border-b border-(--border-soft) border-x-0 border-t-0"
                    overlayClassName="gallery-overlay-soft"
                >
                    <div className="absolute left-3 top-3">
                        <Chip size="xs" color={tone}>
                            {labels.caseStudy}
                        </Chip>
                    </div>
                </ProjectMedia>

                <div className="p-5">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h3 className="text-lg font-semibold leading-tight tracking-[-0.035em] text-(--text-strong)">{title}</h3>

                            <p className="mt-2 line-clamp-2 text-sm leading-6 text-(--text)">{subtitle}</p>
                        </div>

                        <ProjectLinkBadge tone={tone} className="h-9 w-9" iconSize={16} />
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                        {tags.slice(0, 3).map((tag) => (
                            <Chip key={tag} kind="tech" size="xs">
                                {tag}
                            </Chip>
                        ))}
                    </div>

                    <div className="mt-5 text-xs font-bold uppercase tracking-[0.14em] text-(--accent)">
                        {labels.read}
                        <span className="ml-2 inline-block transition group-hover:translate-x-1">→</span>
                    </div>
                </div>
            </Link>
        </article>
    );
}
