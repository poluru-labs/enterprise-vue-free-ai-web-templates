import { computed } from 'vue';
import { DATE_RANGE_SEGMENTS } from '../constants/theme.js';
import { useQuotaStore } from '../stores/quota.js';

export function useDateRange() {
  const { state } = useQuotaStore();
  const range = computed({
    get: () => state.range,
    set: (value) => {
      state.range = value;
    },
  });
  return { range, segments: DATE_RANGE_SEGMENTS };
}
