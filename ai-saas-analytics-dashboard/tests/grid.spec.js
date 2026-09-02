import { describe, expect, it } from 'vitest';
import { extraExperimentCard, padToColumns } from '../src/utils/grid.js';

describe('padToColumns', () => {
  it('leaves a full row alone', () => {
    const items = [{ id: 'a' }, { id: 'b' }, { id: 'c' }];
    expect(padToColumns(items, 3)).toHaveLength(3);
  });

  it('adds extra experiment cards when a row would be short', () => {
    const items = [{ id: 'e1' }, { id: 'e2' }, { id: 'e3' }, { id: 'e4' }, { id: 'e5' }];
    const padded = padToColumns(items, 3, extraExperimentCard);
    expect(padded).toHaveLength(6);
    expect(padded[5].padded).toBe(true);
    expect(padded[5].title).toContain('winback');
  });
});
