import { describe, expect, it } from 'vitest';
import { severityTone, slaTone, statusLabel, statusTone } from './status.js';

describe('status helpers', () => {
  it('maps people-ops statuses to design-system tones', () => {
    expect(statusTone('Active')).toBe('success');
    expect(statusTone('Approved')).toBe('success');
    expect(statusTone('On leave')).toBe('warning');
    expect(statusTone('Pending')).toBe('warning');
    expect(statusTone('Denied')).toBe('danger');
    expect(statusTone('Offboarding')).toBe('danger');
    expect(statusTone('unknown-status')).toBe('neutral');
    expect(statusTone()).toBe('neutral');
  });

  it('title-cases snake and kebab labels', () => {
    expect(statusLabel('on_leave')).toBe('On Leave');
    expect(statusLabel('active')).toBe('Active');
    expect(statusLabel('')).toBe('Unknown');
  });

  it('maps severity to a tone', () => {
    expect(severityTone('critical')).toBe('danger');
    expect(severityTone('error')).toBe('danger');
    expect(severityTone('watch')).toBe('warning');
    expect(severityTone('warn')).toBe('warning');
    expect(severityTone('ok')).toBe('info');
    expect(severityTone('resolved')).toBe('success');
    expect(severityTone('')).toBe('neutral');
  });

  it('maps SLA state to a tone', () => {
    expect(slaTone('ok')).toBe('success');
    expect(slaTone('warn')).toBe('warning');
    expect(slaTone('watch')).toBe('warning');
    expect(slaTone('error')).toBe('danger');
  });
});
