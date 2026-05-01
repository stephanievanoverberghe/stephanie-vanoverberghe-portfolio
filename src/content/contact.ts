import { FileText, Github, Linkedin, Mail, Phone } from 'lucide-react';

import type { ContactContent } from '@/types/content';

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
        intro: 'Si mon profil vous parle, je serais ravie d’échanger autour d’une opportunité frontend React / Next.js, d’un projet web ou simplement d’une première discussion professionnelle.',
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
        intro: 'Vous pouvez aussi me retrouver ici. Email, LinkedIn, GitHub ou CV : tout est centralisé.',
        noteTitle: 'À très bientôt',
        note: 'Je réponds avec plaisir aux messages liés à une opportunité CDI, une mission frontend ou un échange professionnel.',
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
            href: 'https://www.linkedin.com/in/stephanie-vanoverberghe/',
            icon: Linkedin,
            title: 'LinkedIn',
            description: 'Profil professionnel',
            external: true,
        },
        {
            href: 'https://github.com/stephanievanoverberghe',
            icon: Github,
            title: 'GitHub',
            description: 'Projets et code source',
            external: true,
        },
        {
            href: '/cv-vanoverberghe-stephanie.pdf',
            icon: FileText,
            title: 'CV',
            description: 'Version PDF',
            external: true,
        },
    ],
};
