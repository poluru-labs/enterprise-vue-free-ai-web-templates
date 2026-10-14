import { onBeforeUnmount, onMounted, ref } from 'vue';

export function useCommandPalette() {
  const open = ref(false);

  function toggle() {
    open.value = !open.value;
  }

  function setOpen(next) {
    open.value = Boolean(next);
  }

  function onKeyDown(event) {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      toggle();
    }
  }

  onMounted(() => window.addEventListener('keydown', onKeyDown));
  onBeforeUnmount(() => window.removeEventListener('keydown', onKeyDown));

  return { open, setOpen, toggle };
}
