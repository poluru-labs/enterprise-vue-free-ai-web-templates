import { describe, expect, it } from 'vitest';
import { filterDocuments, matchesPath } from './documents.js';

const docs = [
  {
    id: 'DOC-3241',
    name: 'Vendor MSA — Northwind',
    owner: 'Ariana Poluru',
    type: 'Contract',
    scope: 'all',
    folder: 'Legal',
    collection: 'Contracts',
  },
  {
    id: 'DOC-3238',
    name: 'Data retention policy v4',
    owner: 'Devin Poluru',
    type: 'Policy',
    scope: 'pending',
    folder: 'Legal',
    collection: 'Policies',
  },
];

describe('document store filters', () => {
  it('matches folder and collection crumbs', () => {
    expect(matchesPath(docs[0], null, null)).toBe(true);
    expect(matchesPath(docs[0], 'Legal', null)).toBe(true);
    expect(matchesPath(docs[0], 'Legal', 'Contracts')).toBe(true);
    expect(matchesPath(docs[1], 'Legal', 'Contracts')).toBe(false);
  });

  it('filters by owner query and pending scope', () => {
    const hits = filterDocuments(docs, { query: 'devin', scope: 'pending' });
    expect(hits).toHaveLength(1);
    expect(hits[0].id).toBe('DOC-3238');
  });

  it('filters library path crumbs for contracts', () => {
    const hits = filterDocuments(docs, { folderFilter: 'Legal', collectionFilter: 'Contracts' });
    expect(hits.map((doc) => doc.id)).toEqual(['DOC-3241']);
  });
});
