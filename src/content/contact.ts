import { FileText, Github, Linkedin, Mail, Phone } from 'lucide-react';
import type { ContactContent } from './types';

export const contactContent: ContactContent = {
    kicker: 'Contact',
    responseDelay: 'Disponible pour échanger',
    title: 'Et maintenant ?',
    intro: 'Vous avez mes coordonnées, j’ai la motivation. Si mon profil vous parle, je serais ravie d’échanger avec vous autour d’une opportunité frontend React / Next.js.',
    quickResponseTitle: 'À très bientôt',
    quickResponseText: 'Je réponds avec plaisir aux messages liés à une opportunité CDI, une alternance d’évolution ou un échange professionnel.',
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
