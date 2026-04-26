import type { NavLink } from '@/types/content';
import { siteProfile } from './site';

export const primaryNavigation: readonly NavLink[] = [
    { href: '/', label: 'Accueil' },
    { href: '/projects', label: 'Projets' },
    { href: '/skills', label: 'Compétences' },
    { href: '/about', label: 'À propos' },
];

export const headerContent = {
    menuLabel: 'Menu',
    openMenuLabel: 'Ouvrir le menu',
    closeMenuLabel: 'Fermer le menu',
    homeAriaLabel: "Retour à l'accueil",
    desktopNavAriaLabel: 'Navigation principale',
    mobileNavAriaLabel: 'Navigation mobile',
    contactLabel: 'Contact',
    resumeLabel: 'CV',
    resumeHref: siteProfile.resumeHref,
} as const;
