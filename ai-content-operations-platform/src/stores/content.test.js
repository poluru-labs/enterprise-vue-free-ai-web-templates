import { describe, expect, it } from 'vitest';
import { useContent } from './content.js';

describe('content store', () => {
  it('adds a brief and closes the modal', () => {
    const store = useContent();
    const record = store.addPiece({ title: 'October recap', owner: 'Ananya Poluru' });
    expect(record?.code).toMatch(/^WEB-/);
    expect(store.briefOpen).toBe(false);
    expect(store.getPiece(record.id)?.title).toBe('October recap');
  });

  it('rejects an empty title', () => {
    const store = useContent();
    expect(store.addPiece({ title: '   ' })).toBeNull();
  });
});
