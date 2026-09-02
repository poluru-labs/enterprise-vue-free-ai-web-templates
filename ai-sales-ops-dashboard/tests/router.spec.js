import { describe, expect, it } from 'vitest';
import { routes } from '../src/router/index.js';

describe('quota routes', () => {
  it('registers the nine sales-ops views', () => {
    const names = routes.filter((route) => route.name).map((route) => route.name);
    expect(names).toEqual([
      'overview',
      'forecast',
      'coverage',
      'pipeline',
      'hygiene',
      'teams',
      'playbooks',
      'search',
      'settings',
    ]);
  });
});
