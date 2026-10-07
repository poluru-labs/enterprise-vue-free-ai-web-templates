import { computed, reactive } from 'vue';
import accountsSeed from '../data/accounts.json';
import activitiesSeed from '../data/activities.json';
import onboardingSeed from '../data/onboarding.json';
import renewalsSeed from '../data/renewals.json';
import settingsSeed from '../data/settings.json';
import { SIGNED_IN_USER } from '../constants/navigation.js';
import { healthBand, slugify } from '../utils/format.js';

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

const state = reactive({
  accounts: clone(accountsSeed),
  renewals: clone(renewalsSeed),
  onboarding: clone(onboardingSeed),
  activities: clone(activitiesSeed),
  settings: clone(settingsSeed),
  accountOpen: false,
});

function band(account) {
  return healthBand(account.health);
}

const getters = {
  accounts: computed(() => state.accounts),
  renewals: computed(() => state.renewals),
  onboarding: computed(() => state.onboarding),
  activities: computed(() => state.activities),
  settings: computed(() => state.settings),
  accountOpen: computed(() => state.accountOpen),
  healthyAccounts: computed(() => state.accounts.filter((item) => band(item) === 'healthy')),
  watchAccounts: computed(() => state.accounts.filter((item) => band(item) === 'watch')),
  riskAccounts: computed(() => state.accounts.filter((item) => band(item) === 'at_risk')),
  openRenewals: computed(() => state.renewals.filter((item) => item.stage !== 'renewed')),
  liveOnboarding: computed(() => state.onboarding.filter((item) => item.stage !== 'live')),
  bookHealth: computed(() => {
    if (!state.accounts.length) return 0;
    const sum = state.accounts.reduce((total, item) => total + Number(item.health || 0), 0);
    return Math.round(sum / state.accounts.length);
  }),
  arr: computed(() => state.accounts.reduce((total, item) => total + Number(item.arr || 0), 0)),
};

const actions = {
  setAccountOpen(open) {
    state.accountOpen = Boolean(open);
  },
  getAccount(id) {
    return state.accounts.find((item) => item.id === id) || null;
  },
  addAccount(input) {
    const name = input.name?.trim();
    if (!name) return null;
    const health = Number(input.health ?? 70);
    const record = {
      id: `acc-${slugify(name) || Date.now()}`,
      name,
      segment: input.segment || 'Mid-market',
      owner: input.owner || SIGNED_IN_USER.name,
      health,
      arr: Number(input.arr || 0),
      renewal: input.renewal || '2026-12-15',
      region: input.region || 'North America',
      seats: Number(input.seats || 25),
      sentiment: Number(input.sentiment || 3),
      stage: 'Onboard',
      nextCall: input.nextCall || '10:00',
      notes: input.notes?.trim() || '',
      sparkline: [health - 8, health - 4, health],
      externalId: `new-${String(state.accounts.length + 1).padStart(3, '0')}`,
      contacts: [{ name: input.owner || SIGNED_IN_USER.name, role: 'Success owner' }],
    };
    state.accounts.unshift(record);
    state.renewals.unshift({
      id: `ren-${record.id}`,
      accountId: record.id,
      account: record.name,
      owner: record.owner,
      arr: record.arr,
      date: record.renewal,
      stage: 'negotiating',
      probability: 50,
      note: 'Added from the book.',
    });
    state.onboarding.unshift({
      id: `onb-${record.id}`,
      accountId: record.id,
      account: record.name,
      owner: record.owner,
      stage: 'kickoff',
      progress: 12,
      kickoff: new Date().toISOString().slice(0, 10),
      goLive: record.renewal,
      time: record.nextCall,
      note: 'Kickoff is on the calendar.',
    });
    state.accountOpen = false;
    return record;
  },
  updateAccount(id, patch) {
    const record = this.getAccount(id);
    if (!record) return null;
    Object.assign(record, patch);
    return record;
  },
  updateSettings(patch) {
    Object.assign(state.settings, patch);
    return state.settings;
  },
};

export function useSuccess() {
  return reactive({ state, ...getters, ...actions });
}
