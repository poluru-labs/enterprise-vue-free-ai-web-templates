import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { createRouter, createMemoryHistory, RouterLink } from 'vue-router';
import AppHeader from './AppHeader.vue';

const stubs = {
  Avatar: true,
  Button: true,
  DropdownMenu: { template: '<div><slot /><slot name="trigger" /></div>' },
  Kbd: { template: '<span>⌘K</span>' },
  List: true,
  MenuItem: true,
  Modal: { template: '<div><slot /></div>' },
  Popover: { template: '<div><slot name="trigger" /><slot /></div>' },
  Search: true,
  Select: {
    template: '<select :value="modelValue" @change="$emit(\'update:modelValue\', $event.target.value)"><slot /></select>',
    props: ['modelValue', 'options'],
  },
  RouterLink,
};

describe('AppHeader', () => {
  it('renders the teal sprint clock and full-width story-point rail', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [{ path: '/:pathMatch(.*)*', component: { template: '<div />' } }],
    });
    await router.push('/projects/overview');
    await router.isReady();

    const wrapper = mount(AppHeader, {
      global: { plugins: [router], stubs },
    });

    expect(wrapper.find('[data-testid="sprint-clock"]').text()).toContain('Sprint 24');
    expect(wrapper.find('[data-testid="sprint-clock"]').text()).toContain('8 days left');
    expect(wrapper.find('[data-testid="sprint-clock"]').text()).toContain('34 / 50');
    expect(wrapper.find('[data-testid="sprint-rail"]').exists()).toBe(true);
    expect(wrapper.find('.keel-rail-fill').attributes('style')).toContain('68%');
    expect(wrapper.text()).toContain('Keel');
    expect(wrapper.text()).toContain('New issue');
  });
});
