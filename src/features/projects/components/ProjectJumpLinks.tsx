type Props = {
    hasDetails: boolean;
    hasGallery: boolean;
    labels: {
        overview: string;
        details: string;
        gallery: string;
    };
};

export default function ProjectJumpLinks({ hasDetails, hasGallery, labels }: Props) {
    return (
        <nav className="mt-7 flex flex-wrap gap-2">
            <a href="#overview" className="btn btn-secondary">
                {labels.overview}
            </a>

            {hasDetails ? (
                <a href="#details" className="btn btn-secondary">
                    {labels.details}
                </a>
            ) : null}

            {hasGallery ? (
                <a href="#gallery" className="btn btn-secondary">
                    {labels.gallery}
                </a>
            ) : null}
        </nav>
    );
}
