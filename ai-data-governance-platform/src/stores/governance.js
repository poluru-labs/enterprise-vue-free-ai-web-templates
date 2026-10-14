import { computed, reactive } from 'vue';
import assetsSeed from '../data/assets.json';
import policiesSeed from '../data/policies.json';
import qualitySeed from '../data/quality.json';
import requestsSeed from '../data/requests.json';
import settingsSeed from '../data/settings.json';
import { SIGNED_IN_USER } from '../constants/navigation.js';
import { qualityBand, slugify } from '../utils/format.js';

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

const state = reactive({
  assets: clone(assetsSeed),
  quality: clone(qualitySeed),
  policies: clone(policiesSeed),
  requests: clone(requestsSeed),
  settings: clone(settingsSeed),
  assetOpen: false,
});

const getters = {
  assets: computed(() => state.assets),
  quality: computed(() => state.quality),
  policies: computed(() => state.policies),
  requests: computed(() => state.requests),
  settings: computed(() => state.settings),
  assetOpen: computed(() => state.assetOpen),
  passingAssets: computed(() => state.assets.filter((item) => qualityBand(item.quality) === 'passing')),
  watchAssets: computed(() => state.assets.filter((item) => qualityBand(item.quality) === 'watch')),
  failingAssets: computed(() => state.assets.filter((item) => qualityBand(item.quality) === 'failing')),
  openRequests: computed(() => state.requests.filter((item) => item.status === 'requested' || item.status === 'review')),
  publishedPolicies: computed(() => state.policies.filter((item) => item.status === 'published')),
  averageQuality: computed(() => {
    if (!state.assets.length) return 0;
    const sum = state.assets.reduce((total, item) => total + Number(item.quality || 0), 0);
    return Math.round(sum / state.assets.length);
  }),
};

const actions = {
  setAssetOpen(open) {
    state.assetOpen = Boolean(open);
  },
  getAsset(id) {
    return state.assets.find((item) => item.id === id) || null;
  },
  addAsset(input) {
    const name = input.name?.trim();
    if (!name) return null;
    const quality = Number(input.quality ?? 80);
    const record = {
      id: `ast-${slugify(name) || Date.now()}`,
      name,
      domain: input.domain || 'Platform',
      owner: input.owner || SIGNED_IN_USER.name,
      steward: input.steward || SIGNED_IN_USER.name,
      quality,
      classification: input.classification || 'internal',
      system: input.system || 'Warehouse',
      freshness: input.freshness || new Date().toISOString().slice(0, 10),
      rows: Number(input.rows || 0),
      description: input.description?.trim() || '',
      sparkline: [quality - 6, quality - 3, quality],
      externalId: `new.${slugify(name) || 'asset'}`,
    };
    state.assets.unshift(record);
    state.quality.unshift({
      id: `qc-${record.id}`,
      assetId: record.id,
      asset: record.name,
      check: 'Freshness',
      owner: record.owner,
      score: quality,
      status: qualityBand(quality),
      ran: new Date().toISOString(),
    });
    state.assetOpen = false;
    return record;
  },
  updateAsset(id, patch) {
    const record = this.getAsset(id);
    if (!record) return null;
    Object.assign(record, patch);
    return record;
  },
  decideRequest(id, status) {
    const record = state.requests.find((item) => item.id === id);
    if (!record) return null;
    record.status = status;
    record.step = status === 'granted' || status === 'approved' ? status : 'review';
    return record;
  },
  updateSettings(patch) {
    Object.assign(state.settings, patch);
    return state.settings;
  },
};

export function useGovernance() {
  return reactive({ state, ...getters, ...actions });
}
