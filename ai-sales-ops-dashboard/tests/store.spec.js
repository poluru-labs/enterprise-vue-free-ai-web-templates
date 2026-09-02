import { describe, expect, it } from 'vitest';
import { useQuotaStore } from '../src/stores/quota.js';

describe('quota store', () => {
  it('keeps the Poluru current user', () => {
    const { state } = useQuotaStore();
    expect(state.currentUser.name).toBe('Priya Poluru');
    expect(state.currentUser.role).toBe('Head of Revenue Ops');
  });

  it('exposes six KPIs and the Q3 forecast gauge inputs', () => {
    const { state } = useQuotaStore();
    expect(state.kpis).toHaveLength(6);
    expect(state.forecast.attainment).toBe(86);
    expect(state.forecast.coverage).toBe(3.1);
    expect(state.pipelineMonths.at(-1)).toBe(4.86);
  });

  it('preserves playbooks, pipeline, and notifications', () => {
    const { state } = useQuotaStore();
    expect(state.playbooks).toHaveLength(5);
    expect(state.playbooks.some((item) => item.title === 'Multi-thread before legal review')).toBe(true);
    expect(state.notifications).toHaveLength(3);
    expect(state.deals.some((item) => item.account === 'Harbor Labs')).toBe(true);
  });

  it('pads teams and playbooks to a full row', () => {
    const { paddedTeams, paddedPlaybooks } = useQuotaStore();
    expect(paddedTeams.value.length % 3).toBe(0);
    expect(paddedPlaybooks.value.length % 3).toBe(0);
    expect(paddedTeams.value.length).toBeGreaterThanOrEqual(6);
    expect(paddedPlaybooks.value.length).toBeGreaterThanOrEqual(6);
  });

  it('flags missing next steps and stale deals', () => {
    const { missingNextStep, staleDeals } = useQuotaStore();
    expect(missingNextStep.value.some((deal) => deal.account === 'Nimbus Retail')).toBe(true);
    expect(staleDeals.value.some((deal) => deal.account === 'Fieldwork Co')).toBe(true);
  });
});
