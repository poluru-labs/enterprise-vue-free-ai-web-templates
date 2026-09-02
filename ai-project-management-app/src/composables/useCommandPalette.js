import { computed, onBeforeUnmount, onMounted } from 'vue';
import { workspace } from '../stores/projects.js';

export function useCommandPalette() {
  const open = computed({
    get: () => workspace.commandOpen,
    set: (value) => {
      workspace.commandOpen = value;
    },
  });

  function toggle() {
    workspace.commandOpen = !workspace.commandOpen;
  }

  function onKey(event) {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      toggle();
    }
  }

  onMounted(() => window.addEventListener('keydown', onKey));
  onBeforeUnmount(() => window.removeEventListener('keydown', onKey));

  return { open, toggle };
}
