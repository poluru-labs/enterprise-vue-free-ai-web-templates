import { describe, expect, it } from 'vitest';
import { routes } from './index.js';

describe('grove routes', () => {
  it('registers the nine product views under /hr', () => {
    const names = routes.filter((route) => route.name).map((route) => route.name);
    expect(names).toEqual([
      'overview',
      'people',
      'person-detail',
      'leave',
      'hiring',
      'learning',
      'org',
      'search',
      'settings',
    ]);
    expect(routes.some((route) => route.path === '/hr/overview')).toBe(true);
    expect(routes.some((route) => route.path === '/hr/people/:id')).toBe(true);
  });
});
