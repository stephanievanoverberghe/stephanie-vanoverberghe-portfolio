import { FileText, Github, Linkedin, Mail, Phone } from 'lucide-react';

import type { ContactContent } from '@/types/content';

import { siteNarrative, siteProfile } from './site';

export const contactContent: ContactContent = {
    metadata: {
        title: 'Contact — Vanoverberghe Stéphanie',
        description: 'Contacter Stéphanie Vanoverberghe, développeuse front-end React / Next.js, pour une opportunité professionnelle ou un échange autour d’un projet web.',
    },

    hero: {
        kicker: 'Contact',
        responseDelay: 'Disponible pour échanger',
        title: {
            first: 'Et maintenant ?',
            accent: 'On échange.',
        },
        intro: 'Si mon profil vous parle, je serais ravie d’échanger autour d’une opportunité frontend, d’un projet web ou simplement d’une première discussion professionnelle.',
        ctaPrimary: 'Voir mes projets',
        ctaSecondary: 'Télécharger mon CV',
    },

    form: {
        kicker: 'Message',
        title: 'Écrivez-moi simplement.',
        intro: 'Pas besoin d’un brief parfait. Quelques lignes suffisent : contexte, besoin, opportunité, lien utile… et je vous répondrai avec attention.',
        submitLabel: 'Envoyer',
        loadingLabel: 'Envoi…',
    },

    aside: {
        kicker: 'Coordonnées',
        title: 'Contact direct',
        intro: 'Vous pouvez aussi me retrouver ici. Email, LinkedIn, GitHub et CV sont centralisés au même endroit.',
        noteTitle: 'À très bientôt',
        note: siteNarrative.professionalFocus,
    },

    actions: [
        {
            href: 'mailto:stephanie-vanoverberghe@outlook.fr',
            icon: Mail,
            title: 'Email',
            description: 'stephanie-vanoverberghe@outlook.fr',
        },
        {
            href: 'tel:+33624874771',
            icon: Phone,
            title: 'Téléphone',
            description: '06 24 87 47 71',
        },
        {
            href: siteProfile.socials.linkedin.href,
            icon: Linkedin,
            title: siteProfile.socials.linkedin.label,
            description: 'Profil professionnel',
            external: true,
        },
        {
            href: siteProfile.socials.github.href,
            icon: Github,
            title: siteProfile.socials.github.label,
            description: 'Projets et code source',
            external: true,
        },
        {
            href: siteProfile.resumeHref,
            icon: FileText,
            title: 'CV',
            description: 'Version PDF',
            external: true,
        },
    ],
};
