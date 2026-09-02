import { describe, expect, it } from 'vitest';
import { routes } from '../src/router/index.js';

describe('pulse routes', () => {
  it('registers the nine product views', () => {
    const names = routes.filter((route) => route.name).map((route) => route.name);
    expect(names).toEqual([
      'overview',
      'activation',
      'retention',
      'usage',
      'cohorts',
      'experiments',
      'requests',
      'search',
      'settings',
    ]);
  });
});
