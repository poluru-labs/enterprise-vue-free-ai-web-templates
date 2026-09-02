import { describe, expect, it } from 'vitest';
import { matchesQuery, normalizeQuery, searchGroups, searchRecords } from './search.js';

const issues = [
  { id: 'iss_121', key: 'KEEL-121', title: 'Command palette with ⌘K', assignee: 'Arjun Poluru' },
  { id: 'iss_124', key: 'KEEL-124', title: 'Burndown SVG export', assignee: 'Maya Poluru' },
  { id: 'iss_127', key: 'KEEL-127', title: 'Dependency graph for blocked issues', assignee: 'Arjun Poluru' },
];

describe('search helpers', () => {
  it('normalizes whitespace and case', () => {
    expect(normalizeQuery('  Sprint 24  ')).toBe('sprint 24');
    expect(normalizeQuery(null)).toBe('');
  });

  it('matches a haystack case-insensitively', () => {
    expect(matchesQuery('Command palette with ⌘K', 'palette')).toBe(true);
    expect(matchesQuery('Command palette with ⌘K', 'burndown')).toBe(false);
    expect(matchesQuery('anything', '')).toBe(true);
  });

  it('returns the original list when the query is empty', () => {
    expect(searchRecords(issues, '  ')).toEqual(issues);
  });

  it('filters records across selected fields', () => {
    const hits = searchRecords(issues, 'maya', ['title', 'assignee']);
    expect(hits).toHaveLength(1);
    expect(hits[0].id).toBe('iss_124');
  });

  it('filters command groups down to matching items', () => {
    const groups = searchGroups(
      [
        {
          group: 'Go to',
          items: [
            { label: 'Board', hint: 'Sprint columns' },
            { label: 'Risks', hint: 'Blockers and bets' },
          ],
        },
      ],
      'blockers',
    );
    expect(groups).toHaveLength(1);
    expect(groups[0].items.map((item) => item.label)).toEqual(['Risks']);
  });
});
