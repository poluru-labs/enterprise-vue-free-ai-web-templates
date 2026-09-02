import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import StatCard from './StatCard.vue';

describe('StatCard', () => {
  it('renders the label and value', () => {
    const wrapper = mount(StatCard, {
      props: {
        label: 'Headcount',
        value: '18',
        hint: '12 active · 6 on leave',
      },
    });
    expect(wrapper.text()).toContain('Headcount');
    expect(wrapper.text()).toContain('18');
    expect(wrapper.text()).toContain('12 active · 6 on leave');
  });

  it('shows an upward trend', () => {
    const wrapper = mount(StatCard, {
      props: { label: 'eNPS', value: '48', trend: 'up', trendValue: '+5' },
    });
    expect(wrapper.text()).toContain('+5');
    expect(wrapper.find('.grove-stat-trend.is-up').exists()).toBe(true);
  });

  it('shows a downward trend', () => {
    const wrapper = mount(StatCard, {
      props: { label: 'Time-to-hire', value: '26d', trend: 'down', trendValue: '-4d' },
    });
    expect(wrapper.text()).toContain('-4d');
    expect(wrapper.find('.grove-stat-trend.is-down').exists()).toBe(true);
  });

  it('renders a sparkline when values are provided', () => {
    const wrapper = mount(StatCard, {
      props: { label: 'Learning hours', value: '307', sparkline: [180, 214, 258, 307] },
    });
    expect(wrapper.find('[data-testid="sparkline"]').exists()).toBe(true);
  });
});
