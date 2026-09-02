import { describe, expect, it } from 'vitest';
import {
  formatCompact,
  formatCompactCurrency,
  formatCurrency,
  formatDate,
  formatDateTime,
  formatDuration,
  formatNumber,
  formatPercent,
  formatShortDate,
  formatTime,
  inDateRange,
} from './format.js';

describe('format helpers', () => {
  it('returns an em dash for empty or invalid values', () => {
    expect(formatDateTime()).toBe('—');
    expect(formatDate(null)).toBe('—');
    expect(formatShortDate('')).toBe('—');
    expect(formatTime('not-a-date')).toBe('—');
    expect(formatDuration(undefined)).toBe('—');
    expect(formatPercent(NaN)).toBe('—');
    expect(formatNumber(null)).toBe('—');
    expect(formatCompact('x')).toBe('—');
    expect(formatCurrency(undefined)).toBe('—');
    expect(formatCompactCurrency(null)).toBe('—');
  });

  it('formats percentages with a configurable precision', () => {
    expect(formatPercent(78)).toBe('78.0%');
    expect(formatPercent(96.42, 1)).toBe('96.4%');
    expect(formatPercent(12.345, 2)).toBe('12.35%');
  });

  it('formats integers with grouping separators', () => {
    expect(formatNumber(312)).toBe('312');
    expect(formatNumber(1847)).toBe('1,847');
  });

  it('formats currency values', () => {
    expect(formatCurrency(184000)).toBe('$184,000');
    expect(formatCompactCurrency(4860000)).toMatch(/\$4\.9M|\$4\.86M/i);
  });

  it('formats durations from minutes into compact units', () => {
    expect(formatDuration(0.5)).toBe('30s');
    expect(formatDuration(12)).toBe('12m');
    expect(formatDuration(90)).toBe('1h 30m');
    expect(formatDuration(120)).toBe('2h');
  });

  it('formats compact counts', () => {
    expect(formatCompact(1847)).toMatch(/1\.8/i);
  });

  it('formats a valid timestamp without throwing', () => {
    const stamp = '2026-08-24T18:42:00.000Z';
    expect(formatDateTime(stamp)).not.toBe('—');
    expect(formatDate(stamp)).toMatch(/2026/);
    expect(formatShortDate(stamp).length).toBeGreaterThan(3);
    expect(formatTime(stamp).length).toBeGreaterThan(3);
  });

  it('filters ISO values against an inclusive date range', () => {
    const stamp = '2026-08-24T18:00:00.000Z';
    expect(inDateRange(stamp, '2026-08-24', '2026-08-24')).toBe(true);
    expect(inDateRange(stamp, '2026-08-25', '2026-08-26')).toBe(false);
    expect(inDateRange('', '2026-08-24', '2026-08-24')).toBe(false);
  });
});
