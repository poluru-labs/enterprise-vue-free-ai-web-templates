import { describe, expect, it } from 'vitest';
import {
  formatCompact,
  formatCurrency,
  formatDate,
  formatDateTime,
  formatNumber,
  formatPercent,
  formatTime,
  inDateRange,
  usagePercent,
} from './format.js';

describe('format helpers', () => {
  it('returns an em dash for empty or invalid values', () => {
    expect(formatDateTime()).toBe('—');
    expect(formatDate(null)).toBe('—');
    expect(formatTime('not-a-date')).toBe('—');
    expect(formatPercent(NaN)).toBe('—');
    expect(formatNumber(null)).toBe('—');
    expect(formatCompact('x')).toBe('—');
    expect(formatCurrency(undefined)).toBe('—');
  });

  it('formats percentages, counts, and currency', () => {
    expect(formatPercent(64)).toBe('64%');
    expect(formatPercent(12.345, 2)).toBe('12.35%');
    expect(formatNumber(2418)).toBe('2,418');
    expect(formatCurrency(120100)).toBe('$120,100');
    expect(formatCompact(184200)).toMatch(/184/i);
  });

  it('formats a valid timestamp without throwing', () => {
    const stamp = '2026-08-18T16:42:00.000Z';
    expect(formatDateTime(stamp)).not.toBe('—');
    expect(formatDate(stamp)).toMatch(/2026/);
    expect(formatTime(stamp).length).toBeGreaterThan(3);
  });

  it('computes budget usage and date ranges', () => {
    expect(usagePercent(6400, 10000)).toBe(64);
    expect(usagePercent(10, 0)).toBe(0);
    const stamp = '2026-08-18T18:00:00.000Z';
    expect(inDateRange(stamp, '2026-08-18', '2026-08-18')).toBe(true);
    expect(inDateRange(stamp, '2026-08-19', '2026-08-30')).toBe(false);
    expect(inDateRange('', '2026-08-18', '2026-08-18')).toBe(false);
  });
});
