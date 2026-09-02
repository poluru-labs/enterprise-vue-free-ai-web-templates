import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import OverviewView from '../src/views/OverviewView.vue';

describe('OverviewView', () => {
  it('renders six KPI cards, the pipeline chart, and at-risk deals', () => {
    const wrapper = mount(OverviewView);
    expect(wrapper.text()).toContain('Overview');
    expect(wrapper.text()).toContain('Commit');
    expect(wrapper.text()).toContain('Coverage');
    expect(wrapper.text()).toContain('Slippage');
    expect(wrapper.text()).toContain('Hygiene');
    expect(wrapper.text()).toContain('Weighted pipeline');
    expect(wrapper.text()).toContain('Win rate');
    expect(wrapper.findAll('.quota-kpi-card')).toHaveLength(6);
    expect(wrapper.text()).toContain('Pipeline pulse');
    expect(wrapper.text()).toContain('Harbor Labs');
    expect(wrapper.text()).toContain('At-risk deals');
  });
});
