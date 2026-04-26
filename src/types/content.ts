export type NavLink = {
    href: `/${string}` | '/';
    label: string;
};

export type ExternalLink = {
    href: string;
    label: string;
};

export type SiteSocialLinks = {
    github: ExternalLink;
    linkedin: ExternalLink;
};

export type SiteProfile = {
    name: string;
    firstName: string;
    role: string;
    signature: string;
    availability: string;
    primaryStack: readonly string[];
    resumeHref: string;
    avatar: {
        src: string;
        alt: string;
    };
    quote: string;
    socials: SiteSocialLinks;
};
