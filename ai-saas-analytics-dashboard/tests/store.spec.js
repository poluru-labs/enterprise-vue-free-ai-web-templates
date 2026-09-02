import { describe, expect, it } from 'vitest';
import { usePulseStore } from '../src/stores/pulse.js';

describe('pulse store', () => {
  it('keeps the Poluru current user', () => {
    const { state } = usePulseStore();
    expect(state.currentUser.name).toBe('Ishaan Poluru');
    expect(state.currentUser.role).toBe('Head of Growth');
  });

  it('exposes six KPIs and four header sparklines', () => {
    const { state } = usePulseStore();
    expect(state.kpis).toHaveLength(6);
    expect(state.headerSparklines.map((item) => item.label)).toEqual(['WAU', 'Activation', 'Churn', 'NPS']);
  });

  it('preserves playbooks, requests, and notifications', () => {
    const { state } = usePulseStore();
    expect(state.playbooks).toHaveLength(3);
    expect(state.requests.some((item) => item.title === 'Cohort export to CSV')).toBe(true);
    expect(state.notifications).toHaveLength(3);
  });

  it('pads experiments to a full row', () => {
    const { paddedExperiments } = usePulseStore();
    expect(paddedExperiments.value.length % 3).toBe(0);
    expect(paddedExperiments.value.length).toBeGreaterThanOrEqual(6);
  });
});
