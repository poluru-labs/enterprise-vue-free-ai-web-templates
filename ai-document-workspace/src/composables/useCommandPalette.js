import { onMounted, onUnmounted, ref } from 'vue';

export function useCommandPalette() {
  const open = ref(false);

  function setOpen(value) {
    open.value = Boolean(value);
  }

  function toggle() {
    open.value = !open.value;
  }

  function onKeyDown(event) {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      toggle();
    }
  }

  onMounted(() => window.addEventListener('keydown', onKeyDown));
  onUnmounted(() => window.removeEventListener('keydown', onKeyDown));

  return { open, setOpen, toggle };
}
