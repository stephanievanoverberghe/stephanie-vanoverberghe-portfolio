import Image from 'next/image';
import type { CSSProperties, ReactNode } from 'react';

import { cn } from '@/lib/cn';
import type { ProjectTone } from '@/lib/project-display';

type ProjectMediaProps = {
    src?: string | null;
    alt: string;
    tone: ProjectTone;
    sizes: string;
    priority?: boolean;
    objectPosition?: string;
    frameClassName?: string;
    mediaClassName?: string;
    overlayClassName?: string;
    children?: ReactNode;
};

function toneStyle(tone: ProjectTone): CSSProperties {
    return { ['--project-tone' as '--project-tone']: `var(--${tone})` } as CSSProperties;
}

export default function ProjectMedia({
    src,
    alt,
    tone,
    sizes,
    priority = false,
    objectPosition = '50% 10%',
    frameClassName,
    mediaClassName,
    overlayClassName = 'project-card-overlay',
    children,
}: ProjectMediaProps) {
    return (
        <div className={cn('project-tone-frame relative overflow-hidden', frameClassName)} style={toneStyle(tone)}>
            <div className={cn('relative aspect-16/10 overflow-hidden', mediaClassName)}>
                {src ? (
                    <Image
                        src={src}
                        alt={alt}
                        fill
                        sizes={sizes}
                        priority={priority}
                        className="object-cover transition duration-700 group-hover:scale-[1.035]"
                        style={{ objectPosition }}
                    />
                ) : (
                    <div aria-hidden className="project-tone-fallback absolute inset-0" />
                )}

                <div aria-hidden className={cn('absolute inset-0', overlayClassName)} />
                {children}
            </div>
        </div>
    );
}
