// @ts-nocheck
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { getAllProjects, getProjectBySlug } from './projects';

vi.mock('node:fs/promises', () => ({
    default: {
        readdir: vi.fn(),
        readFile: vi.fn(),
    },
}));

import fs from 'node:fs/promises';

const mockedFs = vi.mocked(fs);

describe('projects loader', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('parses a valid JSON project', async () => {
        mockedFs.readFile.mockResolvedValueOnce(
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
            subtitle: undefined,
            year: 2025,
            role: undefined,
            stack: ['Next.js', 'TypeScript'],
            context: undefined,
            objectives: undefined,
            challenges: undefined,
            solutions: undefined,
            highlights: undefined,
            links: undefined,
            logo: undefined,
            hero: undefined,
            gallery: undefined,
        });
    });

    it('falls back to file slug when slug is missing from JSON', async () => {
        mockedFs.readFile.mockResolvedValueOnce(
            JSON.stringify({
                title: 'Projet Sans Slug',
            }),
        );

        const project = await getProjectBySlug('slug-fallback');

        expect(project?.slug).toBe('slug-fallback');
    });

    it('sorts projects by descending year', async () => {
        mockedFs.readdir.mockResolvedValueOnce(['alpha.json', 'beta.json', 'gamma.json'] as never);

        mockedFs.readFile
            .mockResolvedValueOnce(JSON.stringify({ title: 'Alpha', year: 2022 }))
            .mockResolvedValueOnce(JSON.stringify({ title: 'Beta', year: 2025 }))
            .mockResolvedValueOnce(JSON.stringify({ title: 'Gamma', year: 2024 }));

        const projects = await getAllProjects();

        expect(projects.map((project) => `${project.title}-${project.year}`)).toEqual(['Beta-2025', 'Gamma-2024', 'Alpha-2022']);
    });
});
