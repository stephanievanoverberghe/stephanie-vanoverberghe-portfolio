import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { MockInstance } from '@vitest/spy';

vi.mock('node:fs/promises', () => ({
    readdir: vi.fn(),
    readFile: vi.fn(),
}));

import { readdir, readFile } from 'node:fs/promises';
import { getAllProjects, getProjectBySlug } from './projects';

const mockedReaddir = readdir as unknown as MockInstance<typeof readdir>;
const mockedReadFile = readFile as unknown as MockInstance<typeof readFile>;

describe('projects loader', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('parses a valid JSON project', async () => {
        mockedReadFile.mockResolvedValueOnce(
            JSON.stringify({
                slug: 'demo-projet',
                title: 'Demo Projet',
                year: 2025,
                stack: ['Next.js', 'TypeScript'],
            }),
        );

        const project = await getProjectBySlug('demo-projet');

        expect(project).toEqual({
            slug: 'demo-projet',
            title: 'Demo Projet',
            order: undefined,
            subtitle: undefined,
            status: undefined,
            year: 2025,
            role: undefined,
            stack: ['Next.js', 'TypeScript'],
            context: undefined,
            vision: undefined,
            objectives: undefined,
            productPrinciples: undefined,
            editorialFoundations: undefined,
            challenges: undefined,
            solutions: undefined,
            highlights: undefined,
            uxHighlights: undefined,
            uiHighlights: undefined,
            metrics: undefined,
            notableDecisions: undefined,
            nextSteps: undefined,
            testing: undefined,
            architecture: undefined,
            links: undefined,
            logo: undefined,
            hero: undefined,
            gallery: undefined,
        });
    });

    it('falls back to file slug when slug is missing from JSON', async () => {
        mockedReadFile.mockResolvedValueOnce(JSON.stringify({ title: 'Projet Sans Slug' }));

        const project = await getProjectBySlug('slug-fallback');
        expect(project?.slug).toBe('slug-fallback');
    });

    it('parses editorial order and published status aliases', async () => {
        mockedReadFile.mockResolvedValueOnce(
            JSON.stringify({
                title: 'Projet Editorial',
                order: 2,
                status: 'termine',
            }),
        );

        const project = await getProjectBySlug('projet-editorial');

        expect(project?.order).toBe(2);
        expect(project?.status).toBe('published');
    });

    it('sorts projects by editorial order before year', async () => {
        mockedReaddir.mockResolvedValueOnce(['alpha.json', 'beta.json', 'gamma.json'] as unknown as Awaited<ReturnType<typeof readdir>>);

        mockedReadFile
            .mockResolvedValueOnce(JSON.stringify({ title: 'Alpha', year: 2022, order: 3 }))
            .mockResolvedValueOnce(JSON.stringify({ title: 'Beta', year: 2025 }))
            .mockResolvedValueOnce(JSON.stringify({ title: 'Gamma', year: 2024, order: 1 }));

        const projects = await getAllProjects();

        expect(projects.map((p) => `${p.title}-${p.order ?? 'na'}-${p.year}`)).toEqual(['Gamma-1-2024', 'Alpha-3-2022', 'Beta-na-2025']);
    });
});
