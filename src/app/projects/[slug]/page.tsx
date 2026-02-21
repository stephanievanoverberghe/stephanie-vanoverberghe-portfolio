// src/app/projects/[slug]/page.tsx
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProjectBySlug, getProjectSlugs } from '@/lib/projects';
import ProjectHero from '@/components/project/ProjectHero';
import ProjectOverview from '@/components/project/ProjectOverview';
import ProjectSections from '@/components/project/ProjectSections';
import GalleryPreview from '@/components/project/GalleryPreview';
import { coverAlt, coverSrc } from '@/components/project/project.utils';

export const dynamic = 'force-static';

export async function generateStaticParams() {
    const slugs = await getProjectSlugs();
    return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const data = await getProjectBySlug(slug);
    if (!data) return { title: 'Projet introuvable' };

    const title = `${data.title} — Étude de cas`;
    const description = data.context ?? `Étude de cas front-end : ${data.title}${data.subtitle ? ` — ${data.subtitle}` : ''}.`;
    const ogImage = coverSrc(data) ?? '/og-cover.jpg';

    return {
        title,
        description,
        alternates: { canonical: `/projects/${data.slug}` },
        openGraph: {
            type: 'article',
            title,
            description,
            url: `/projects/${data.slug}`,
            siteName: 'Portfolio — Vanoverberghe Stéphanie',
            images: [{ url: ogImage, width: 1200, height: 630, alt: coverAlt(data) }],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [ogImage],
        },
    };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const data = await getProjectBySlug(slug);
    if (!data) notFound();

    const src = coverSrc(data);
    const alt = coverAlt(data);

    const ldJson = {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: data.title,
        description: data.context,
        author: { '@type': 'Person', name: 'Vanoverberghe Stéphanie' },
        datePublished: data.year ? `${data.year}-01-01` : undefined,
        image: src ?? undefined,
        url: `https://www.vanoverberghe-stephanie.dev/projects/${data.slug}`,
        keywords: [...(data.stack ?? []), ...(data.role ?? [])].join(', '),
    };

    return (
        <section className="container-page py-12 space-y-10">
            <ProjectHero project={data} />

            {src ? (
                <section
                    className="overflow-hidden rounded-2xl border"
                    style={{
                        borderColor: 'var(--border-soft)',
                        background: 'color-mix(in oklab, var(--surface-2) 72%, var(--surface-1))',
                        boxShadow: 'var(--shadow-card)',
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
                        <div className="ml-2 h-2.5 flex-1 rounded-full border" style={{ borderColor: 'var(--border-soft)', background: 'var(--surface-1)' }} />
                    </div>

                    <div className="relative aspect-21/9">
                        <div
                            aria-hidden
                            className="absolute inset-0 opacity-[0.95]"
                            style={{
                                background:
                                    'radial-gradient(1200px 420px at 18% 10%, color-mix(in oklab, var(--lilac) 18%, transparent), transparent 60%),' +
                                    'radial-gradient(1000px 420px at 85% 5%, color-mix(in oklab, var(--accent) 12%, transparent), transparent 60%)',
                            }}
                        />
                        <Image src={src} alt={alt} fill sizes="100vw" className="object-cover" style={{ objectPosition: '50% 12%' }} priority={false} />
                        <div aria-hidden className="pointer-events-none absolute inset-0" style={{ boxShadow: 'inset 0 -160px 200px rgba(2,8,23,0.18)' }} />
                    </div>
                </section>
            ) : null}

            <ProjectOverview project={data} />
            <ProjectSections project={data} />

            {data.gallery?.length ? <GalleryPreview images={data.gallery} title={data.title} /> : null}

            <section className="card p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <p className="opacity-90">Tu veux une version plus détaillée (perf, a11y, décisions) ? Je peux te la présenter comme en entretien.</p>
                    <div className="flex flex-wrap gap-3">
                        {data.links?.demo ? (
                            <a href={data.links.demo} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                                Voir la démo
                            </a>
                        ) : null}
                        <Link href="/contact" className="btn btn-cta" style={{ color: '#FDFDFD' }}>
                            Me contacter
                        </Link>
                    </div>
                </div>
            </section>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }} />
        </section>
    );
}
