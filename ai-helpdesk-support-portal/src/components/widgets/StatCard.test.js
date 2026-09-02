import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import StatCard from './StatCard.vue';

describe('StatCard', () => {
  it('renders the label and value', () => {
    const wrapper = mount(StatCard, {
      props: {
        label: 'Open tickets',
        value: '47',
        hint: '12 created today',
      },
    });
    expect(wrapper.text()).toContain('Open tickets');
    expect(wrapper.text()).toContain('47');
    expect(wrapper.text()).toContain('12 created today');
  });

  it('shows an upward trend', () => {
    const wrapper = mount(StatCard, {
      props: { label: 'Resolved today', value: '28', trend: 'up', trendValue: '+4' },
    });
    expect(wrapper.text()).toContain('+4');
    expect(wrapper.find('.lumen-stat-trend.is-up').exists()).toBe(true);
  });

  it('shows a downward trend', () => {
    const wrapper = mount(StatCard, {
      props: { label: 'First response', value: '42m', trend: 'down', trendValue: '-8m' },
    });
    expect(wrapper.text()).toContain('-8m');
    expect(wrapper.find('.lumen-stat-trend.is-down').exists()).toBe(true);
  });

  it('renders a sparkline when values are provided', () => {
    const wrapper = mount(StatCard, {
      props: { label: 'Open tickets', value: '47', sparkline: [34, 36, 41, 47] },
    });
    expect(wrapper.find('[data-testid="sparkline"]').exists()).toBe(true);
  });
});
