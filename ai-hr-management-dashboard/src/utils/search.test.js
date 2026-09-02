import { describe, expect, it } from 'vitest';
import { matchesQuery, normalizeQuery, searchGroups, searchRecords } from './search.js';

const people = [
  { id: 'p-sravani', name: 'Sravani Poluru', title: 'People lead', department: 'People' },
  { id: 'p-kavya', name: 'Kavya Poluru', title: 'Staff engineer', department: 'Engineering' },
  { id: 'p-nisha', name: 'Nisha Poluru', title: 'Brand manager', department: 'Marketing' },
];

describe('search helpers', () => {
  it('normalizes whitespace and case', () => {
    expect(normalizeQuery('  Sravani Poluru  ')).toBe('sravani poluru');
    expect(normalizeQuery(null)).toBe('');
  });

  it('matches a haystack case-insensitively', () => {
    expect(matchesQuery('Sravani Poluru people lead', 'sravani')).toBe(true);
    expect(matchesQuery('Sravani Poluru people lead', 'atlas')).toBe(false);
    expect(matchesQuery('anything', '')).toBe(true);
  });

  it('returns the original list when the query is empty', () => {
    expect(searchRecords(people, '  ')).toEqual(people);
  });

  it('filters records across selected fields', () => {
    const hits = searchRecords(people, 'engineering', ['name', 'title', 'department']);
    expect(hits).toHaveLength(1);
    expect(hits[0].id).toBe('p-kavya');
  });

  it('filters command groups down to matching items', () => {
    const groups = searchGroups(
      [
        {
          group: 'Go to',
          items: [
            { label: 'Overview', hint: 'Headcount and pulse' },
            { label: 'Leave', hint: 'PTO and holidays' },
          ],
        },
      ],
      'pto',
    );
    expect(groups).toHaveLength(1);
    expect(groups[0].items.map((item) => item.label)).toEqual(['Leave']);
  });
});
