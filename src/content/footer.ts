import { primaryNavigation } from './navigation';
import { siteProfile } from './site';

export const footerContent = {
    cta: {
        ariaLabel: "Appel à l'action",
        kicker: 'Une interface à construire ?',
        title: 'Créons quelque chose de clair, utile et bien pensé.',
        contactLabel: 'Me contacter',
        resumeLabel: 'CV',
    },
    profile: {
        signature: siteProfile.signature,
        name: siteProfile.name,
        role: siteProfile.role,
        intent: 'Concevoir des interfaces belles, lisibles et structurées, avec le regard du design et la rigueur du code.',
        availability: siteProfile.availability,
        stack: siteProfile.primaryStack,
    },
    navigation: {
        title: 'Portfolio',
        links: [...primaryNavigation, { href: '/contact', label: 'Contact' }],
    },
    links: {
        title: 'Liens',
        resume: {
            href: siteProfile.resumeHref,
            label: 'CV PDF',
        },
        socials: [siteProfile.socials.github, siteProfile.socials.linkedin],
    },
    legal: {
        copyrightTemplate: 'Portfolio conçu avec Next.js, TypeScript et Tailwind.',
        backToTopLabel: 'Revenir en haut ↑',
        backToTopAriaLabel: 'Revenir en haut de page',
        links: [
            { href: '/mentions-legales', label: 'Mentions légales' },
            { href: '/politique-confidentialite', label: 'Confidentialité' },
        ],
    },
} as const;
