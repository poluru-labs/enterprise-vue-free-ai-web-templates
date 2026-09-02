import { computed } from 'vue';
import { showToast } from '@poluru-labs/enterprise-design-system-vue';
import { DEAL_COLUMNS } from '../constants/theme.js';
import { useQuotaStore } from '../stores/quota.js';
import { downloadCsv, toCsv } from '../utils/csv.js';

export function useDeals() {
  const { state, ownerFilterOptions, logActivity } = useQuotaStore();

  const filteredDeals = computed(() => {
    const list =
      state.stageTab === 'all'
        ? state.deals
        : state.deals.filter((item) => item.stage.toLowerCase() === state.stageTab);
    const ownerLabel = ownerFilterOptions.value.find((option) => option.value === state.ownerFilter)?.label;
    const ownerOk = (item) => state.ownerFilter === 'all' || item.owner === ownerLabel;
    const q = state.query.trim().toLowerCase();
    return list.filter(
      (item) => ownerOk(item) && (!q || `${item.account} ${item.owner} ${item.stage}`.toLowerCase().includes(q)),
    );
  });

  const pagedDeals = computed(() => {
    const start = (state.page - 1) * state.perPage;
    return filteredDeals.value.slice(start, start + state.perPage);
  });

  function exportDealsCsv() {
    const csv = toCsv(DEAL_COLUMNS, filteredDeals.value);
    downloadCsv('quota-pipeline.csv', csv);
    showToast({
      title: 'Exported',
      description: 'Pipeline deals exported to CSV.',
      variant: 'success',
    });
  }

  function submitActivity(form) {
    if (!form.account.trim()) {
      showToast({ title: 'Account required', description: 'Pick a deal before logging activity.', variant: 'warning' });
      return false;
    }
    logActivity({
      account: form.account,
      type: form.type,
      notes: form.notes,
    });
    state.activityOpen = false;
    showToast({
      title: 'Activity logged',
      description: `${form.type.replace('-', ' ')} saved for ${form.account}.`,
      variant: 'success',
    });
    return true;
  }

  return {
    filteredDeals,
    pagedDeals,
    exportDealsCsv,
    submitActivity,
    ownerFilterOptions,
  };
}
