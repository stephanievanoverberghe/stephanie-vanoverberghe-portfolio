import type { ReactNode } from 'react';

import { Card } from '../components/Card';
import { Heading } from '../components/Heading';
import { Text } from '../components/Text';

type FeatureCardProps = {
    icon?: ReactNode;
    title: string;
    description: string;
};

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
    return (
        <Card hoverable>
            <div className="flex items-start gap-4">
                {icon ? <div className="text-(--accent)">{icon}</div> : null}
                <div>
                    <Heading as="h3" variant="h3">
                        {title}
                    </Heading>
                    <Text className="mt-2">{description}</Text>
                </div>
            </div>
        </Card>
    );
}
