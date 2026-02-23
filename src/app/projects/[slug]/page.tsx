import { cache, type ReactNode } from 'react';
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

type ProjectPageParams = { slug: string };
type ProjectPageProps = { params: Promise<ProjectPageParams> };

const getProjectData = cache(async (slug: string) => getProjectBySlug(slug));

function getProjectSeo(slug: string) {
    return `https://www.vanoverberghe-stephanie.dev/projects/${slug}`;
}

function buildProjectLdJson(slug: string, data: NonNullable<Awaited<ReturnType<typeof getProjectBySlug>>>) {
    const src = coverSrc(data);

    return {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: data.title,
        description: data.context,
        author: { '@type': 'Person', name: 'Vanoverberghe Stéphanie' },
        datePublished: data.year ? `${data.year}-01-01` : undefined,
        image: src ?? undefined,
        url: getProjectSeo(slug),
        keywords: [...(data.stack ?? []), ...(data.role ?? [])].join(', '),
    };
}

function AnchorSection({ id, children }: { id: string; children: ReactNode }) {
    return (
        <section id={id} className="scroll-mt-24">
            {children}
        </section>
    );
}

export async function generateStaticParams() {
    const slugs = await getProjectSlugs();
    return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
    const { slug } = await params;
    const data = await getProjectData(slug);

    if (!data) return { title: 'Projet introuvable' };

    const title = `${data.title} — Étude de cas`;
    const description = data.context ?? `Étude de cas front-end : ${data.title}${data.subtitle ? ` — ${data.subtitle}` : ''}.`;
    const ogImage = coverSrc(data) ?? '/og-cover.webp';

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

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { slug } = await params;
    const data = await getProjectData(slug);

    if (!data) notFound();

    const ldJson = buildProjectLdJson(data.slug, data);

    return (
        <section className="container-page py-12 space-y-10">
            <ProjectHero project={data} />

            <AnchorSection id="overview">
                <ProjectOverview project={data} />
            </AnchorSection>

            <AnchorSection id="details">
                <ProjectSections project={data} />
            </AnchorSection>

            {data.gallery?.length ? (
                <AnchorSection id="gallery">
                    <GalleryPreview images={data.gallery} title={data.title} />
                </AnchorSection>
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
