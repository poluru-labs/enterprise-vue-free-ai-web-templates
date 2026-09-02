import { describe, expect, it } from 'vitest';
import { extraPlaybookCard, extraTeamCard, padToColumns } from '../src/utils/grid.js';

describe('padToColumns', () => {
  it('leaves a full row alone', () => {
    const items = [{ id: 'a' }, { id: 'b' }, { id: 'c' }];
    expect(padToColumns(items, 3)).toHaveLength(3);
  });

  it('adds extra team cards when a row would be short', () => {
    const items = [{ id: 't1' }, { id: 't2' }, { id: 't3' }, { id: 't4' }];
    const padded = padToColumns(items, 3, extraTeamCard);
    expect(padded).toHaveLength(6);
    expect(padded[4].padded).toBe(true);
    expect(padded[4].name).toContain('Open quota seat');
  });

  it('adds extra playbook cards when a row would be short', () => {
    const items = [{ id: 'p1' }, { id: 'p2' }, { id: 'p3' }, { id: 'p4' }, { id: 'p5' }];
    const padded = padToColumns(items, 3, extraPlaybookCard);
    expect(padded).toHaveLength(6);
    expect(padded[5].padded).toBe(true);
    expect(padded[5].title).toContain('hygiene standup');
  });
});
