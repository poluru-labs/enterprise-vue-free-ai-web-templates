import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import OverviewView from '../src/views/OverviewView.vue';

describe('OverviewView', () => {
  it('renders six KPI cards, the MRR chart, and at-risk accounts', () => {
    const wrapper = mount(OverviewView);
    expect(wrapper.text()).toContain('Overview');
    expect(wrapper.text()).toContain('MRR');
    expect(wrapper.text()).toContain('Active users');
    expect(wrapper.text()).toContain('Activation');
    expect(wrapper.text()).toContain('Churn');
    expect(wrapper.text()).toContain('NPS');
    expect(wrapper.text()).toContain('Expansion');
    expect(wrapper.findAll('.pulse-kpi-card')).toHaveLength(6);
    expect(wrapper.text()).toContain('MRR pulse');
    expect(wrapper.text()).toContain('Northwind Co');
    expect(wrapper.text()).toContain('At-risk accounts');
  });
});
