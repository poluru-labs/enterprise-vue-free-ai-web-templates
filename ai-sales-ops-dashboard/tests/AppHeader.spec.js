import { mount } from '@vue/test-utils';
import { createRouter, createMemoryHistory } from 'vue-router';
import { describe, expect, it } from 'vitest';
import AppHeader from '../src/components/layout/AppHeader.vue';
import { routes } from '../src/router/index.js';

async function mountHeader() {
  const router = createRouter({
    history: createMemoryHistory('/sales-ops/'),
    routes,
  });
  router.push('/');
  await router.isReady();
  return mount(AppHeader, {
    global: { plugins: [router] },
  });
}

describe('AppHeader', () => {
  it('renders the navy Quota brand, circular forecast gauge, and 3.1× coverage chip', async () => {
    const wrapper = await mountHeader();
    expect(wrapper.text()).toContain('Quota');
    expect(wrapper.text()).toContain('Sales operations');
    expect(wrapper.text()).toContain('Q3 attainment');
    expect(wrapper.text()).toContain('86%');
    expect(wrapper.text()).toContain('3.1×');
    expect(wrapper.find('.quota-header').exists()).toBe(true);
    expect(wrapper.find('.quota-gauge').exists()).toBe(true);
    expect(wrapper.find('.quota-coverage-chip').exists()).toBe(true);
    expect(wrapper.findAll('.pulse-mini-spark')).toHaveLength(0);
    expect(wrapper.findAll('.bloom-pill')).toHaveLength(0);
  });

  it('exposes search, command, log activity, notifications, and avatar', async () => {
    const wrapper = await mountHeader();
    expect(wrapper.text()).toContain('Log activity');
    expect(wrapper.find('[aria-label="Command palette"]').exists()).toBe(true);
    expect(wrapper.find('[aria-label="Notifications"]').exists()).toBe(true);
    expect(wrapper.text()).toContain('Priya Poluru');
  });
});
