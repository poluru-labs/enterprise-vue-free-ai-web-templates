import { computed, reactive } from 'vue';
import payload from '../data/quota.json';
import { extraCoverageCard, extraPlaybookCard, extraTeamCard, padToColumns } from '../utils/grid.js';

function clone(value) {
  return structuredClone(value);
}

const state = reactive({
  currentUser: clone(payload.currentUser),
  forecast: clone(payload.forecast),
  kpis: clone(payload.kpis),
  pipelineMonths: clone(payload.pipelineMonths),
  pipelineLabels: clone(payload.pipelineLabels),
  forecastBands: clone(payload.forecastBands),
  pipelineStages: clone(payload.pipelineStages),
  coverageByRep: clone(payload.coverageByRep),
  teamBoard: clone(payload.teamBoard),
  deals: clone(payload.deals),
  agenda: clone(payload.agenda),
  atRisk: clone(payload.atRisk),
  playbooks: clone(payload.playbooks),
  timelineItems: clone(payload.timelineItems),
  notifications: clone(payload.notifications).map((item) => ({ ...item, read: false })),
  ownerOptions: clone(payload.ownerOptions),
  query: '',
  range: 'month',
  isDark: false,
  commandOpen: false,
  commandQuery: '',
  activityOpen: false,
  stageTab: 'all',
  ownerFilter: 'all',
  page: 1,
  perPage: 5,
});

const unreadCount = computed(() => state.notifications.filter((item) => !item.read).length);

const paddedTeams = computed(() => padToColumns(state.teamBoard, 3, extraTeamCard));

const paddedPlaybooks = computed(() => padToColumns(state.playbooks, 3, extraPlaybookCard));

const paddedCoverage = computed(() => padToColumns(state.coverageByRep, 3, extraCoverageCard));

const ownerFilterOptions = computed(() => [{ value: 'all', label: 'All owners' }, ...state.ownerOptions]);

const missingNextStep = computed(() => state.deals.filter((deal) => !String(deal.nextStep ?? '').trim()));

const staleDeals = computed(() => state.deals.filter((deal) => (deal.staleDays ?? 0) >= 7));

function markAllRead() {
  state.notifications.forEach((item) => {
    item.read = true;
  });
}

function logActivity({ account, type, notes }) {
  state.timelineItems.unshift({
    id: Date.now(),
    title: `${type[0].toUpperCase()}${type.slice(1)} logged`,
    description: `${account} · ${state.currentUser.name}`,
    time: 'just now',
  });
  const deal = state.deals.find((item) => item.account === account);
  if (deal) {
    deal.lastTouch = 'just now';
    deal.staleDays = 0;
    if (type === 'next-step' && notes) {
      deal.nextStep = notes;
    }
  }
}

export function useQuotaStore() {
  return {
    state,
    unreadCount,
    paddedTeams,
    paddedPlaybooks,
    paddedCoverage,
    ownerFilterOptions,
    missingNextStep,
    staleDeals,
    markAllRead,
    logActivity,
  };
}
