// src/components/home/SkillsSnapshot.tsx
import Chip from '@/components/ui/Chip';
import { chipPropsByKind } from './home.utils';

export default function SkillsSnapshot() {
    return (
        <section className="grid gap-6 md:grid-cols-2">
            <div className="card p-6">
                <h2 className="text-lg font-semibold" style={{ color: 'var(--text-strong)' }}>
                    Front-end React / Next.js
                </h2>
                <p className="mt-2 text-sm opacity-80">Je construis des interfaces propres, maintenables et agréables à utiliser.</p>

                <div className="mt-4 flex flex-wrap gap-2">
                    <Chip {...chipPropsByKind('tech')}>React</Chip>
                    <Chip {...chipPropsByKind('tech')}>Next.js (App Router)</Chip>
                    <Chip {...chipPropsByKind('tech')}>TypeScript</Chip>
                    <Chip {...chipPropsByKind('design')}>Design system</Chip>
                    <Chip {...chipPropsByKind('design')}>UI/UX</Chip>
                </div>
            </div>

            <div className="card p-6">
                <h2 className="text-lg font-semibold" style={{ color: 'var(--text-strong)' }}>
                    Qualité & livraison
                </h2>
                <p className="mt-2 text-sm opacity-80">Je fais attention aux détails qui comptent : accessibilité, performance et déploiement.</p>

                <div className="mt-4 flex flex-wrap gap-2">
                    <Chip {...chipPropsByKind('architecture')}>Accessibilité (a11y)</Chip>
                    <Chip {...chipPropsByKind('architecture')}>Performance Web</Chip>
                    <Chip {...chipPropsByKind('tool')}>Vercel</Chip>
                    <Chip {...chipPropsByKind('tool')}>Git</Chip>
                    <Chip {...chipPropsByKind('tech')}>MongoDB / Stripe</Chip>
                </div>
            </div>
        </section>
    );
}
