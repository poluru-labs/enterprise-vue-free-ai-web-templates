import { describe, expect, it } from 'vitest';
import { barLayout, gaugeMetrics } from '../src/utils/gauge.js';

describe('gaugeMetrics', () => {
  it('maps 86% of plan to a dash offset on the remaining arc', () => {
    const metrics = gaugeMetrics(86, 26);
    expect(metrics.value).toBe(86);
    expect(metrics.offset).toBeCloseTo(metrics.circumference * 0.14, 5);
  });

  it('clamps out-of-range percents', () => {
    expect(gaugeMetrics(140).value).toBe(100);
    expect(gaugeMetrics(-12).value).toBe(0);
  });
});

describe('barLayout', () => {
  it('places the last bar on the right and scales height', () => {
    const bars = barLayout([10, 20, 40], { width: 100, height: 50, gap: 4, pad: 4 });
    expect(bars).toHaveLength(3);
    expect(bars[2].height).toBeGreaterThan(bars[0].height);
    expect(bars[2].x).toBeGreaterThan(bars[0].x);
  });

  it('returns an empty list for empty values', () => {
    expect(barLayout([])).toEqual([]);
  });
});
