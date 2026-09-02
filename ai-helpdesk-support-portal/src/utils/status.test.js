import { describe, expect, it } from 'vitest';
import { severityTone, slaTone, statusLabel, statusTone } from './status.js';

describe('status helpers', () => {
  it('maps helpdesk statuses to design-system tones', () => {
    expect(statusTone('Resolved')).toBe('success');
    expect(statusTone('Closed')).toBe('success');
    expect(statusTone('Waiting')).toBe('warning');
    expect(statusTone('Pending')).toBe('warning');
    expect(statusTone('Open')).toBe('info');
    expect(statusTone('Breached')).toBe('danger');
    expect(statusTone('Urgent')).toBe('danger');
    expect(statusTone('unknown-status')).toBe('neutral');
    expect(statusTone()).toBe('neutral');
  });

  it('title-cases snake and kebab labels', () => {
    expect(statusLabel('at_risk')).toBe('At Risk');
    expect(statusLabel('open')).toBe('Open');
    expect(statusLabel('')).toBe('Unknown');
  });

  it('maps severity to a tone', () => {
    expect(severityTone('critical')).toBe('danger');
    expect(severityTone('urgent')).toBe('danger');
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
    expect(slaTone('breached')).toBe('danger');
  });
});
