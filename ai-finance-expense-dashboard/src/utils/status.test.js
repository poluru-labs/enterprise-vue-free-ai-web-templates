import { describe, expect, it } from 'vitest';
import { budgetTone, statusLabel, statusTone } from './status.js';

describe('status helpers', () => {
  it('maps finance statuses to design-system tones', () => {
    expect(statusTone('Approved')).toBe('success');
    expect(statusTone('Paid')).toBe('success');
    expect(statusTone('On Track')).toBe('info');
    expect(statusTone('Pending')).toBe('warning');
    expect(statusTone('At Risk')).toBe('warning');
    expect(statusTone('Overdue')).toBe('danger');
    expect(statusTone('Rejected')).toBe('danger');
    expect(statusTone('unknown-status')).toBe('neutral');
    expect(statusTone()).toBe('neutral');
  });

  it('title-cases snake and kebab labels', () => {
    expect(statusLabel('on_track')).toBe('On Track');
    expect(statusLabel('at-risk')).toBe('At Risk');
    expect(statusLabel('')).toBe('Unknown');
  });

  it('maps budget usage to a tone', () => {
    expect(budgetTone(40)).toBe('success');
    expect(budgetTone(70)).toBe('warning');
    expect(budgetTone(95)).toBe('danger');
  });
});
