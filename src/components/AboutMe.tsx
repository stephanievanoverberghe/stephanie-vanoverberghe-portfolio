'use client';

import Image from 'next/image';
import Button from './Button';

export default function AboutMe() {
    return (
        <div className="flex flex-col h-full justify-between items-center text-center text-[#003962]">
            {/* Haut : photo + nom + infos */}
            <div>
                {/* Photo de profil */}
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border border-[#BDDAEE] mb-4 sm:mb-5 mx-auto">
                    <Image src="/profil.jpg" alt="Stéphanie Vanoverberghe" width={128} height={128} className="object-cover w-full h-full" />
                </div>

                {/* Nom */}
                <h1 className="text-xl sm:text-2xl font-bold text-[#0384E0] mb-4 sm:mb-6 leading-tight">
                    Vanoverberghe
                    <br />
                    Stéphanie
                </h1>

                {/* Poste */}
                <p className="text-sm sm:text-lg mb-5 sm:mb-7">
                    Front-end developer
                    <br />
                    specialized in JavaScript / React
                </p>

                {/* Projet en cours */}
                <p className="text-xs sm:text-sm text-[#1768A1] mb-1">Currently working on</p>
                <p className="text-sm sm:text-base font-medium mb-3">Norel Art</p>

                {/* Localisation */}
                <p className="text-sm sm:text-base">Living in France, Lille</p>
            </div>

            {/* Réseaux sociaux */}
            <div className="flex gap-4 mt-4">
                <Button href="https://github.com/stephanievanoverberghe" iconClass="fa-brands fa-github" title="GitHub" />
                <Button href="https://www.linkedin.com/in/stephanie-vanoverberghe/" iconClass="fa-brands fa-linkedin-in" title="LinkedIn" />
                <Button href="mailto:orangestreet@live.fr" iconClass="fa-solid fa-envelope" title="Email" />
            </div>
        </div>
    );
}
