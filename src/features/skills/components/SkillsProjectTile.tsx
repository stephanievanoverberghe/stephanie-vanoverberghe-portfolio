import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import Chip from '@/components/ui/Chip';

type Tone = 'accent' | 'lilac' | 'sage' | 'gold';

type Props = {
    size: 'lg' | 'sm';
    title: string;
    subtitle: string;
    hrefCase: string;
    demoUrl?: string;
    cover: string;
    coverAlt: string;
    tags: string[];
    highlights: string[];
    tone: Tone;
    labels: {
        caseStudy: string;
        demo: string;
        read: string;
    };
};

export default function SkillsProjectTile({ title, subtitle, hrefCase, cover, coverAlt, tags, tone, labels }: Props) {
    return (
        <article
            className="surface-card surface-card-hover group overflow-hidden rounded-[1.6rem]"
        >
            <Link href={hrefCase} className="block">
                <div className="relative aspect-16/10 overflow-hidden border-b border-(--border-soft)">
                    <Image
                        src={cover}
                        alt={coverAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition duration-700 group-hover:scale-[1.035]"
                        style={{ objectPosition: '50% 10%' }}
                    />

                    <div
                        aria-hidden
                        className="absolute inset-0"
                        style={{
                            background: 'linear-gradient(to top, rgba(18,19,20,0.34), transparent 58%)',
                        }}
                    />

                    <div className="absolute left-3 top-3">
                        <Chip size="xs" color={tone}>
                            {labels.caseStudy}
                        </Chip>
                    </div>
                </div>

                <div className="p-5">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h3 className="text-lg font-semibold leading-tight tracking-[-0.035em] text-(--text-strong)">{title}</h3>

                            <p className="mt-2 line-clamp-2 text-sm leading-6 text-(--text)">{subtitle}</p>
                        </div>

                        <span
                            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            style={{
                                borderColor: `color-mix(in oklab, var(--${tone}) 38%, var(--border-soft))`,
                                background: `color-mix(in oklab, var(--${tone}) 10%, var(--surface-1))`,
                            }}
                        >
                            <ArrowUpRight size={16} className="text-(--text-strong)" />
                        </span>
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
