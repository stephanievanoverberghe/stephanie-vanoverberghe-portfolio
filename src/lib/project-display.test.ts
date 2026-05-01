import { describe, expect, it } from 'vitest';

import type { Project } from './projects';
import { cardBlurb, getProjectStatusLabel, kindFor, pickStackChips, sortProjectsByRecent } from './project-display';

function createProject(overrides: Partial<Project> = {}): Project {
    return {
        slug: overrides.slug ?? 'demo',
        title: overrides.title ?? 'Demo',
        ...overrides,
    };
}

describe('project display helpers', () => {
    it('maps tags to visual chip families', () => {
        expect(kindFor('UI/UX')).toBe('design');
        expect(kindFor('API route')).toBe('architecture');
        expect(kindFor('Vercel')).toBe('tool');
        expect(kindFor('TypeScript')).toBe('tech');
    });

    it('builds a short card blurb with the right field priority', () => {
        expect(cardBlurb(createProject({ subtitle: 'Sous-titre utile', context: 'Contexte secondaire' }))).toBe('Sous-titre utile');
        expect(cardBlurb(createProject({ context: 'Contexte prioritaire', vision: 'Vision' }))).toBe('Contexte prioritaire');
        expect(cardBlurb(createProject({ objectives: ['Premier objectif'], vision: 'Vision' }))).toBe('Vision');
    });

    it('sorts projects by editorial order, then year, then title', () => {
        const projects = sortProjectsByRecent([
            createProject({ slug: 'beta', title: 'Beta', year: 2025 }),
            createProject({ slug: 'alpha', title: 'Alpha', year: 2024, order: 2 }),
            createProject({ slug: 'gamma', title: 'Gamma', year: 2026, order: 1 }),
        ]);

        expect(projects.map((project) => project.slug)).toEqual(['gamma', 'alpha', 'beta']);
    });

    it('picks high-signal stack chips first without duplicates', () => {
        expect(pickStackChips(['Tailwind CSS', 'React', 'React', 'Vercel', 'TypeScript'], 3)).toEqual(['React', 'TypeScript', 'Tailwind CSS']);
    });

    it('exposes a status label only for in-progress projects', () => {
        expect(getProjectStatusLabel(createProject({ status: 'in-progress' }))).toBe('En cours');
        expect(getProjectStatusLabel(createProject({ status: 'published' }))).toBeNull();
    });
});
