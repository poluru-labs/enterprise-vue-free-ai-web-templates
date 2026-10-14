import { computed, reactive } from 'vue';
import deploymentsSeed from '../data/deployments.json';
import environmentsSeed from '../data/environments.json';
import infraSeed from '../data/infra.json';
import pipelinesSeed from '../data/pipelines.json';
import settingsSeed from '../data/settings.json';
import uptimeSeed from '../data/uptime.json';
import { SIGNED_IN_USER } from '../constants/navigation.js';
import { slugify, successBand } from '../utils/format.js';

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

const IN_FLIGHT = new Set(['queued', 'building', 'rolling', 'staged']);

const state = reactive({
  pipelines: clone(pipelinesSeed),
  environments: clone(environmentsSeed),
  deployments: clone(deploymentsSeed),
  uptime: clone(uptimeSeed),
  infra: clone(infraSeed),
  settings: clone(settingsSeed),
  pipelineOpen: false,
});

const getters = {
  pipelines: computed(() => state.pipelines),
  environments: computed(() => state.environments),
  deployments: computed(() => state.deployments),
  uptime: computed(() => state.uptime),
  infra: computed(() => state.infra),
  settings: computed(() => state.settings),
  pipelineOpen: computed(() => state.pipelineOpen),
  passingPipelines: computed(() => state.pipelines.filter((item) => item.status === 'passing')),
  watchPipelines: computed(() => state.pipelines.filter((item) => item.status === 'watch')),
  failingPipelines: computed(() => state.pipelines.filter((item) => item.status === 'failing')),
  inFlight: computed(() => state.deployments.filter((item) => IN_FLIGHT.has(item.status))),
  healthyEnvs: computed(() => state.environments.filter((item) => item.status === 'healthy')),
  averageSuccess: computed(() => {
    if (!state.pipelines.length) return 0;
    const sum = state.pipelines.reduce((total, item) => total + Number(item.success || 0), 0);
    return Math.round(sum / state.pipelines.length);
  }),
  averageUptime: computed(() => {
    if (!state.uptime.length) return 0;
    const sum = state.uptime.reduce((total, item) => total + Number(item.uptime || 0), 0);
    return Math.round((sum / state.uptime.length) * 100) / 100;
  }),
};

const actions = {
  setPipelineOpen(open) {
    state.pipelineOpen = Boolean(open);
  },
  getPipeline(id) {
    return state.pipelines.find((item) => item.id === id) || null;
  },
  addPipeline(input) {
    const name = input.name?.trim();
    if (!name) return null;
    const success = Number(input.success ?? 95);
    const record = {
      id: `pipe-${slugify(name) || Date.now()}`,
      name,
      service: input.service?.trim() || slugify(name),
      owner: input.owner || SIGNED_IN_USER.name,
      branch: input.branch || 'main',
      status: successBand(success),
      durationMin: Number(input.durationMin || 5),
      success,
      environment: input.environment || 'Staging',
      region: input.region || 'us-east',
      lastRun: new Date().toISOString(),
      description: input.description?.trim() || '',
      sparkline: [success - 2, success - 1, success],
      externalId: `new.${slugify(name) || 'pipeline'}`,
    };
    state.pipelines.unshift(record);
    state.deployments.unshift({
      id: `dep-${record.id}`,
      pipelineId: record.id,
      service: record.name,
      owner: record.owner,
      environment: record.environment,
      status: 'queued',
      step: 'queued',
      version: '0.1.0',
      started: new Date().toISOString().slice(0, 10),
      note: 'Queued by Meera Poluru.',
    });
    state.pipelineOpen = false;
    return record;
  },
  updatePipeline(id, patch) {
    const record = this.getPipeline(id);
    if (!record) return null;
    Object.assign(record, patch);
    if (patch.success != null) record.status = successBand(patch.success);
    return record;
  },
  decideDeploy(id, status) {
    const record = state.deployments.find((item) => item.id === id);
    if (!record) return null;
    record.status = status;
    record.step = status === 'shipped' ? 'shipped' : status === 'failed' ? 'building' : status;
    return record;
  },
  updateSettings(patch) {
    Object.assign(state.settings, patch);
    return state.settings;
  },
};

export function useDevops() {
  return reactive({ state, ...getters, ...actions });
}
