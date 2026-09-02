import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import RequestsView from '../src/views/RequestsView.vue';

describe('RequestsView', () => {
  it('keeps the feature request table', () => {
    const wrapper = mount(RequestsView);
    expect(wrapper.text()).toContain('Feature & enhancement requests');
    expect(wrapper.text()).toContain('Cohort export to CSV');
    expect(wrapper.text()).toContain('Meera Poluru');
  });
});
