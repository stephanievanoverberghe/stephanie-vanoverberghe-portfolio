import { FileText, Github, Linkedin, Mail, Phone } from 'lucide-react';
import type { ContactContent } from './types';

export const contactContent: ContactContent = {
    kicker: 'Contact',
    responseDelay: 'Réponse sous 24–48h',
    title: 'Me contacter',
    intro: 'Vous avez un projet, une mission ou une opportunité ? Décrivez le contexte, les objectifs et les contraintes : je vous réponds avec une proposition claire.',
    quickResponseTitle: 'Réponse rapide',
    quickResponseText: 'Je réponds sous 24–48h (jours ouvrés).',
    actions: [
        {
            href: 'mailto:stephanie-vanoverberghe@outlook.fr',
            icon: Mail,
            title: 'Email direct',
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
            description: 'Échanges professionnels',
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
            title: 'CV (PDF)',
            description: 'Version à jour',
            external: true,
        },
    ],
};
