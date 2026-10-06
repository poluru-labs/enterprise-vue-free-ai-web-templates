import { computed, reactive } from 'vue';
import piecesSeed from '../data/pieces.json';
import channelsSeed from '../data/channels.json';
import settingsSeed from '../data/settings.json';
import { SIGNED_IN_USER } from '../constants/navigation.js';
import { slugify } from '../utils/format.js';

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

const state = reactive({
  pieces: clone(piecesSeed),
  channels: clone(channelsSeed.items),
  channelTree: clone(channelsSeed.tree),
  settings: clone(settingsSeed.workspace),
  briefOpen: false,
});

const getters = {
  pieces: computed(() => state.pieces),
  channels: computed(() => state.channels),
  channelTree: computed(() => state.channelTree),
  settings: computed(() => state.settings),
  briefOpen: computed(() => state.briefOpen),
  drafts: computed(() => state.pieces.filter((item) => ['idea', 'draft'].includes(item.status))),
  reviews: computed(() => state.pieces.filter((item) => item.status === 'in_review')),
  scheduled: computed(() => state.pieces.filter((item) => ['approved', 'scheduled'].includes(item.status))),
  published: computed(() => state.pieces.filter((item) => item.status === 'published')),
  liveChannels: computed(() => state.channels.filter((item) => item.status === 'live')),
  calendarFill: computed(() => {
    if (!state.pieces.length) return 0;
    const ready = state.pieces.filter((item) =>
      ['approved', 'scheduled', 'published'].includes(item.status),
    ).length;
    return Math.round((ready / state.pieces.length) * 100);
  }),
  upcoming: computed(() =>
    state.pieces
      .filter((item) => item.status !== 'published')
      .slice()
      .sort((a, b) => String(a.publishOn).localeCompare(String(b.publishOn))),
  ),
};

const actions = {
  setBriefOpen(open) {
    state.briefOpen = Boolean(open);
  },
  getPiece(id) {
    return state.pieces.find((item) => item.id === id) || null;
  },
  getChannel(id) {
    return state.channels.find((item) => item.id === id) || null;
  },
  addPiece(input) {
    const title = input.title?.trim();
    if (!title) return null;
    const record = {
      id: `pce-${slugify(title) || Date.now()}`,
      code: input.code?.trim() || `WEB-${String(state.pieces.length + 1).padStart(2, '0')}`,
      title,
      type: input.type || 'Article',
      channel: input.channel || 'Web',
      owner: input.owner || SIGNED_IN_USER.name,
      reviewer: input.reviewer || 'Tara Poluru',
      status: input.status || 'draft',
      score: Number(input.score || 40),
      words: Number(input.words || 300),
      publishOn: input.publishOn || '',
      updated: new Date().toISOString().slice(0, 10),
      campaign: input.campaign || 'Always on',
      notes: input.notes?.trim() || '',
    };
    state.pieces.unshift(record);
    state.briefOpen = false;
    return record;
  },
  updatePiece(id, patch) {
    const record = this.getPiece(id);
    if (!record) return null;
    Object.assign(record, patch);
    return record;
  },
  updateSettings(patch) {
    Object.assign(state.settings, patch);
    return state.settings;
  },
};

export function useContent() {
  return reactive({ state, ...getters, ...actions });
}
