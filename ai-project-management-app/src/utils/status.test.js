import { describe, expect, it } from 'vitest';
import { columnLabel, loadTone, severityTone, statusLabel, statusTone } from './status.js';

describe('status helpers', () => {
  it('maps delivery statuses to design-system tones', () => {
    expect(statusTone('Done')).toBe('success');
    expect(statusTone('On track')).toBe('success');
    expect(statusTone('In progress')).toBe('info');
    expect(statusTone('Review')).toBe('warning');
    expect(statusTone('At risk')).toBe('danger');
    expect(statusTone('unknown-status')).toBe('neutral');
    expect(statusTone()).toBe('neutral');
  });

  it('maps issue types and columns', () => {
    expect(statusTone('bug')).toBe('danger');
    expect(statusTone('story')).toBe('info');
    expect(columnLabel('todo')).toBe('To do');
    expect(columnLabel('in_progress')).toBe('In progress');
    expect(columnLabel('review')).toBe('Review');
    expect(columnLabel('done')).toBe('Done');
  });

  it('title-cases snake and kebab labels', () => {
    expect(statusLabel('in_progress')).toBe('In Progress');
    expect(statusLabel('ok')).toBe('Ok');
    expect(statusLabel('')).toBe('Unknown');
  });

  it('maps severity and team load', () => {
    expect(severityTone('critical')).toBe('danger');
    expect(severityTone('high')).toBe('danger');
    expect(severityTone('medium')).toBe('warning');
    expect(severityTone('low')).toBe('info');
    expect(severityTone('')).toBe('neutral');
    expect(loadTone(90)).toBe('warning');
    expect(loadTone(81)).toBe('brand');
    expect(loadTone(67)).toBe('success');
  });
});
