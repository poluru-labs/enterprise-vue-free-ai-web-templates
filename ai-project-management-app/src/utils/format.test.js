import { describe, expect, it } from 'vitest';
import { formatDate, formatDateTime, formatNumber, formatPercent, formatPoints, formatShortDate, progressPct } from './format.js';

describe('format helpers', () => {
  it('returns an em dash for empty or invalid values', () => {
    expect(formatDateTime()).toBe('—');
    expect(formatDate(null)).toBe('—');
    expect(formatShortDate('')).toBe('—');
    expect(formatPercent(NaN)).toBe('—');
    expect(formatNumber(null)).toBe('—');
    expect(formatPoints('x', 50)).toBe('—');
  });

  it('formats percentages and grouped integers', () => {
    expect(formatPercent(81)).toBe('81%');
    expect(formatPercent(3.84, 1)).toBe('3.8%');
    expect(formatNumber(1847)).toBe('1,847');
  });

  it('formats story-point fractions used in the header rail', () => {
    expect(formatPoints(34, 50)).toBe('34 / 50');
    expect(progressPct(34, 50)).toBe(68);
    expect(progressPct(0, 0)).toBe(0);
    expect(progressPct(60, 50)).toBe(100);
  });

  it('formats a valid timestamp without throwing', () => {
    const stamp = '2026-09-01T18:00:00.000Z';
    expect(formatDateTime(stamp)).not.toBe('—');
    expect(formatDate(stamp)).toMatch(/2026/);
    expect(formatShortDate(stamp).length).toBeGreaterThan(3);
  });
});
