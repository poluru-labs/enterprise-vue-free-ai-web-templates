import { computed } from 'vue';
import { useQuotaStore } from '../stores/quota.js';

export function useSearch() {
  const { state } = useQuotaStore();

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
        deals: state.deals,
        playbooks: state.playbooks,
        teams: state.teamBoard,
        notifications: state.notifications,
      };
    }
    const match = (...parts) => parts.join(' ').toLowerCase().includes(q);
    return {
      kpis: state.kpis.filter((item) => match(item.label, item.value, item.hint)),
      deals: state.deals.filter((item) => match(item.account, item.owner, item.stage, item.nextStep)),
      playbooks: state.playbooks.filter((item) => match(item.title, item.content)),
      teams: state.teamBoard.filter((item) => match(item.name, item.region, item.pipeline)),
      notifications: state.notifications.filter((item) => match(item.title, item.body)),
    };
  });

  const resultCount = computed(
    () =>
      results.value.kpis.length +
      results.value.deals.length +
      results.value.playbooks.length +
      results.value.teams.length +
      results.value.notifications.length,
  );

  return { query, results, resultCount };
}
