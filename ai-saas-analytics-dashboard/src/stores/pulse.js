import { computed, reactive } from 'vue';
import payload from '../data/pulse.json';
import { extraExperimentCard, padToColumns } from '../utils/grid.js';

function clone(value) {
  return structuredClone(value);
}

const state = reactive({
  currentUser: clone(payload.currentUser),
  kpis: clone(payload.kpis),
  headerSparklines: clone(payload.headerSparklines),
  mrrMonths: clone(payload.mrrMonths),
  mrrLabels: clone(payload.mrrLabels),
  growthPod: clone(payload.growthPod),
  agenda: clone(payload.agenda),
  atRisk: clone(payload.atRisk),
  playbooks: clone(payload.playbooks),
  experiments: clone(payload.experiments),
  timelineItems: clone(payload.timelineItems),
  notifications: clone(payload.notifications).map((item) => ({ ...item, read: false })),
  ownerOptions: clone(payload.ownerOptions),
  requests: clone(payload.requests),
  activationFunnel: clone(payload.activationFunnel),
  retentionWeeks: clone(payload.retentionWeeks),
  cohorts: clone(payload.cohorts),
  usageFeatures: clone(payload.usageFeatures),
  accountHealth: clone(payload.accountHealth),
  query: '',
  range: 'month',
  isDark: false,
  commandOpen: false,
  requestOpen: false,
  requestTab: 'all',
  ownerFilter: 'all',
  page: 1,
  perPage: 4,
});

const unreadCount = computed(() => state.notifications.filter((item) => !item.read).length);

const paddedExperiments = computed(() =>
  padToColumns(state.experiments, 3, extraExperimentCard),
);

const ownerFilterOptions = computed(() => [{ value: 'all', label: 'All owners' }, ...state.ownerOptions]);

function markAllRead() {
  state.notifications.forEach((item) => {
    item.read = true;
  });
}

function addRequest(request) {
  state.requests.unshift({
    id: `r${Date.now()}`,
    title: request.title,
    type: request.type,
    priority: request.priority,
    status: 'Planned',
    owner: request.owner,
    due: request.due,
  });
}

export function usePulseStore() {
  return {
    state,
    unreadCount,
    paddedExperiments,
    ownerFilterOptions,
    markAllRead,
    addRequest,
  };
}
