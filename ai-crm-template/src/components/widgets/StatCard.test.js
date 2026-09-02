import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import StatCard from './StatCard.vue';

describe('StatCard', () => {
  it('renders the label and value', () => {
    const wrapper = mount(StatCard, {
      props: { label: 'Pipeline', value: '$4.86M', hint: 'Weighted $2.41M' },
    });
    expect(wrapper.text()).toContain('Pipeline');
    expect(wrapper.text()).toContain('$4.86M');
    expect(wrapper.text()).toContain('Weighted $2.41M');
  });

  it('shows an upward trend', () => {
    const wrapper = mount(StatCard, {
      props: { label: 'Win rate', value: '31%', trend: 'up', trendValue: '+2.4 pts' },
    });
    expect(wrapper.text()).toContain('+2.4 pts');
    expect(wrapper.find('.bloom-stat-trend.is-up').exists()).toBe(true);
  });

  it('shows a downward trend', () => {
    const wrapper = mount(StatCard, {
      props: { label: 'At risk', value: '9', trend: 'down', trendValue: '-2' },
    });
    expect(wrapper.text()).toContain('-2');
    expect(wrapper.find('.bloom-stat-trend.is-down').exists()).toBe(true);
  });

  it('renders a sparkline when values are provided', () => {
    const wrapper = mount(StatCard, {
      props: { label: 'Quota attained', value: '78%', sparkline: [64, 70, 74, 78] },
    });
    expect(wrapper.find('[data-testid="sparkline"]').exists()).toBe(true);
  });
});
