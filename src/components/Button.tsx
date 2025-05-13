'use client';

import Link from 'next/link';
import { FC } from 'react';

type ButtonProps = {
    href: string;
    iconClass: string;
    title?: string;
};

const Button: FC<ButtonProps> = ({ href, iconClass, title }) => {
    return (
        <Link href={href} target="_blank" rel="noopener noreferrer">
            <div
                className="w-10 h-10 flex items-center justify-center rounded-full 
                   bg-[#dde6ec] text-blue-500 
                   hover:bg-blue-500 hover:text-white 
                   transition-all duration-200 shadow-[3px_3px_12px_0px_#0384e0]"
                title={title}
            >
                <i className={`${iconClass} text-lg`} aria-hidden="true" />
            </div>
        </Link>
    );
};

export default Button;
