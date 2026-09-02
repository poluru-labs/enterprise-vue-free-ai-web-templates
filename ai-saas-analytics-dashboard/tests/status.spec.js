import { describe, expect, it } from 'vitest';
import { priorityVariant, quotaVariant, statusTone } from '../src/utils/status.js';

describe('status helpers', () => {
  it('maps request status to tones', () => {
    expect(statusTone('Shipped')).toBe('success');
    expect(statusTone('In progress')).toBe('warning');
    expect(statusTone('Planned')).toBe('info');
  });

  it('maps priority to variants', () => {
    expect(priorityVariant('High')).toBe('danger');
    expect(priorityVariant('Medium')).toBe('warning');
    expect(priorityVariant('Low')).toBe('brand');
  });

  it('flags quota under 70 as warning', () => {
    expect(quotaVariant(88)).toBe('success');
    expect(quotaVariant(64)).toBe('warning');
  });
});
