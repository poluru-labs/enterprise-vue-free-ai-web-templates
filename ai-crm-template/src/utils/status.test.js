import { describe, expect, it } from 'vitest';
import { dealHealthTone, healthTone, severityTone, stageTone, statusLabel, statusTone } from './status.js';

describe('status helpers', () => {
  it('maps CRM statuses to design-system tones', () => {
    expect(statusTone('Healthy')).toBe('success');
    expect(statusTone('Expanding')).toBe('success');
    expect(statusTone('Ready')).toBe('success');
    expect(statusTone('Working')).toBe('warning');
    expect(statusTone('Negotiation')).toBe('brand');
    expect(statusTone('At risk')).toBe('danger');
    expect(statusTone('unknown-status')).toBe('neutral');
    expect(statusTone()).toBe('neutral');
  });

  it('maps pipeline stages', () => {
    expect(stageTone('Closed won')).toBe('success');
    expect(stageTone('Negotiation')).toBe('brand');
    expect(stageTone('Proposal')).toBe('info');
    expect(stageTone('Discovery')).toBe('warning');
    expect(stageTone('Qualify')).toBe('neutral');
  });

  it('maps account and deal health', () => {
    expect(healthTone('Expanding')).toBe('success');
    expect(healthTone('Healthy')).toBe('success');
    expect(healthTone('At risk')).toBe('danger');
    expect(healthTone('New')).toBe('info');
    expect(dealHealthTone(86)).toBe('success');
    expect(dealHealthTone(50)).toBe('warning');
    expect(dealHealthTone(38)).toBe('danger');
  });

  it('title-cases snake and kebab labels', () => {
    expect(statusLabel('closed_won')).toBe('Closed Won');
    expect(statusLabel('ok')).toBe('Ok');
    expect(statusLabel('')).toBe('Unknown');
  });

  it('maps severity to a tone', () => {
    expect(severityTone('critical')).toBe('danger');
    expect(severityTone('P1')).toBe('danger');
    expect(severityTone('P2')).toBe('warning');
    expect(severityTone('P3')).toBe('info');
    expect(severityTone('resolved')).toBe('success');
    expect(severityTone('')).toBe('neutral');
  });
});
