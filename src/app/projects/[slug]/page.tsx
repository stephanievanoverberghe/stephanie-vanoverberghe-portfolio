// src/app/projects/[slug]/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProjectBySlug, getProjectSlugs } from '@/lib/projects';
import ProjectHero from '@/components/project/ProjectHero';
import ProjectOverview from '@/components/project/ProjectOverview';
import ProjectSections from '@/components/project/ProjectSections';
import GalleryPreview from '@/components/project/GalleryPreview';
import ProjectActions from '@/components/project/ProjectActions';
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
        twitter: { card: 'summary_large_image', title, description, images: [ogImage] },
    };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const data = await getProjectBySlug(slug);
    if (!data) notFound();

    const src = coverSrc(data);

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

            <section id="overview" className="scroll-mt-24">
                <ProjectOverview project={data} />
            </section>

            <section id="details" className="scroll-mt-24">
                <ProjectSections project={data} />
            </section>

            {data.gallery?.length ? (
                <section id="gallery" className="scroll-mt-24">
                    <GalleryPreview images={data.gallery} title={data.title} />
                </section>
            ) : null}

            {/* Footer CTA plus léger (pas répétitif) */}
            <section className="card p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <p className="opacity-90">Envie d’un échange ? Je peux te présenter ce projet comme en entretien (choix techniques, perf, a11y).</p>
                    <ProjectActions project={data} variant="footer" />
                </div>
            </section>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }} />
        </section>
    );
}
