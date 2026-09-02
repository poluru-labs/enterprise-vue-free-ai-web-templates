import { describe, expect, it } from 'vitest';
import { filterArticles, matchesSpace } from './intranet.js';

const articles = [
  {
    id: 'ATL-1847',
    title: 'Incident severity matrix',
    owner: 'Kavya Poluru',
    space: 'Engineering',
    spaceId: 'engineering',
    type: 'article',
    status: 'Published',
    excerpt: 'Severity-1 pages on-call',
  },
  {
    id: 'ATL-1822',
    title: 'Parental leave: how to start the packet',
    owner: 'Meera Poluru',
    space: 'People',
    spaceId: 'people',
    type: 'how-to',
    status: 'Published',
    excerpt: 'Submit 30 days before the planned start',
  },
  {
    id: 'ATL-1698',
    title: 'Competitive battlecard — Northwind',
    owner: 'Rohan Poluru',
    space: 'GTM',
    spaceId: 'gtm',
    type: 'article',
    status: 'Stale',
    excerpt: 'Refresh before Q4',
  },
];

describe('intranet store filters', () => {
  it('matches a space id from the header switcher', () => {
    expect(matchesSpace(articles[0], null)).toBe(true);
    expect(matchesSpace(articles[0], 'engineering')).toBe(true);
    expect(matchesSpace(articles[1], 'engineering')).toBe(false);
  });

  it('filters by owner query and published status', () => {
    const hits = filterArticles(articles, { query: 'meera', statusFilter: 'Published' });
    expect(hits).toHaveLength(1);
    expect(hits[0].id).toBe('ATL-1822');
  });

  it('filters articles for a GTM space tab', () => {
    const hits = filterArticles(articles, { spaceId: 'gtm' });
    expect(hits.map((item) => item.id)).toEqual(['ATL-1698']);
  });

  it('filters how-tos out of mixed article lists', () => {
    const hits = filterArticles(articles, { typeFilter: 'how-to' });
    expect(hits).toHaveLength(1);
    expect(hits[0].type).toBe('how-to');
  });
});
