// src/app/projects/[slug]/page.tsx
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProjectBySlug, getProjectSlugs } from '@/lib/projects';
import Chip from '@/components/ui/Chip';
import GalleryLightbox from '@/components/projects/GalleryLightbox';

export const dynamic = 'force-static';

/* ---------- Helpers ---------- */
function kindFor(tag: string): 'tech' | 'tool' | 'architecture' | 'design' {
    const t = tag.toLowerCase();
    if (/(webhook|auth|oauth|rbac|dashboard|rsc|ssg|ssr|isr|caching)/.test(t)) return 'architecture';
    if (/(stripe|vercel|eslint|prettier|pnpm|npm|analytics|git)/.test(t)) return 'tool';
    if (/(react|next|typescript|tailwind|framer|mongodb|postgres|prisma|zod|image)/.test(t)) return 'tech';
    return 'tech';
}

/* ---------- SSG ---------- */
export async function generateStaticParams() {
    const slugs = await getProjectSlugs();
    return slugs.map((slug) => ({ slug }));
}

// NOTE: Next 15 → params est une Promise
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const data = await getProjectBySlug(slug);
    if (!data) return { title: 'Projet introuvable' };

    const title = `${data.title} — Étude de cas`;
    const description = data.context ?? `Étude de cas front-end (React/Next.js) : ${data.title}${data.subtitle ? ` — ${data.subtitle}` : ''}.`;

    const ogImage = data.hero?.image ?? data.logo?.image ?? '/og-cover.jpg';

    return {
        title,
        description,
        openGraph: {
            type: 'article',
            title,
            description,
            url: `/projects/${data.slug}`, // si ta liste est en /projets, change ici
            siteName: 'Portfolio — Vanoverberghe Stéphanie',
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: data.hero?.alt ?? data.logo?.alt ?? data.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [ogImage],
        },
    };
}

/* ---------- Page ---------- */
// NOTE: Next 15 → params est une Promise
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const data = await getProjectBySlug(slug);
    if (!data) notFound();

    const ldJson = {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: data.title,
        description: data.context,
        author: { '@type': 'Person', name: 'Vanoverberghe Stéphanie' },
        datePublished: data.year ? `${data.year}-01-01` : undefined,
        image: data.hero?.image ?? data.logo?.image,
        url: `https://www.vanoverberghe-stephanie.dev/projects/${data.slug}`,
        keywords: [...(data.stack ?? []), ...(data.role ?? [])].join(', '),
    };

    return (
        <section className="container-page py-10 space-y-10">
            {/* breadcrumb minimal */}
            <div className="flex items-center justify-between">
                <Link href="/projects" className="text-sm hover:opacity-90" style={{ color: 'var(--text-strong)' }}>
                    ← Retour aux projets
                </Link>
                {data.year ? (
                    <Chip size="xs" color="gold">
                        {data.year}
                    </Chip>
                ) : null}
            </div>

            {/* Header */}
            <header className="space-y-3">
                <h1 className="text-2xl sm:text-3xl font-semibold" style={{ color: 'var(--text-strong)' }}>
                    {data.title}
                </h1>
                {data.subtitle ? <p className="opacity-80">{data.subtitle}</p> : null}

                {/* tags */}
                <div className="flex flex-wrap gap-2">
                    {(data.role ?? []).map((r) => (
                        <Chip key={r} kind="design">
                            {r}
                        </Chip>
                    ))}
                    {(data.stack ?? []).map((s) => (
                        <Chip key={s} kind={kindFor(s)}>
                            {s}
                        </Chip>
                    ))}
                </div>
                <div className="mt-4 hr-soft" />
            </header>

            {/* Hero visuel */}
            <div className="overflow-hidden rounded-2xl border" style={{ borderColor: 'var(--border-soft)', background: 'var(--surface-1)', boxShadow: 'var(--shadow-card)' }}>
                {data.hero?.image ? (
                    <div className="relative aspect-[16/8] w-full">
                        <Image src={data.hero.image} alt={data.hero.alt ?? data.title} fill sizes="100vw" className="object-cover" priority={false} />
                    </div>
                ) : data.logo?.image ? (
                    <div className="relative aspect-[16/8] w-full flex items-center justify-center">
                        <Image src={data.logo.image} alt={data.logo.alt ?? `${data.title} logo`} fill sizes="100vw" className="object-contain p-10" />
                    </div>
                ) : null}
            </div>

            {/* Contexte + Liens */}
            <div className="grid gap-6 md:grid-cols-[1.2fr_.8fr]">
                <article className="card p-6">
                    <h2 className="text-lg font-semibold" style={{ color: 'var(--text-strong)' }}>
                        Contexte
                    </h2>
                    {data.context ? <p className="mt-2 opacity-90">{data.context}</p> : null}
                </article>

                <aside className="card p-6">
                    <h2 className="text-lg font-semibold" style={{ color: 'var(--text-strong)' }}>
                        Liens
                    </h2>
                    <div className="mt-3 flex flex-wrap gap-3">
                        {data.links?.demo ? (
                            <a href={data.links.demo} target="_blank" rel="noopener noreferrer" className="btn btn-cta" style={{ color: '#FDFDFD' }}>
                                Voir la démo
                            </a>
                        ) : null}
                        {data.links?.repo ? (
                            <a href={data.links.repo} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                                Voir le code
                            </a>
                        ) : null}
                        <Link href="/contact" className="btn btn-secondary">
                            Me contacter
                        </Link>
                    </div>
                </aside>
            </div>

            {/* Sections */}
            <div className="grid gap-6 md:grid-cols-3">
                {data.objectives?.length ? (
                    <section className="card p-6">
                        <h3 className="text-base font-semibold" style={{ color: 'var(--text-strong)' }}>
                            Objectifs
                        </h3>
                        <ul className="mt-3 space-y-2 text-sm opacity-90">
                            {data.objectives.map((it) => (
                                <li key={it}>• {it}</li>
                            ))}
                        </ul>
                    </section>
                ) : null}

                {data.challenges?.length ? (
                    <section className="card p-6">
                        <h3 className="text-base font-semibold" style={{ color: 'var(--text-strong)' }}>
                            Défis techniques
                        </h3>
                        <ul className="mt-3 space-y-2 text-sm opacity-90">
                            {data.challenges.map((it) => (
                                <li key={it}>• {it}</li>
                            ))}
                        </ul>
                    </section>
                ) : null}

                {data.solutions?.length ? (
                    <section className="card p-6">
                        <h3 className="text-base font-semibold" style={{ color: 'var(--text-strong)' }}>
                            Solutions apportées
                        </h3>
                        <ul className="mt-3 space-y-2 text-sm opacity-90">
                            {data.solutions.map((it) => (
                                <li key={it}>• {it}</li>
                            ))}
                        </ul>
                    </section>
                ) : null}
            </div>

            {/* Points forts */}
            {data.highlights?.length ? (
                <section className="card p-6">
                    <h3 className="text-base font-semibold" style={{ color: 'var(--text-strong)' }}>
                        Points forts
                    </h3>
                    <ul className="mt-3 grid gap-2 sm:grid-cols-2 text-sm opacity-90">
                        {data.highlights.map((it) => (
                            <li key={it}>• {it}</li>
                        ))}
                    </ul>
                </section>
            ) : null}

            {/* Galerie */}
            {data.gallery?.length ? (
                <section>
                    <h3 className="text-base font-semibold mb-3" style={{ color: 'var(--text-strong)' }}>
                        Galerie
                    </h3>
                    <GalleryLightbox images={data.gallery} title={data.title} />
                </section>
            ) : null}

            {/* CTA bas de page */}
            <section className="card p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <p className="opacity-90">Envie d’en discuter ? Je suis disponible pour un poste front-end React/Next.js.</p>
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

            {/* JSON-LD */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }} />
        </section>
    );
}
