import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import KpiCard from '../src/components/widgets/KpiCard.vue';

const item = {
  id: 'commit',
  label: 'Commit',
  value: '$936k',
  hint: '78% of quota',
  trend: 'up',
  trendValue: '+9.4%',
  fill: 78,
};

describe('KpiCard', () => {
  it('shows the KPI and a quota fill meter', () => {
    const wrapper = mount(KpiCard, { props: { item } });
    expect(wrapper.text()).toContain('Commit');
    expect(wrapper.text()).toContain('$936k');
    expect(wrapper.find('.quota-kpi-fill').exists()).toBe(true);
  });
});
