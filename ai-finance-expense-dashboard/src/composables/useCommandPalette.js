import { ref } from 'vue';

const open = ref(false);

export function useCommandPalette() {
  function setOpen(value) {
    open.value = Boolean(value);
  }

  function toggle() {
    open.value = !open.value;
  }

  function bindShortcut() {
    const onKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        toggle();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }

  return { open, setOpen, toggle, bindShortcut };
}
