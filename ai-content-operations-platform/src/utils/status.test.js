import { describe, expect, it } from 'vitest';
import { badgeVariant, statusLabel, statusTone } from './status.js';

describe('status helpers', () => {
  it('maps known statuses', () => {
    expect(statusTone('published')).toBe('success');
    expect(statusTone('in_review')).toBe('warning');
    expect(statusTone('draft')).toBe('neutral');
  });

  it('labels underscore keys', () => {
    expect(statusLabel('in_review')).toBe('In Review');
  });

  it('keeps badge variants compatible', () => {
    expect(badgeVariant('scheduled')).toBe('info');
  });
});
