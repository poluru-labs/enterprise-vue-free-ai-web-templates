import { describe, expect, it } from 'vitest';
import { matchesQuery, normalizeQuery, searchRecords } from './search.js';

const controls = [
  { id: 'ctl-1', title: 'Multi-factor authentication', owner: 'Lakshmi Poluru' },
  { id: 'ctl-2', title: 'Retention and deletion', owner: 'Meera Poluru' },
];

describe('search helpers', () => {
  it('normalizes whitespace and case', () => {
    expect(normalizeQuery('  Kavya Poluru  ')).toBe('kavya poluru');
    expect(normalizeQuery(null)).toBe('');
  });

  it('matches a haystack case-insensitively', () => {
    expect(matchesQuery('Retention and deletion', 'retention')).toBe(true);
    expect(matchesQuery('Retention and deletion', 'atlas')).toBe(false);
  });

  it('filters records across selected fields', () => {
    const hits = searchRecords(controls, 'meera', ['title', 'owner']);
    expect(hits).toHaveLength(1);
    expect(hits[0].id).toBe('ctl-2');
  });
});
