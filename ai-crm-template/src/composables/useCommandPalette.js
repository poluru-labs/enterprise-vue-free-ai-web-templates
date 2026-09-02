import { computed, onBeforeUnmount, onMounted } from 'vue';
import { crm } from '../stores/crm.js';

export function useCommandPalette() {
  const open = computed({
    get: () => crm.commandOpen,
    set: (value) => {
      crm.commandOpen = value;
    },
  });

  function toggle() {
    crm.commandOpen = !crm.commandOpen;
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
