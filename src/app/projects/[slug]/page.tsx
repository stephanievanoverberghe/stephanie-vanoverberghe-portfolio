import { cache, type ReactNode } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import PageShell from '@/components/layout/PageShell';
import ProjectActions from '@/components/project/ProjectActions';
import ProjectDetails, { hasProjectDetails } from '@/components/project/ProjectDetails';
import GalleryPreview from '@/components/project/GalleryPreview';
import ProjectHero from '@/components/project/ProjectHero';
import ProjectOverview from '@/components/project/ProjectOverview';
import { coverAlt, coverSrc } from '@/components/project/project.utils';
import { projectsPageContent } from '@/content/projects-page';
import { getProjectBySlug, getProjectSlugs } from '@/lib/projects';

export const dynamic = 'force-static';

const BASE_URL = 'https://stephanie-vanoverberghe.dev';

type ProjectPageParams = { slug: string };
type ProjectPageProps = { params: Promise<ProjectPageParams> };

const getProjectData = cache(async (slug: string) => getProjectBySlug(slug));

function absoluteUrl(path?: string | null) {
    if (!path) return undefined;
    if (path.startsWith('http')) return path;

    return `${BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

function getProjectSeo(slug: string) {
    return `${BASE_URL}/projects/${slug}`;
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
        image: absoluteUrl(src),
        url: getProjectSeo(slug),
        keywords: [...(data.stack ?? []), ...(data.role ?? [])].join(', '),
    };
}

function AnchorSection({ id, children }: { id: string; children: ReactNode }) {
    return (
        <div id={id} className="scroll-mt-24">
            {children}
        </div>
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
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [ogImage],
        },
    };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { slug } = await params;
    const data = await getProjectData(slug);

    if (!data) notFound();

    const ldJson = buildProjectLdJson(data.slug, data);
    const hasDetails = hasProjectDetails(data);

    return (
        <PageShell className="space-y-10 py-12">
            <ProjectHero project={data} hasDetails={hasDetails} />

            <AnchorSection id="overview">
                <ProjectOverview project={data} />
            </AnchorSection>

            {hasDetails ? (
                <AnchorSection id="details">
                    <ProjectDetails project={data} />
                </AnchorSection>
            ) : null}

            {data.gallery?.length ? (
                <AnchorSection id="gallery">
                    <GalleryPreview images={data.gallery} title={data.title} />
                </AnchorSection>
            ) : null}

            <section className="card p-6 sm:p-8" aria-label="Aller plus loin sur ce projet">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <p className="text-(--text)">{projectsPageContent.detail.finalCta}</p>

                    <ProjectActions project={data} variant="footer" />
                </div>
            </section>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }} />
        </PageShell>
    );
}
