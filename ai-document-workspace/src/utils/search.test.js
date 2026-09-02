import { describe, expect, it } from 'vitest';
import { matchesQuery, normalizeQuery, searchGroups, searchRecords } from './search.js';

const documents = [
  { id: 'DOC-3241', name: 'Vendor MSA — Northwind', owner: 'Ariana Poluru', status: 'Approved' },
  { id: 'DOC-3238', name: 'Data retention policy v4', owner: 'Devin Poluru', status: 'In review' },
  { id: 'DOC-3204', name: 'Incident response runbook', owner: 'Owen Poluru', status: 'Approved' },
];

describe('search helpers', () => {
  it('normalizes whitespace and case', () => {
    expect(normalizeQuery('  Vendor MSA  ')).toBe('vendor msa');
    expect(normalizeQuery(null)).toBe('');
  });

  it('matches a haystack case-insensitively', () => {
    expect(matchesQuery('Vendor MSA — Northwind', 'northwind')).toBe(true);
    expect(matchesQuery('Vendor MSA — Northwind', 'atlas')).toBe(false);
    expect(matchesQuery('anything', '')).toBe(true);
  });

  it('returns the original list when the query is empty', () => {
    expect(searchRecords(documents, '  ')).toEqual(documents);
  });

  it('filters records across selected fields', () => {
    const hits = searchRecords(documents, 'retention', ['name', 'owner']);
    expect(hits).toHaveLength(1);
    expect(hits[0].id).toBe('DOC-3238');
  });

  it('filters command groups down to matching items', () => {
    const groups = searchGroups(
      [
        {
          group: 'Go to',
          items: [
            { label: 'Overview', hint: 'KPIs and review queue' },
            { label: 'Library', hint: 'Browse documents' },
          ],
        },
      ],
      'browse',
    );
    expect(groups).toHaveLength(1);
    expect(groups[0].items.map((item) => item.label)).toEqual(['Library']);
  });
});
