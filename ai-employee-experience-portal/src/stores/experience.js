import { computed, reactive } from 'vue';
import servicesSeed from '../data/services.json';
import feedbackSeed from '../data/feedback.json';
import announcementsSeed from '../data/announcements.json';
import resourcesSeed from '../data/resources.json';
import settingsSeed from '../data/settings.json';
import { slugify } from '../utils/format';

const state = reactive({
  services: structuredClone(servicesSeed),
  feedback: structuredClone(feedbackSeed),
  announcements: structuredClone(announcementsSeed),
  resources: structuredClone(resourcesSeed),
  settings: structuredClone(settingsSeed),
  serviceOpen: false,
});

export function useExperience() {
  const openServices = computed(() => state.services.filter((item) => item.status === 'open'));
  const busyServices = computed(() => state.services.filter((item) => item.status === 'busy'));
  const openNotes = computed(() =>
    state.feedback.filter((item) => item.status === 'new' || item.status === 'review'),
  );
  const postedAnnouncements = computed(() =>
    state.announcements.filter((item) => item.status === 'posted'),
  );
  const averageScore = computed(() => {
    if (!state.services.length) return 0;
    const total = state.services.reduce((sum, item) => sum + Number(item.score || 0), 0);
    return Math.round((total / state.services.length) * 10) / 10;
  });

  function serviceById(id) {
    return state.services.find((item) => item.id === id);
  }

  function feedbackFor(serviceId) {
    return state.feedback.filter((item) => item.serviceId === serviceId);
  }

  function addService(input) {
    const id = `svc-${slugify(input.name) || 'service'}-${state.services.length + 1}`;
    const service = {
      id,
      name: input.name,
      owner: input.owner,
      category: input.category,
      site: input.site,
      status: 'open',
      wait: Number(input.wait) || 1,
      score: Number(input.score) || 4,
      description: input.description,
      sparkline: [4, 4, 4, 4, Number(input.score) || 4, Number(input.score) || 4],
      externalId: `hr.${slugify(input.name) || 'service'}`,
    };
    state.services.unshift(service);
    state.feedback.unshift({
      id: `fb-${state.feedback.length + 1}`,
      serviceId: id,
      service: service.name,
      author: input.owner,
      owner: input.owner,
      score: service.score,
      status: 'new',
      step: 'asked',
      topic: 'New service',
      note: `${service.name} is now listed for ${service.site}.`,
      opened: input.opened || new Date().toISOString().slice(0, 10),
    });
    return service;
  }

  function updateService(id, patch) {
    const service = serviceById(id);
    if (!service) return;
    Object.assign(service, patch);
  }

  function decideNote(id, status) {
    const note = state.feedback.find((item) => item.id === id);
    if (!note) return;
    note.status = status;
    if (status === 'review') note.step = 'scheduled';
    if (status === 'closed') note.step = 'closed';
  }

  function updateSettings(patch) {
    Object.assign(state.settings, patch);
  }

  function setServiceOpen(open) {
    state.serviceOpen = open;
  }

  return reactive({
    services: computed(() => state.services),
    feedback: computed(() => state.feedback),
    announcements: computed(() => state.announcements),
    resources: computed(() => state.resources),
    settings: computed(() => state.settings),
    serviceOpen: computed(() => state.serviceOpen),
    openServices,
    busyServices,
    openNotes,
    postedAnnouncements,
    averageScore,
    serviceById,
    feedbackFor,
    addService,
    updateService,
    decideNote,
    updateSettings,
    setServiceOpen,
  });
}
