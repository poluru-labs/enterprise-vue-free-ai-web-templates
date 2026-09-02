import { describe, expect, it } from 'vitest';
import { severityTone, slaTone, statusLabel, statusTone } from './status.js';

describe('status helpers', () => {
  it('maps intranet statuses to design-system tones', () => {
    expect(statusTone('Published')).toBe('success');
    expect(statusTone('Draft')).toBe('neutral');
    expect(statusTone('Stale')).toBe('danger');
    expect(statusTone('In review')).toBe('warning');
    expect(statusTone('unknown-status')).toBe('neutral');
    expect(statusTone()).toBe('neutral');
  });

  it('title-cases snake and kebab labels', () => {
    expect(statusLabel('in_review')).toBe('In Review');
    expect(statusLabel('published')).toBe('Published');
    expect(statusLabel('')).toBe('Unknown');
  });

  it('maps severity to a tone', () => {
    expect(severityTone('stale')).toBe('danger');
    expect(severityTone('warning')).toBe('warning');
    expect(severityTone('info')).toBe('info');
    expect(severityTone('')).toBe('neutral');
  });

  it('maps SLA state to a tone', () => {
    expect(slaTone('ok')).toBe('success');
    expect(slaTone('due_tomorrow')).toBe('warning');
    expect(slaTone('stale')).toBe('danger');
  });
});
