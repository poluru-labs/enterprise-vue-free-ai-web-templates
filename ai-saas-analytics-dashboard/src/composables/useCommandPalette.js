import { computed, onBeforeUnmount, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { NAV_ITEMS } from '../constants/nav.js';
import { usePulseStore } from '../stores/pulse.js';
import { useTheme } from './useTheme.js';

export function useCommandPalette() {
  const router = useRouter();
  const { state } = usePulseStore();
  const { toggleTheme } = useTheme();

  const commandQuery = computed({
    get: () => state.commandQuery ?? '',
    set: (value) => {
      state.commandQuery = value;
    },
  });

  if (state.commandQuery === undefined) {
    state.commandQuery = '';
  }

  const quickActions = [
    {
      id: 'new-request',
      label: 'Add feature or enhancement',
      action: () => {
        state.requestOpen = true;
      },
    },
    {
      id: 'toggle-theme',
      label: 'Toggle light / dark theme',
      action: () => toggleTheme(),
    },
    {
      id: 'goto-search',
      label: 'Open search',
      action: () => router.push('/search'),
    },
  ];

  const filteredCommands = computed(() => {
    const q = String(state.commandQuery ?? '').trim().toLowerCase();
    const navMatches = NAV_ITEMS.filter((item) => !q || item.label.toLowerCase().includes(q));
    const actionMatches = quickActions.filter((item) => !q || item.label.toLowerCase().includes(q));
    return [...navMatches, ...actionMatches];
  });

  function openCommand() {
    state.commandOpen = true;
  }

  function closeCommand() {
    state.commandOpen = false;
    state.commandQuery = '';
  }

  function runCommand(item) {
    closeCommand();
    if (item.action) {
      item.action();
      return;
    }
    if (item.to) {
      router.push(item.to);
    }
  }

  function onKey(event) {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      openCommand();
    }
  }

  onMounted(() => window.addEventListener('keydown', onKey));
  onBeforeUnmount(() => window.removeEventListener('keydown', onKey));

  return {
    commandQuery,
    filteredCommands,
    openCommand,
    closeCommand,
    runCommand,
  };
}
