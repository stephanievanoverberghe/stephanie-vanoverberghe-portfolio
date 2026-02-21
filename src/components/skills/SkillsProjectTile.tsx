// src/components/skills/SkillsProjectTile.tsx
import Link from 'next/link';
import Image from 'next/image';
import Chip from '@/components/ui/Chip';

export default function SkillsProjectTile({
    size,
    title,
    subtitle,
    hrefCase,
    demoUrl,
    cover,
    coverAlt,
    tags,
    highlights,
    tone,
}: {
    size: 'lg' | 'sm';
    title: string;
    subtitle: string;
    hrefCase: string;
    demoUrl?: string;
    cover: string;
    coverAlt: string;
    tags: string[];
    highlights: string[];
    tone: 'accent' | 'lilac' | 'sage' | 'gold';
}) {
    const isLg = size === 'lg';

    return (
        <article
            className="group overflow-hidden rounded-2xl border"
            style={{ borderColor: 'var(--border-soft)', background: 'var(--surface-1)', boxShadow: 'var(--shadow-card)' }}
        >
            <div
                className={isLg ? 'relative aspect-video border-b overflow-hidden' : 'relative aspect-16/10 border-b overflow-hidden'}
                style={{ borderColor: 'var(--border-soft)' }}
            >
                <Image
                    src={cover}
                    alt={coverAlt}
                    fill
                    sizes={isLg ? '(max-width: 1024px) 100vw, 66vw' : '(max-width: 1024px) 100vw, 33vw'}
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />

                {/* overlay premium */}
                <span aria-hidden className="absolute inset-0" style={{ boxShadow: 'inset 0 -160px 220px rgba(2,8,23,0.26)' }} />
                <span
                    aria-hidden
                    className="absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-35"
                    style={{ background: `radial-gradient(circle, color-mix(in oklab, var(--${tone}) 34%, transparent), transparent 62%)` }}
                />

                <div className="absolute left-4 right-4 bottom-4 flex flex-wrap gap-2">
                    <Chip size="xs" color={tone}>
                        Case study
                    </Chip>
                    <Chip size="xs" kind="neutral">
                        {tags[0]}
                    </Chip>
                    {isLg && tags[1] ? (
                        <Chip size="xs" kind="neutral">
                            {tags[1]}
                        </Chip>
                    ) : null}
                </div>
            </div>

            <div className={isLg ? 'p-6 space-y-4' : 'p-5 space-y-4'}>
                <div>
                    <h3 className={isLg ? 'text-lg sm:text-xl font-semibold' : 'text-base sm:text-lg font-semibold'} style={{ color: 'var(--text-strong)' }}>
                        {title}
                    </h3>
                    <p className="mt-1 text-sm opacity-80">{subtitle}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                    {tags.slice(0, isLg ? 6 : 5).map((t) => (
                        <Chip key={t} kind="tech" size="sm">
                            {t}
                        </Chip>
                    ))}
                </div>

                <ul className="text-sm opacity-90 space-y-2">
                    {highlights.slice(0, 3).map((h) => (
                        <li key={h} className="flex gap-2">
                            <span aria-hidden>•</span>
                            <span>{h}</span>
                        </li>
                    ))}
                </ul>

                <div className="flex flex-wrap gap-3 pt-1">
                    {demoUrl ? (
                        <a href={demoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                            Voir la démo
                        </a>
                    ) : null}

                    <Link href={hrefCase} className="btn btn-cta" style={{ color: '#FDFDFD' }}>
                        Étude de cas
                    </Link>
                </div>
            </div>
        </article>
    );
}
