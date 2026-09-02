import { describe, expect, it } from 'vitest';
import { severityTone, slaTone, statusLabel, statusTone } from './status.js';

describe('status helpers', () => {
  it('maps document statuses to design-system tones', () => {
    expect(statusTone('Approved')).toBe('success');
    expect(statusTone('In review')).toBe('warning');
    expect(statusTone('Draft')).toBe('neutral');
    expect(statusTone('Shared')).toBe('info');
    expect(statusTone('Stale')).toBe('danger');
    expect(statusTone('Connected')).toBe('success');
    expect(statusTone('unknown-status')).toBe('neutral');
    expect(statusTone()).toBe('neutral');
  });

  it('title-cases snake and kebab labels', () => {
    expect(statusLabel('in_review')).toBe('In Review');
    expect(statusLabel('approved')).toBe('Approved');
    expect(statusLabel('')).toBe('Unknown');
  });

  it('maps severity to a tone', () => {
    expect(severityTone('overdue')).toBe('danger');
    expect(severityTone('warning')).toBe('warning');
    expect(severityTone('info')).toBe('info');
    expect(severityTone('')).toBe('neutral');
  });

  it('maps SLA state to a tone', () => {
    expect(slaTone('ok')).toBe('success');
    expect(slaTone('due_tomorrow')).toBe('warning');
    expect(slaTone('overdue')).toBe('danger');
  });
});
