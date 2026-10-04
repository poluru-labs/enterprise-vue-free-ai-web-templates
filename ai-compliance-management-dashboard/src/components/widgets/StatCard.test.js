import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import StatCard from './StatCard.vue';

describe('StatCard', () => {
  it('renders the label and value', () => {
    const wrapper = mount(StatCard, {
      props: {
        label: 'Controls',
        value: '12',
        hint: '7 effective',
      },
    });
    expect(wrapper.text()).toContain('Controls');
    expect(wrapper.text()).toContain('12');
    expect(wrapper.text()).toContain('7 effective');
  });

  it('shows an upward trend', () => {
    const wrapper = mount(StatCard, {
      props: { label: 'Coverage', value: '84%', trend: 'up', trendValue: '+2' },
    });
    expect(wrapper.text()).toContain('+2');
    expect(wrapper.find('.aeg-stat-trend.is-up').exists()).toBe(true);
  });

  it('renders a sparkline when values are provided', () => {
    const wrapper = mount(StatCard, {
      props: { label: 'Gaps', value: '2', sparkline: [5, 4, 3, 2] },
    });
    expect(wrapper.find('[data-testid="sparkline"]').exists()).toBe(true);
  });
});
