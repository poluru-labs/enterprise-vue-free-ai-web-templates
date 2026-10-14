import { onMounted, onUnmounted, ref } from 'vue';

export function useCommandPalette() {
  const open = ref(false);

  function onKey(event) {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      open.value = !open.value;
    }
  }

  onMounted(() => window.addEventListener('keydown', onKey));
  onUnmounted(() => window.removeEventListener('keydown', onKey));

  return {
    open,
    setOpen(next) {
      open.value = Boolean(next);
    },
  };
}
