import { describe, expect, it } from 'vitest';
import { matchesQuery, normalizeQuery, searchGroups, searchRecords } from './search.js';

const vendors = [
  { id: 'cloudpoluru', name: 'CloudPoluru Services', owner: 'Hana Poluru', status: 'Preferred' },
  { id: 'officepoluru', name: 'OfficePoluru Supplies', owner: 'John Poluru', status: 'Active' },
  { id: 'airlinepoluru', name: 'AirlinePoluru', owner: 'Michael Poluru', status: 'Watch' },
];

describe('search helpers', () => {
  it('normalizes whitespace and case', () => {
    expect(normalizeQuery('  CloudPoluru Services  ')).toBe('cloudpoluru services');
    expect(normalizeQuery(null)).toBe('');
  });

  it('matches a haystack case-insensitively', () => {
    expect(matchesQuery('August close remaining budget', 'close')).toBe(true);
    expect(matchesQuery('August close remaining budget', 'magenta')).toBe(false);
    expect(matchesQuery('anything', '')).toBe(true);
  });

  it('returns the original list when the query is empty', () => {
    expect(searchRecords(vendors, '  ')).toEqual(vendors);
  });

  it('filters records across selected fields', () => {
    const hits = searchRecords(vendors, 'office', ['name', 'owner']);
    expect(hits).toHaveLength(1);
    expect(hits[0].id).toBe('officepoluru');
  });

  it('filters command groups down to matching items', () => {
    const groups = searchGroups(
      [
        {
          group: 'Go to',
          items: [
            { label: 'Overview', hint: 'Close, spend, and AP health' },
            { label: 'Invoices', hint: 'Vendor bills and payments' },
          ],
        },
      ],
      'vendor',
    );
    expect(groups).toHaveLength(1);
    expect(groups[0].items.map((item) => item.label)).toEqual(['Invoices']);
  });
});
