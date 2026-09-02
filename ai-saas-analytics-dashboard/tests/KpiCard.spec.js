import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import KpiCard from '../src/components/widgets/KpiCard.vue';

const item = {
  id: 'mrr',
  label: 'MRR',
  value: '$186k',
  hint: 'Net new $22.4k',
  trend: 'up',
  trendValue: '+13.6%',
  spark: [128, 136, 186],
};

describe('KpiCard', () => {
  it('shows the KPI and a sparkline', () => {
    const wrapper = mount(KpiCard, { props: { item } });
    expect(wrapper.text()).toContain('MRR');
    expect(wrapper.text()).toContain('$186k');
    expect(wrapper.find('.pulse-spark').exists()).toBe(true);
  });
});
