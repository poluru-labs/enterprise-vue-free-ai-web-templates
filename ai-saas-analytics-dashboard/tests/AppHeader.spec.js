import { mount } from '@vue/test-utils';
import { createRouter, createMemoryHistory } from 'vue-router';
import { describe, expect, it } from 'vitest';
import AppHeader from '../src/components/layout/AppHeader.vue';
import { routes } from '../src/router/index.js';

async function mountHeader() {
  const router = createRouter({
    history: createMemoryHistory('/analytics/'),
    routes,
  });
  router.push('/');
  await router.isReady();
  return mount(AppHeader, {
    global: { plugins: [router] },
  });
}

describe('AppHeader', () => {
  it('renders the indigo Pulse brand and four header sparklines', async () => {
    const wrapper = await mountHeader();
    expect(wrapper.text()).toContain('Pulse');
    expect(wrapper.text()).toContain('WAU');
    expect(wrapper.text()).toContain('Activation');
    expect(wrapper.text()).toContain('Churn');
    expect(wrapper.text()).toContain('NPS');
    expect(wrapper.findAll('.pulse-mini-spark')).toHaveLength(4);
    expect(wrapper.find('.pulse-header').exists()).toBe(true);
  });

  it('exposes search, command, export, and theme controls', async () => {
    const wrapper = await mountHeader();
    expect(wrapper.text()).toContain('Export');
    expect(wrapper.find('[aria-label="Command palette"]').exists()).toBe(true);
    expect(wrapper.find('[aria-label="Switch to dark mode"]').exists()).toBe(true);
  });
});
