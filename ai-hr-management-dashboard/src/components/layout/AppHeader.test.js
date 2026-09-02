import { mount } from '@vue/test-utils';
import { createRouter, createMemoryHistory } from 'vue-router';
import { describe, expect, it } from 'vitest';
import AppHeader from './AppHeader.vue';
import { routes } from '../../router/index.js';

async function mountHeader() {
  const router = createRouter({
    history: createMemoryHistory(),
    routes,
  });
  router.push('/hr/overview');
  await router.isReady();
  return mount(AppHeader, {
    global: { plugins: [router] },
  });
}

describe('AppHeader', () => {
  it('renders the violet Grove brand, leave cluster, and Labor Day chip', async () => {
    const wrapper = await mountHeader();
    expect(wrapper.text()).toContain('Grove');
    expect(wrapper.text()).toContain('6 on leave this week');
    expect(wrapper.text()).toContain('Next holiday · Labor Day');
    expect(wrapper.find('.grove-header').exists()).toBe(true);
    expect(wrapper.find('.grove-header-stripe').exists()).toBe(true);
    expect(wrapper.find('.grove-leave-cluster').exists()).toBe(true);
    expect(wrapper.findAll('.grove-avatar-stack > *').length).toBeGreaterThanOrEqual(4);
  });

  it('exposes search, command, add employee, and Sravani', async () => {
    const wrapper = await mountHeader();
    expect(wrapper.text()).toContain('Add employee');
    expect(wrapper.text()).toContain('Sravani Poluru');
    expect(wrapper.find('[aria-label="Search people"]').exists()).toBe(true);
    expect(wrapper.find('[aria-label="Command palette"]').exists()).toBe(true);
  });
});
