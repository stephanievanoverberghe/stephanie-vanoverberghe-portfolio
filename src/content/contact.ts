import { FileText, Github, Linkedin, Mail, Phone, type LucideIcon } from 'lucide-react';

export type ContactAction = {
    href: string;
    icon: LucideIcon;
    title: string;
    description: string;
    external?: boolean;
};

export const CONTACT_ACTIONS: ContactAction[] = [
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
        description: 'Message / opportunités',
        external: true,
    },
    {
        href: 'https://github.com/stephanievanoverberghe',
        icon: Github,
        title: 'GitHub',
        description: 'Code & projets',
        external: true,
    },
    {
        href: '/cv-vanoverberghe-stephanie.pdf',
        icon: FileText,
        title: 'CV (PDF)',
        description: 'Téléchargement',
        external: true,
    },
];
