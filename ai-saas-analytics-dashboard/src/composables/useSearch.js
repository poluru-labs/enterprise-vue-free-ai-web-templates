import { computed } from 'vue';
import { usePulseStore } from '../stores/pulse.js';

export function useSearch() {
  const { state } = usePulseStore();

  const query = computed({
    get: () => state.query,
    set: (value) => {
      state.query = value;
    },
  });

  const results = computed(() => {
    const q = state.query.trim().toLowerCase();
    if (!q) {
      return {
        kpis: state.kpis,
        requests: state.requests,
        experiments: state.experiments,
        playbooks: state.playbooks,
        notifications: state.notifications,
      };
    }
    const match = (...parts) => parts.join(' ').toLowerCase().includes(q);
    return {
      kpis: state.kpis.filter((item) => match(item.label, item.value, item.hint)),
      requests: state.requests.filter((item) => match(item.title, item.owner, item.type)),
      experiments: state.experiments.filter((item) => match(item.title, item.summary, item.owner)),
      playbooks: state.playbooks.filter((item) => match(item.title, item.content)),
      notifications: state.notifications.filter((item) => match(item.title, item.body)),
    };
  });

  const resultCount = computed(
    () =>
      results.value.kpis.length +
      results.value.requests.length +
      results.value.experiments.length +
      results.value.playbooks.length +
      results.value.notifications.length,
  );

  return { query, results, resultCount };
}
