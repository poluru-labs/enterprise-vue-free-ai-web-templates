import { describe, expect, it } from 'vitest';
import { matchesQuery, normalizeQuery, searchGroups, searchRecords } from './search.js';

const deals = [
  { id: 'deal_harbor', name: 'Harbor platform expansion', account: 'Harbor & Co.', owner: 'Priya Poluru' },
  { id: 'deal_nimbus', name: 'Nimbus omnichannel suite', account: 'Nimbus Retail', owner: 'Arjun Poluru' },
  { id: 'deal_atlas', name: 'Atlas Freight inbound', account: 'Atlas Freight', owner: 'Arjun Poluru' },
];

describe('search helpers', () => {
  it('normalizes whitespace and case', () => {
    expect(normalizeQuery('  Harbor & Co.  ')).toBe('harbor & co.');
    expect(normalizeQuery(null)).toBe('');
  });

  it('matches a haystack case-insensitively', () => {
    expect(matchesQuery('Harbor platform expansion', 'harbor')).toBe(true);
    expect(matchesQuery('Harbor platform expansion', 'nimbus')).toBe(false);
    expect(matchesQuery('anything', '')).toBe(true);
  });

  it('returns the original list when the query is empty', () => {
    expect(searchRecords(deals, '  ')).toEqual(deals);
  });

  it('filters records across selected fields', () => {
    const hits = searchRecords(deals, 'nimbus', ['name', 'account']);
    expect(hits).toHaveLength(1);
    expect(hits[0].id).toBe('deal_nimbus');
  });

  it('filters command groups down to matching items', () => {
    const groups = searchGroups(
      [
        {
          group: 'Go to',
          items: [
            { label: 'Pipeline', hint: 'Stage board' },
            { label: 'Reports', hint: 'Forecast by rep' },
          ],
        },
      ],
      'forecast',
    );
    expect(groups).toHaveLength(1);
    expect(groups[0].items.map((item) => item.label)).toEqual(['Reports']);
  });
});
