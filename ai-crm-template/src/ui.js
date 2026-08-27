import { computed, reactive } from 'vue';

export const ui = reactive({
  hash: typeof window === 'undefined' ? '#/overview' : window.location.hash || '#/overview',
  commandOpen: false,
  dealOpen: false,
  activityOpen: false,
  leadOpen: false,
  query: '',
  selectedLead: 'lead_hana',
});

export function parseRoute(hash) {
  const path = (hash || '#/overview').replace(/^#/, '') || '/overview';
  const parts = path.split('/').filter(Boolean);
  return { name: parts[0] || 'overview', id: parts[1] || '' };
}

export const route = computed(() => parseRoute(ui.hash));

export function go(path) {
  const next = path.startsWith('#') ? path : `#${path}`;
  window.location.hash = next;
  ui.hash = next;
}
