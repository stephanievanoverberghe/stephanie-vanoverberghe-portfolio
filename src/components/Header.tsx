'use client';

import Image from 'next/image';
import Button from './Button';

export default function Header() {
    return (
        <div className="flex items-center justify-between pt-4">
            <Image src="/logo.png" alt="Logo de Stéphanie" width={50} height={50} priority />
            <div className="flex gap-24">
                {/* Réseaux sociaux */}
                <div className="flex gap-2">
                    <Button href="https://github.com/" iconClass="fa-brands fa-github" title="GitHub" />
                    <Button href="https://linkedin.com/" iconClass="fa-brands fa-linkedin-in" title="LinkedIn" />
                    <Button href="mailto:orangestreet@live.fr" iconClass="fa-solid fa-envelope" title="Email" />
                </div>

                {/* Langue et thème */}
                <div className="flex gap-2">
                    <button className="rounded-full w-10 h-10 cursor-pointer bg-[#dde6ec] text-blue-500 hover:bg-blue-500 hover:text-white shadow-[3px_3px_12px_0px_#0384e0]">
                        <i className="fas fa-moon" />
                    </button>
                    <button className="rounded-full w-10 h-10 cursor-pointer bg-[#dde6ec] text-blue-500 hover:bg-blue-500 hover:text-white font-bold shadow-[3px_3px_12px_0px_#0384e0]">
                        EN
                    </button>
                </div>
            </div>
        </div>
    );
}
