import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import StatCard from './StatCard.vue';

describe('StatCard', () => {
  it('renders label, value, and hint', () => {
    const wrapper = mount(StatCard, {
      props: {
        label: 'Articles',
        value: '1,847',
        hint: '64 published this month',
        trend: 'up',
        trendValue: '+8.8%',
      },
    });
    expect(wrapper.text()).toContain('Articles');
    expect(wrapper.text()).toContain('1,847');
    expect(wrapper.text()).toContain('64 published this month');
    expect(wrapper.text()).toContain('+8.8%');
  });

  it('renders a sparkline when values are provided', () => {
    const wrapper = mount(StatCard, {
      props: {
        label: 'Spaces',
        value: '6',
        sparkline: [6, 6, 6],
      },
    });
    expect(wrapper.find('[data-testid="sparkline"]').exists()).toBe(true);
  });
});
