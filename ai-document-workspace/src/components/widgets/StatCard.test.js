import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import StatCard from './StatCard.vue';

describe('StatCard', () => {
  it('renders label, value, and hint', () => {
    const wrapper = mount(StatCard, {
      props: {
        label: 'Documents',
        value: '12.6k',
        hint: '840 added this week',
        trend: 'up',
        trendValue: '+7.2%',
      },
    });
    expect(wrapper.text()).toContain('Documents');
    expect(wrapper.text()).toContain('12.6k');
    expect(wrapper.text()).toContain('840 added this week');
    expect(wrapper.text()).toContain('+7.2%');
  });

  it('renders a sparkline when values are provided', () => {
    const wrapper = mount(StatCard, {
      props: {
        label: 'Storage used',
        value: '68%',
        sparkline: [60, 64, 68],
      },
    });
    expect(wrapper.find('[data-testid="sparkline"]').exists()).toBe(true);
  });
});
