import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import StatCard from './StatCard.vue';

describe('StatCard', () => {
  it('renders the label and value', () => {
    const wrapper = mount(StatCard, {
      props: {
        label: 'Workspaces',
        value: '9',
        hint: '7 live · 1 trial',
      },
    });
    expect(wrapper.text()).toContain('Workspaces');
    expect(wrapper.text()).toContain('9');
    expect(wrapper.text()).toContain('7 live · 1 trial');
  });

  it('shows an upward trend', () => {
    const wrapper = mount(StatCard, {
      props: { label: 'Active members', value: '8', trend: 'up', trendValue: '+1' },
    });
    expect(wrapper.text()).toContain('+1');
    expect(wrapper.find('.hbr-stat-trend.is-up').exists()).toBe(true);
  });

  it('shows a downward trend', () => {
    const wrapper = mount(StatCard, {
      props: { label: 'Plane health', value: '91', trend: 'down', trendValue: '-2' },
    });
    expect(wrapper.text()).toContain('-2');
    expect(wrapper.find('.hbr-stat-trend.is-down').exists()).toBe(true);
  });

  it('renders a sparkline when values are provided', () => {
    const wrapper = mount(StatCard, {
      props: { label: 'Seats used', value: '660', sparkline: [520, 548, 572, 660] },
    });
    expect(wrapper.find('[data-testid="sparkline"]').exists()).toBe(true);
  });
});
