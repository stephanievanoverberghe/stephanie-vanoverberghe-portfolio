// src/components/projects/ProjectCard.tsx
import Link from 'next/link';
import Image from 'next/image';
import Chip from '@/components/ui/Chip';
import type { Project } from '@/lib/projects';
import { cardBlurb, coverAlt, coverSrc, kindFor, pickStackChips } from './projects.utils';

export default function ProjectCard({ project }: { project: Project }) {
    const p = project;
    const src = coverSrc(p);
    const alt = coverAlt(p);
    const stackChips = pickStackChips(p.stack ?? [], 2);
    const blurb = cardBlurb(p);

    return (
        <article className="group relative overflow-hidden rounded-2xl border transition hover:shadow-[0_18px_50px_rgba(2,8,23,0.10)] border-(--border-soft) bg-(--surface-1) shadow-(--shadow-card)">
            <Link href={`/projects/${p.slug}`} className="block">
                <div className="p-3 sm:p-4">
                    <div
                        className="overflow-hidden rounded-2xl border border-(--border-soft)"
                        style={{
                            background: 'color-mix(in oklab, var(--surface-2) 72%, var(--surface-1))',
                        }}
                    >
                        <div
                            className="flex items-center gap-2 px-3 py-2 border-b border-(--border-soft)"
                            style={{
                                background: 'color-mix(in oklab, var(--surface-1) 88%, var(--surface-2))',
                            }}
                        >
                            <span className="h-2.5 w-2.5 rounded-full" style={{ background: 'color-mix(in oklab, var(--accent) 60%, #fff)' }} />
                            <span className="h-2.5 w-2.5 rounded-full" style={{ background: 'color-mix(in oklab, var(--gold) 60%, #fff)' }} />
                            <span className="h-2.5 w-2.5 rounded-full" style={{ background: 'color-mix(in oklab, var(--sage) 60%, #fff)' }} />
                            <div className="ml-2 h-2.5 flex-1 rounded-full border border-(--border-soft) bg-(--surface-1)" />
                        </div>

                        <div className="relative aspect-video">
                            <div
                                aria-hidden
                                className="absolute inset-0 opacity-[0.10]"
                                style={{
                                    backgroundImage: 'radial-gradient(1px 1px at 20px 20px, var(--text) 10%, transparent 11%)',
                                }}
                            />

                            {src ? (
                                <Image
                                    src={src}
                                    alt={alt}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                                    style={{ objectPosition: '50% 12%' }}
                                    priority={false}
                                />
                            ) : null}

                            <div
                                aria-hidden
                                className="pointer-events-none absolute inset-0"
                                style={{
                                    boxShadow: 'inset 0 0 0 1px rgba(2,8,23,0.04), inset 0 -120px 160px rgba(2,8,23,0.14)',
                                }}
                            />

                            <div className="absolute left-3 top-3 flex items-center gap-2">
                                <Chip size="xs" color="accent">
                                    Case study
                                </Chip>
                            </div>

                            {p.year ? (
                                <div className="absolute right-3 top-3">
                                    <Chip size="xs" color="gold">
                                        {p.year}
                                    </Chip>
                                </div>
                            ) : null}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="pt-4 px-1">
                        <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                                <h2 className="text-base sm:text-lg font-semibold truncate text-(--text-strong)">{p.title}</h2>
                                {blurb ? <p className="mt-1 text-sm opacity-80 line-clamp-2">{blurb}</p> : null}
                            </div>

                            <span
                                className="hidden sm:inline-flex shrink-0 rounded-full border px-3 py-1 text-xs font-semibold border-(--border-soft) text-(--text-strong) bg-(--surface-1)"
                                style={{ background: 'color-mix(in oklab, var(--surface-2) 55%, var(--surface-1))' }}
                            >
                                Lire →
                            </span>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-2">
                            {(p.role ?? []).slice(0, 1).map((r) => (
                                <Chip key={r} kind="design">
                                    {r}
                                </Chip>
                            ))}
                            {stackChips.map((s) => (
                                <Chip key={s} kind={kindFor(s)}>
                                    {s}
                                </Chip>
                            ))}
                        </div>

                        <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-(--text-strong)">
                            Voir le projet <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                        </div>
                    </div>
                </div>
            </Link>
        </article>
    );
}
