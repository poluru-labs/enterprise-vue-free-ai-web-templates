import { computed, reactive } from 'vue';
import controlsSeed from '../data/controls.json';
import auditsSeed from '../data/audits.json';
import policiesSeed from '../data/policies.json';
import risksSeed from '../data/risks.json';
import requirementsSeed from '../data/requirements.json';
import settingsSeed from '../data/settings.json';
import { SIGNED_IN_USER } from '../constants/navigation.js';
import { slugify } from '../utils/format.js';

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

const state = reactive({
  controls: clone(controlsSeed),
  audits: clone(auditsSeed),
  policies: clone(policiesSeed),
  risks: clone(risksSeed),
  requirements: clone(requirementsSeed.items),
  requirementTree: clone(requirementsSeed.tree),
  settings: clone(settingsSeed.workspace),
  controlOpen: false,
});

const getters = {
  controls: computed(() => state.controls),
  audits: computed(() => state.audits),
  policies: computed(() => state.policies),
  risks: computed(() => state.risks),
  requirements: computed(() => state.requirements),
  requirementTree: computed(() => state.requirementTree),
  settings: computed(() => state.settings),
  controlOpen: computed(() => state.controlOpen),
  effectiveControls: computed(() => state.controls.filter((item) => item.status === 'effective')),
  gapControls: computed(() => state.controls.filter((item) => item.status === 'gap')),
  liveAudits: computed(() =>
    state.audits.filter((item) => !['closed', 'cancelled'].includes(item.status)),
  ),
  publishedPolicies: computed(() => state.policies.filter((item) => item.status === 'published')),
  openRisks: computed(() => state.risks.filter((item) => item.status === 'open' || item.status === 'mitigating')),
  coverage: computed(() => {
    if (!state.controls.length) return 0;
    const sum = state.controls.reduce((total, item) => total + Number(item.effectiveness || 0), 0);
    return Math.round(sum / state.controls.length);
  }),
  dueAudits: computed(() =>
    state.audits
      .filter((item) => item.status !== 'closed')
      .slice()
      .sort((a, b) => String(a.end).localeCompare(String(b.end))),
  ),
};

const actions = {
  setControlOpen(open) {
    state.controlOpen = Boolean(open);
  },
  getControl(id) {
    return state.controls.find((item) => item.id === id) || null;
  },
  getAudit(id) {
    return state.audits.find((item) => item.id === id) || null;
  },
  getRequirement(id) {
    return state.requirements.find((item) => item.id === id) || null;
  },
  addControl(input) {
    const title = input.title?.trim();
    if (!title) return null;
    const record = {
      id: `ctl-${slugify(title) || Date.now()}`,
      code: input.code?.trim() || `AC-${String(state.controls.length + 1).padStart(2, '0')}`,
      title,
      domain: input.domain || 'Access',
      framework: input.framework || 'SOC 2',
      owner: input.owner || SIGNED_IN_USER.name,
      status: input.status || 'draft',
      effectiveness: Number(input.effectiveness || 40),
      lastTested: input.lastTested || new Date().toISOString().slice(0, 10),
      nextReview: input.nextReview || '',
      notes: input.notes?.trim() || '',
    };
    state.controls.unshift(record);
    state.controlOpen = false;
    return record;
  },
  updateControl(id, patch) {
    const record = this.getControl(id);
    if (!record) return null;
    Object.assign(record, patch);
    return record;
  },
  updateSettings(patch) {
    Object.assign(state.settings, patch);
    return state.settings;
  },
};

export function useCompliance() {
  return reactive({ state, ...getters, ...actions });
}
