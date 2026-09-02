import { describe, expect, it } from 'vitest';
import { hygieneTone, quotaVariant, statusTone } from '../src/utils/status.js';

describe('status helpers', () => {
  it('maps pipeline stage to tones', () => {
    expect(statusTone('Commit')).toBe('success');
    expect(statusTone('Negotiate')).toBe('warning');
    expect(statusTone('Discover')).toBe('info');
  });

  it('flags missing next steps as danger', () => {
    expect(hygieneTone({ nextStep: '', staleDays: 2 })).toBe('danger');
    expect(hygieneTone({ nextStep: 'Legal review', staleDays: 9 })).toBe('warning');
    expect(hygieneTone({ nextStep: 'Call', staleDays: 1 })).toBe('success');
  });

  it('flags quota under 70 as warning', () => {
    expect(quotaVariant(88)).toBe('success');
    expect(quotaVariant(61)).toBe('warning');
  });
});
