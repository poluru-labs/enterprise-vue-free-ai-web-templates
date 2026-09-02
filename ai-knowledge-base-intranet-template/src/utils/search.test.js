import { describe, expect, it } from 'vitest';
import { matchesQuery, normalizeQuery, searchGroups, searchRecords } from './search.js';

const articles = [
  { id: 'ATL-1847', title: 'Incident severity matrix', owner: 'Kavya Poluru', status: 'Published' },
  { id: 'ATL-1822', title: 'Parental leave: how to start the packet', owner: 'Meera Poluru', status: 'Published' },
  { id: 'ATL-1698', title: 'Competitive battlecard — Northwind', owner: 'Rohan Poluru', status: 'Stale' },
];

describe('search helpers', () => {
  it('normalizes whitespace and case', () => {
    expect(normalizeQuery('  Parental Leave  ')).toBe('parental leave');
    expect(normalizeQuery(null)).toBe('');
  });

  it('matches a haystack case-insensitively', () => {
    expect(matchesQuery('Incident severity matrix', 'severity')).toBe(true);
    expect(matchesQuery('Incident severity matrix', 'vault')).toBe(false);
    expect(matchesQuery('anything', '')).toBe(true);
  });

  it('returns the original list when the query is empty', () => {
    expect(searchRecords(articles, '  ')).toEqual(articles);
  });

  it('filters records across selected fields', () => {
    const hits = searchRecords(articles, 'northwind', ['title', 'owner']);
    expect(hits).toHaveLength(1);
    expect(hits[0].id).toBe('ATL-1698');
  });

  it('filters command groups down to matching items', () => {
    const groups = searchGroups(
      [
        {
          group: 'Go to',
          items: [
            { label: 'Overview', hint: 'KPIs and stale pages' },
            { label: 'Spaces', hint: 'Browse team spaces' },
          ],
        },
      ],
      'browse',
    );
    expect(groups).toHaveLength(1);
    expect(groups[0].items.map((item) => item.label)).toEqual(['Spaces']);
  });
});
