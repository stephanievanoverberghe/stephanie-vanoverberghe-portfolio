'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Button from './Button';

export default function Header() {
    const [showMobileBar, setShowMobileBar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                setShowMobileBar(false); // vers le bas → cache
            } else {
                setShowMobileBar(true); // vers le haut → montre
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <>
            {/* Version tablette & desktop */}
            <div className="hidden sm:flex items-center justify-between pt-4">
                <Image src="/logo.png" alt="Logo de Stéphanie" width={50} height={50} priority />
                <div className="flex gap-24">
                    <div className="flex gap-2">
                        <Button href="https://github.com/stephanievanoverberghe" iconClass="fa-brands fa-github" title="GitHub" />
                        <Button href="https://www.linkedin.com/in/stephanie-vanoverberghe/" iconClass="fa-brands fa-linkedin-in" title="LinkedIn" />
                        <Button href="mailto:orangestreet@live.fr" iconClass="fa-solid fa-envelope" title="Email" />
                    </div>

                    <div className="flex gap-2">
                        <button className="rounded-full w-10 h-10 bg-[#dde6ec] cursor-pointer text-[#0384E0] hover:bg-[#0384E0] hover:text-white shadow-[3px_3px_12px_0px_#0384e0] transition-all duration-200">
                            <i className="fas fa-moon" />
                        </button>
                        <button className="rounded-full w-10 h-10 bg-[#dde6ec] cursor-pointer text-[#0384E0] hover:bg-[#0384E0] hover:text-white font-bold shadow-[3px_3px_12px_0px_#0384e0] transition-all duration-200">
                            EN
                        </button>
                    </div>
                </div>
            </div>

            {/* Version mobile */}
            <div className="flex sm:hidden flex-col items-center gap-4 pt-4">
                <Image src="/logo.png" alt="Logo de Stéphanie" width={50} height={50} priority />
            </div>

            {/* Réseaux sociaux mobile avec slide animation */}
            <div
                className={`fixed bottom-4 left-0 right-0 flex justify-center sm:hidden z-50 transform transition-transform duration-300 ${
                    showMobileBar ? 'translate-y-0' : 'translate-y-24'
                }`}
            >
                <div className="flex gap-4 bg-[#bddaee] p-2 rounded-full shadow-lg backdrop-blur-md">
                    <Button href="https://github.com/stephanievanoverberghe" iconClass="fa-brands fa-github" title="GitHub" />
                    <Button href="https://www.linkedin.com/in/stephanie-vanoverberghe/" iconClass="fa-brands fa-linkedin-in" title="LinkedIn" />
                    <Button href="mailto:orangestreet@live.fr" iconClass="fa-solid fa-envelope" title="Email" />
                </div>
            </div>
        </>
    );
}
