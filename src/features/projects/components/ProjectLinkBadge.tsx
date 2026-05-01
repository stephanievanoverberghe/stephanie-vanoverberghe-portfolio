import { ArrowUpRight } from 'lucide-react';
import type { CSSProperties } from 'react';

import { cn } from '@/lib/cn';
import type { ProjectTone } from '@/lib/project-display';

type ToneStyle = CSSProperties & { '--project-tone': string };

type ProjectLinkBadgeProps = {
    tone: ProjectTone;
    className?: string;
    iconClassName?: string;
    iconSize?: number;
};

function toneStyle(tone: ProjectTone): ToneStyle {
    return { '--project-tone': `var(--${tone})` };
}

export default function ProjectLinkBadge({ tone, className, iconClassName, iconSize = 18 }: ProjectLinkBadgeProps) {
    return (
        <span
            className={cn(
                'project-link-badge grid h-10 w-10 shrink-0 place-items-center rounded-full border transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5',
                className,
            )}
            style={toneStyle(tone)}
        >
            <ArrowUpRight size={iconSize} className={cn('text-(--text-strong)', iconClassName)} />
        </span>
    );
}
