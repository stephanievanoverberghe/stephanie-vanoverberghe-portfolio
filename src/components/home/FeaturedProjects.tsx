// src/components/home/FeaturedProjects.tsx
import Link from 'next/link';
import Image from 'next/image';
import Chip from '@/components/ui/Chip';
import type { Project } from '@/lib/projects';
import { chipPropsByKind, kindFor, pickStack } from './home.utils';

type Tone = 'accent' | 'sage' | 'lilac' | 'gold';

function excerpt(text?: string, max = 120) {
    const t = (text ?? '').trim();
    if (!t) return '';
    if (t.length <= max) return t;
    return t.slice(0, max).replace(/\s+\S*$/, '') + '…';
}

function coverSrc(p: Project) {
    return p.hero?.image ?? p.logo?.image ?? null;
}

function coverAlt(p: Project) {
    return p.hero?.alt ?? p.logo?.alt ?? p.title;
}

function getYearScore(p: Project) {
    const n = Number(p.year ?? 0);
    return Number.isFinite(n) ? n : 0;
}

function BrowserFrame({ p, tone }: { p: Project; tone: Tone }) {
    const src = coverSrc(p);
    const alt = coverAlt(p);

    return (
        <div
            className="relative overflow-hidden rounded-2xl border"
            style={{
                borderColor: 'var(--border-soft)',
                background: 'color-mix(in oklab, var(--surface-2) 72%, var(--surface-1))',
            }}
        >
            <div
                className="flex items-center gap-2 px-3 py-2 border-b"
                style={{
                    borderColor: 'var(--border-soft)',
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
                    className="absolute inset-0"
                    style={{
                        background: `radial-gradient(1200px 320px at 20% 15%,
                          color-mix(in oklab, var(--${tone}) 22%, transparent),
                          transparent 55%),
                        radial-gradient(900px 300px at 80% 10%,
                          color-mix(in oklab, var(--accent) 14%, transparent),
                          transparent 55%),
                        linear-gradient(to bottom, var(--surface-2), var(--surface-1))`,
                    }}
                />

                {src ? (
                    <Image src={src} alt={alt} fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" style={{ objectPosition: '50% 10%' }} priority={false} />
                ) : null}

                <div aria-hidden className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(2,8,23,0.04),inset_0_-80px_120px_rgba(2,8,23,0.08)] rounded-2xl" />
            </div>
        </div>
    );
}

function CompactCard({ p }: { p: Project }) {
    const src = coverSrc(p);
    const alt = coverAlt(p);
    const picked = pickStack(p.stack, 2);

    return (
        <Link
            href={`/projects/${p.slug}`}
            className="group rounded-2xl border p-4 transition hover:shadow-[0_14px_40px_rgba(2,8,23,0.08)] border-(--border-soft) bg-(--surface-1) shadow-(--shadow-card)"
        >
            <div className="flex gap-4">
                <div
                    className="relative h-20 w-28 shrink-0 overflow-hidden rounded-2xl border border-(--border-soft)"
                    style={{ background: 'color-mix(in oklab, var(--surface-2) 70%, var(--surface-1))' }}
                >
                    {src ? <Image src={src} alt={alt} fill sizes="120px" className="object-cover" /> : null}
                    <span aria-hidden className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(2,8,23,0.04)] rounded-2xl" />
                </div>

                <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                            <div className="truncate text-sm font-semibold text-(--text-strong)">{p.title}</div>
                            {p.subtitle ? <div className="mt-1 line-clamp-2 text-xs opacity-75">{p.subtitle}</div> : null}
                        </div>

                        {p.year ? (
                            <Chip size="xs" color="gold">
                                {p.year}
                            </Chip>
                        ) : null}
                    </div>

                    <div className="mt-2 flex flex-wrap gap-2">
                        {picked.map((s) => (
                            <Chip key={s} {...chipPropsByKind(kindFor(s))} size="xs">
                                {s}
                            </Chip>
                        ))}
                    </div>

                    <div className="mt-2 text-xs font-semibold inline-flex items-center gap-2 opacity-85 group-hover:opacity-100 text-(--text-strong)">
                        Voir
                        <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default function FeaturedProjects({ projects, featuredCount = 2 }: { projects: Project[]; featuredCount?: number }) {
    const sorted = [...projects].sort((a, b) => getYearScore(b) - getYearScore(a));
    const featured = sorted.slice(0, featuredCount);
    const rest = sorted.slice(featuredCount);

    return (
        <section className="space-y-6">
            <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                    <h2 className="text-xl font-semibold text-(--text-strong)">Projets</h2>
                    <p className="mt-1 text-sm opacity-80">Les {featuredCount} derniers en avant · puis tous les autres.</p>
                </div>

                <Link href="/projects" className="text-sm font-semibold hover:opacity-90 text-(--text-strong)">
                    Voir tous les projets →
                </Link>
            </div>

            {/* 2 derniers (featured) */}
            <div className="grid gap-6 lg:grid-cols-2">
                {featured.map((p, idx) => {
                    const picked = pickStack(p.stack, 3);
                    const tone: Tone = idx % 2 === 0 ? 'sage' : 'lilac';

                    return (
                        <article
                            key={p.slug}
                            className="group rounded-2xl border p-4 sm:p-5 transition hover:shadow-[0_16px_40px_rgba(2,8,23,0.08)] border-(--border-soft) bg-(--surface-1) shadow-(--shadow-card)"
                        >
                            <Link href={`/projects/${p.slug}`} className="block">
                                <BrowserFrame p={p} tone={tone} />

                                <div className="mt-5 space-y-4">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <h3 className="text-lg font-semibold text-(--text-strong)">{p.title}</h3>
                                            {p.subtitle ? <p className="mt-1 text-sm opacity-80">{p.subtitle}</p> : null}
                                        </div>

                                        <div className="shrink-0 flex items-center gap-2">
                                            {p.year ? (
                                                <Chip size="xs" color="gold">
                                                    {p.year}
                                                </Chip>
                                            ) : null}
                                            <Chip size="xs" color="accent">
                                                Featured
                                            </Chip>
                                        </div>
                                    </div>

                                    <div
                                        className="rounded-2xl border p-4 border-(--border-soft)"
                                        style={{
                                            background: 'color-mix(in oklab, var(--surface-2) 52%, var(--surface-1))',
                                        }}
                                    >
                                        <div className="grid sm:grid-cols-[110px_1fr] grid-cols-1 gap-x-4 gap-y-2 text-sm">
                                            <span className="font-semibold text-(--text-strong)">Contexte</span>
                                            <span className="opacity-85">{excerpt(p.context) || excerpt(p.subtitle)}</span>

                                            <span className="font-semibold text-(--text-strong)">Objectif</span>
                                            <span className="opacity-85">{excerpt(p.objectives?.[0])}</span>

                                            <span className="font-semibold text-(--text-strong)">Stack</span>
                                            <span className="opacity-85">{picked.join(' · ')}</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {(p.role ?? []).slice(0, 2).map((r) => (
                                            <Chip key={r} color="lilac">
                                                {r}
                                            </Chip>
                                        ))}
                                        {picked.map((s) => (
                                            <Chip key={s} {...chipPropsByKind(kindFor(s))}>
                                                {s}
                                            </Chip>
                                        ))}
                                    </div>

                                    <div className="text-sm font-semibold inline-flex items-center gap-2 text-(--text-strong)">
                                        Voir l’étude de cas
                                        <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                                    </div>
                                </div>
                            </Link>
                        </article>
                    );
                })}
            </div>

            {/* Tous les autres */}
            {rest.length ? (
                <div className="space-y-3">
                    <div className="flex items-center justify-between gap-3">
                        <h3 className="text-sm font-semibold text-(--text-strong)">Tous les autres projets</h3>
                        <span className="text-xs opacity-70">
                            {rest.length} projet{rest.length > 1 ? 's' : ''}
                        </span>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        {rest.map((p) => (
                            <CompactCard key={p.slug} p={p} />
                        ))}
                    </div>
                </div>
            ) : null}
        </section>
    );
}
