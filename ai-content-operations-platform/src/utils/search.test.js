import { describe, expect, it } from 'vitest';
import { matchesQuery, normalizeQuery, searchRecords } from './search.js';

const pieces = [
  { id: 'p1', title: 'Q3 product launch note', owner: 'Meera Poluru' },
  { id: 'p2', title: 'Welcome series', owner: 'Kavya Poluru' },
];

describe('search helpers', () => {
  it('normalizes whitespace and case', () => {
    expect(normalizeQuery('  Ananya Poluru  ')).toBe('ananya poluru');
    expect(normalizeQuery(null)).toBe('');
  });

  it('matches a haystack case-insensitively', () => {
    expect(matchesQuery('Q3 product launch note', 'launch')).toBe(true);
    expect(matchesQuery('Q3 product launch note', 'atlas')).toBe(false);
  });

  it('filters records across selected fields', () => {
    const hits = searchRecords(pieces, 'kavya', ['title', 'owner']);
    expect(hits).toHaveLength(1);
    expect(hits[0].id).toBe('p2');
  });
});
