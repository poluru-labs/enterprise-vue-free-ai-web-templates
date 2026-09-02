import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import StatCard from './StatCard.vue';

describe('StatCard', () => {
  it('renders the label and value', () => {
    const wrapper = mount(StatCard, {
      props: { label: 'On track', value: '12', hint: '86% of Sprint 24 scope' },
    });
    expect(wrapper.text()).toContain('On track');
    expect(wrapper.text()).toContain('12');
    expect(wrapper.text()).toContain('86% of Sprint 24 scope');
  });

  it('shows an upward trend', () => {
    const wrapper = mount(StatCard, {
      props: { label: 'Velocity', value: '42', trend: 'up', trendValue: '+4 pts' },
    });
    expect(wrapper.text()).toContain('+4 pts');
    expect(wrapper.find('.keel-stat-trend.is-up').exists()).toBe(true);
  });

  it('shows a downward trend', () => {
    const wrapper = mount(StatCard, {
      props: { label: 'At risk', value: '3', trend: 'down', trendValue: '-1' },
    });
    expect(wrapper.text()).toContain('-1');
    expect(wrapper.find('.keel-stat-trend.is-down').exists()).toBe(true);
  });

  it('renders a sparkline when values are provided', () => {
    const wrapper = mount(StatCard, {
      props: { label: 'Capacity', value: '81%', sparkline: [68, 74, 81] },
    });
    expect(wrapper.find('[data-testid="sparkline"]').exists()).toBe(true);
  });
});
