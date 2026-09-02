import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import HygieneView from '../src/views/HygieneView.vue';

describe('HygieneView', () => {
  it('lists missing next steps and stale deals', () => {
    const wrapper = mount(HygieneView);
    expect(wrapper.text()).toContain('Missing next step');
    expect(wrapper.text()).toContain('Stale deals');
    expect(wrapper.text()).toContain('Nimbus Retail');
    expect(wrapper.text()).toContain('Fieldwork Co');
    expect(wrapper.text()).toContain('Harbor Labs');
  });
});
