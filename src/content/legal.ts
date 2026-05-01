export const legalPagesContent = {
    mentions: {
        metadata: {
            title: 'Mentions légales - Stéphanie Vanoverberghe',
            description: 'Informations légales relatives au portfolio de Stéphanie Vanoverberghe : éditrice du site, hébergement et propriété intellectuelle.',
        },
        hero: {
            kicker: 'Cadre du site',
            title: ['Mentions', 'légales.'],
        },
        sections: [
            {
                title: 'Édition du site',
                items: [
                    'Site édité par Stéphanie Vanoverberghe.',
                    'Directrice de la publication : Stéphanie Vanoverberghe.',
                    'Objet du site : présentation d’un portfolio frontend, de projets et d’études de cas.',
                    'Contact : via la page /contact, le profil LinkedIn ou le profil GitHub mentionnés sur le site.',
                ],
            },
            {
                title: 'Hébergement',
                items: [
                    'Hébergeur : Vercel Inc.',
                    'Adresse communiquée dans la documentation légale publique de Vercel : 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.',
                    'Site : https://vercel.com',
                ],
            },
            {
                title: 'Propriété intellectuelle',
                items: [
                    'La structure du site, les textes originaux, la direction visuelle et les études de cas sont protégés par le droit d’auteur.',
                    'Les logos, marques, visuels ou noms de services tiers restent la propriété de leurs titulaires respectifs.',
                    'Toute reproduction, adaptation ou réutilisation substantielle sans autorisation préalable n’est pas autorisée, hors usages légitimes de citation ou de partage avec attribution.',
                ],
            },
            {
                title: 'Responsabilité',
                items: [
                    'Les contenus du portfolio sont publiés à titre informatif et peuvent évoluer au fil des mises à jour du site et des projets.',
                    'Malgré le soin apporté à la rédaction, certaines informations peuvent être ajustées, corrigées ou retirées à tout moment.',
                    'Les liens externes sont proposés pour faciliter la consultation de ressources ou de projets associés ; leur contenu reste sous la responsabilité de leurs éditeurs respectifs.',
                ],
            },
        ],
    },
    privacy: {
        metadata: {
            title: 'Politique de confidentialité - Stéphanie Vanoverberghe',
            description: 'Informations sur le traitement des données personnelles collectées via le formulaire de contact du portfolio.',
        },
        hero: {
            kicker: 'Données personnelles',
            title: ['Politique de', 'confidentialité.'],
            intro: 'Le portfolio collecte très peu de données. Cette page explique simplement ce qui est traité via le formulaire de contact, pourquoi, et pendant combien de temps.',
        },
        sections: [
            {
                title: 'Données concernées',
                items: [
                    'Le formulaire de contact peut collecter : nom, adresse e-mail, sujet, message et horodatage technique lié à la soumission.',
                    'Le champ honeypot utilisé pour limiter le spam n’a pas vocation à être exploité comme donnée de contact.',
                ],
            },
            {
                title: 'Finalité du traitement',
                items: [
                    'Répondre aux demandes envoyées depuis le portfolio.',
                    'Échanger dans un cadre professionnel, de recrutement ou de collaboration freelance.',
                    'Protéger le formulaire contre les abus automatisés ou les soumissions malveillantes.',
                ],
            },
            {
                title: 'Base légale',
                items: [
                    'Intérêt légitime à répondre aux messages reçus depuis le site.',
                    'Mesures précontractuelles lorsqu’une prise de contact vise une opportunité professionnelle ou une collaboration.',
                ],
            },
            {
                title: 'Destinataires',
                items: [
                    'Les données sont destinées à Stéphanie Vanoverberghe.',
                    'L’hébergement du site est assuré par Vercel.',
                    'Si l’envoi d’e-mail est activé sur l’environnement de déploiement, un prestataire d’envoi transactionnel peut être utilisé pour transmettre le message.',
                ],
            },
            {
                title: 'Durée de conservation',
                items: [
                    'Les messages de contact sont conservés uniquement le temps nécessaire au traitement de la demande et au suivi de l’échange.',
                    'À défaut de suite donnée, une durée de conservation raisonnable d’environ 12 mois maximum après le dernier échange est retenue à titre de référence.',
                ],
            },
            {
                title: 'Cookies et traceurs',
                items: [
                    'Le portfolio n’a pas vocation à utiliser de cookies publicitaires ou de mesure d’audience non essentiels.',
                    'Si des traceurs supplémentaires étaient ajoutés à l’avenir, cette page serait mise à jour en conséquence.',
                ],
            },
            {
                title: 'Vos droits',
                items: [
                    'Vous pouvez demander l’accès, la rectification ou l’effacement des données vous concernant, dans la mesure applicable au traitement effectué.',
                    'Vous pouvez aussi demander une limitation du traitement ou faire valoir une opposition lorsque cela est pertinent.',
                    'Pour exercer ces droits, le point de contact reste la page /contact. Vous pouvez également introduire une réclamation auprès de la CNIL si vous l’estimez nécessaire.',
                ],
            },
        ],
    },
} as const;
