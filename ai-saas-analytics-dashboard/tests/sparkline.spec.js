import { describe, expect, it } from 'vitest';
import { sparkLastPoint, sparkPoints } from '../src/utils/sparkline.js';

describe('sparkPoints', () => {
  it('returns an empty string for empty values', () => {
    expect(sparkPoints([])).toBe('');
  });

  it('maps the first and last values to the edges', () => {
    const points = sparkPoints([0, 50, 100], 100, 10);
    expect(points.startsWith('0.0,')).toBe(true);
    expect(points.endsWith('100.0,0.0')).toBe(true);
  });

  it('handles a single value', () => {
    expect(sparkPoints([12], 80, 20)).toContain('80.0');
  });
});

describe('sparkLastPoint', () => {
  it('places the last point on the right edge', () => {
    const last = sparkLastPoint([10, 20, 30], 200, 40);
    expect(last.cx).toBe(200);
    expect(last.cy).toBe(0);
  });
});
