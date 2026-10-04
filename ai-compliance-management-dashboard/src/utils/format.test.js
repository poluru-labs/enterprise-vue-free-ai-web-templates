import { describe, expect, it } from 'vitest';
import { formatDate, formatDateTime, formatNumber, formatPercent, formatTime, initials } from './format.js';

describe('format helpers', () => {
  it('returns an em dash for empty or invalid values', () => {
    expect(formatDateTime()).toBe('—');
    expect(formatDate(null)).toBe('—');
    expect(formatTime('not-a-date')).toBe('—');
    expect(formatPercent(NaN)).toBe('—');
    expect(formatNumber(null)).toBe('—');
  });

  it('formats percentages and integers', () => {
    expect(formatPercent(84)).toBe('84.0%');
    expect(formatPercent(84, 0)).toBe('84%');
    expect(formatNumber(2418)).toBe('2,418');
  });

  it('formats a valid timestamp without throwing', () => {
    const stamp = '2026-09-17T16:42:00.000Z';
    expect(formatDateTime(stamp)).not.toBe('—');
    expect(formatDate(stamp)).toMatch(/2026/);
  });

  it('builds initials', () => {
    expect(initials('Kavya Poluru')).toBe('KP');
  });
});
