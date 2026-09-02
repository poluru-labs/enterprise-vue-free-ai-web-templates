import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import StatusBadge from './StatusBadge.vue';

describe('StatusBadge', () => {
  it('renders an approved expense as success', () => {
    const wrapper = mount(StatusBadge, { props: { status: 'Approved' } });
    expect(wrapper.text()).toMatch(/Approved/i);
  });
});
