import { describe, expect, it } from 'vitest';
import { riskBand, statusLabel, statusTone } from './status.js';

describe('status helpers', () => {
  it('maps compliance statuses to tones', () => {
    expect(statusTone('effective')).toBe('success');
    expect(statusTone('gap')).toBe('danger');
    expect(statusTone('in_review')).toBe('warning');
    expect(statusTone()).toBe('neutral');
  });

  it('title-cases snake labels', () => {
    expect(statusLabel('in_review')).toBe('In Review');
    expect(statusLabel('')).toBe('Unknown');
  });

  it('bands residual scores', () => {
    expect(riskBand(16)).toBe('critical');
    expect(riskBand(12)).toBe('high');
    expect(riskBand(8)).toBe('medium');
    expect(riskBand(4)).toBe('low');
  });
});
