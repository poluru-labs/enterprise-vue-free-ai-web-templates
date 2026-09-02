import { computed } from 'vue';
import { showToast } from '@poluru-labs/enterprise-design-system-vue';
import { REQUEST_COLUMNS } from '../constants/theme.js';
import { usePulseStore } from '../stores/pulse.js';
import { downloadCsv, toCsv } from '../utils/csv.js';

export function useRequests() {
  const { state, ownerFilterOptions, addRequest } = usePulseStore();

  const filteredRequests = computed(() => {
    const list =
      state.requestTab === 'all'
        ? state.requests
        : state.requests.filter((item) => item.type.toLowerCase() === state.requestTab);
    const ownerLabel = ownerFilterOptions.value.find((option) => option.value === state.ownerFilter)?.label;
    const ownerOk = (item) => state.ownerFilter === 'all' || item.owner === ownerLabel;
    const q = state.query.trim().toLowerCase();
    return list.filter((item) => ownerOk(item) && (!q || `${item.title} ${item.owner}`.toLowerCase().includes(q)));
  });

  const pagedRequests = computed(() => {
    const start = (state.page - 1) * state.perPage;
    return filteredRequests.value.slice(start, start + state.perPage);
  });

  function exportRequestsCsv() {
    const csv = toCsv(REQUEST_COLUMNS, filteredRequests.value);
    downloadCsv('feature-requests.csv', csv);
    showToast({
      title: 'Exported',
      description: 'Feature and enhancement requests exported to CSV.',
      variant: 'success',
    });
  }

  function submitRequest(form) {
    if (!form.title.trim()) {
      showToast({ title: 'Title required', description: 'Give the request a short title first.', variant: 'warning' });
      return false;
    }
    const owner = ownerFilterOptions.value.find((option) => option.value === form.owner)?.label ?? form.owner;
    addRequest({
      title: form.title,
      type: form.type[0].toUpperCase() + form.type.slice(1),
      priority: form.priority[0].toUpperCase() + form.priority.slice(1),
      owner,
      due: form.due,
    });
    state.requestOpen = false;
    showToast({
      title: 'Request added',
      description: `${form.title} was added to the enhancements board.`,
      variant: 'success',
    });
    return true;
  }

  return {
    filteredRequests,
    pagedRequests,
    exportRequestsCsv,
    submitRequest,
    ownerFilterOptions,
  };
}
