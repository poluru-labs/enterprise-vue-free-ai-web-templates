import { describe, expect, it } from 'vitest';
import { matchesQuery, normalizeQuery, searchGroups, searchRecords } from './search.js';

const tickets = [
  { id: 'LUM-1042', subject: 'SSO login loop', customer: 'Northwind Support', status: 'open' },
  { id: 'LUM-1048', subject: 'Invoice credit request', customer: 'Beacon Finance', status: 'waiting' },
  { id: 'LUM-1051', subject: 'Webhook retries failing', customer: 'Harbor Legal', status: 'open' },
];

describe('search helpers', () => {
  it('normalizes whitespace and case', () => {
    expect(normalizeQuery('  SSO Login  ')).toBe('sso login');
    expect(normalizeQuery(null)).toBe('');
  });

  it('matches a haystack case-insensitively', () => {
    expect(matchesQuery('SSO login loop', 'sso')).toBe(true);
    expect(matchesQuery('SSO login loop', 'atlas')).toBe(false);
    expect(matchesQuery('anything', '')).toBe(true);
  });

  it('returns the original list when the query is empty', () => {
    expect(searchRecords(tickets, '  ')).toEqual(tickets);
  });

  it('filters records across selected fields', () => {
    const hits = searchRecords(tickets, 'northwind', ['subject', 'customer']);
    expect(hits).toHaveLength(1);
    expect(hits[0].id).toBe('LUM-1042');
  });

  it('filters command groups down to matching items', () => {
    const groups = searchGroups(
      [
        {
          group: 'Go to',
          items: [
            { label: 'Overview', hint: 'Load and SLA' },
            { label: 'Inbox', hint: 'Open and waiting tickets' },
          ],
        },
      ],
      'waiting',
    );
    expect(groups).toHaveLength(1);
    expect(groups[0].items.map((item) => item.label)).toEqual(['Inbox']);
  });
});
