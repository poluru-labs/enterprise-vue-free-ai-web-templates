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
    expect(formatPercent(68)).toBe('68.0%');
    expect(formatPercent(68, 0)).toBe('68%');
    expect(formatNumber(18400)).toBe('18,400');
  });

  it('formats a valid timestamp without throwing', () => {
    const stamp = '2026-10-04T14:20:00.000Z';
    expect(formatDateTime(stamp)).not.toBe('—');
    expect(formatDate(stamp)).toMatch(/2026/);
  });

  it('builds initials', () => {
    expect(initials('Ananya Poluru')).toBe('AP');
  });
});
