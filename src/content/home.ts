import type { PrefaceContent } from '@/types/content';
import { siteProfile } from './site';

export const homeHeroContent: PrefaceContent = {
    title: 'Portfolio frontend',
    role: siteProfile.role,
    availability: 'Recherche CDI — React / Next.js',
    heroKicker: 'Portfolio frontend · React · Next.js · TypeScript',
    heroTitle: {
        first: 'Créer.',
        second: 'Comprendre.',
        third: 'Construire.',
    },
    heroCtaPrimary: 'Voir mes projets',
    heroCtaSecondary: 'CV',
    intro: "Je conçois et développe des interfaces React / Next.js claires, soignées et maintenables. Mon point d'appui : un regard UI/UX, une vraie attention à la lisibilité et une base technique propre.",
    sections: [
        { icon: 'ui', text: 'Design & usage' },
        { icon: 'code', text: 'Code & structure' },
        { icon: 'learning', text: 'Apprendre en créant' },
    ],
    stats: [
        { label: 'Stack', value: 'React · Next.js · TypeScript' },
        { label: 'Approche', value: 'Design + Code + UX' },
        { label: 'Objectif', value: 'Intégrer une équipe frontend' },
    ],
    profileName: siteProfile.name,
    profileRole: 'Développeuse frontend',
    profileStack: 'React · Next.js · TypeScript',
    quote: siteProfile.quote,
};

export const featuredProjectsContent = {
    kicker: 'Études de cas',
    title: 'Des projets où le regard rencontre la structure.',
    intro: "Chaque projet montre une démarche concrète : comprendre le besoin, structurer l'interface, puis livrer un front-end lisible, cohérent et crédible en production.",
    indexLabel: 'Projet',
    cardCta: "Voir l'étude de cas",
    allProjectsLabel: 'Tous les projets',
    otherProjectsLabel: 'Autres réalisations',
} as const;

export const skillsSnapshotContent = {
    kicker: 'Compétences',
    title: 'Du regard créatif à la structure frontend.',
    intro: "Mon approche relie trois exigences : comprendre l'usage, clarifier le contenu et construire des composants durables.",
    groups: [
        {
            icon: 'eye',
            kicker: 'Regard',
            title: 'Interface, usage & direction visuelle',
            text: "Je pense l'interface comme un espace à lire, à comprendre et à parcourir : hiérarchie, rythme, contraste, cohérence et expérience utilisateur.",
            chips: [
                { label: 'UI/UX', kind: 'design' },
                { label: 'Design system', kind: 'design' },
                { label: 'Responsive', kind: 'design' },
                { label: 'Accessibilité', kind: 'architecture' },
            ],
        },
        {
            icon: 'code2',
            kicker: 'Structure',
            title: 'Frontend React / Next.js',
            text: "Je transforme une intention visuelle en composants React propres, maintenables et réutilisables, avec une attention particulière à la qualité du code.",
            chips: [
                { label: 'React', kind: 'tech' },
                { label: 'Next.js App Router', kind: 'tech' },
                { label: 'TypeScript', kind: 'tech' },
                { label: 'Tailwind CSS', kind: 'tech' },
            ],
        },
        {
            icon: 'gauge',
            kicker: 'Qualité',
            title: 'Performance, accessibilité & finition',
            text: "Je fais attention aux détails invisibles qui changent l'expérience : temps de chargement, rendu fluide, lisibilité, accessibilité et cohérence responsive.",
            chips: [
                { label: 'Performance Web', kind: 'architecture' },
                { label: 'A11y', kind: 'architecture' },
                { label: 'SEO technique', kind: 'architecture' },
                { label: 'Vercel', kind: 'tool' },
            ],
        },
        {
            icon: 'layers3',
            kicker: 'Produit',
            title: 'Logique projet & livraison',
            text: "J'aime comprendre le besoin avant de coder : clarifier l'objectif, organiser les contenus, découper les composants et livrer une interface solide.",
            chips: [
                { label: 'Git', kind: 'tool' },
                { label: 'Zod', kind: 'tech' },
                { label: 'MongoDB', kind: 'tech' },
                { label: 'Stripe', kind: 'tool' },
            ],
        },
    ],
} as const;
