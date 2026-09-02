import { computed } from 'vue';
import { setEdsTheme } from '@poluru-labs/enterprise-design-system-vue';
import { usePulseStore } from '../stores/pulse.js';

export function useTheme() {
  const { state } = usePulseStore();
  const isDark = computed(() => state.isDark);

  function toggleTheme() {
    state.isDark = !state.isDark;
    setEdsTheme(state.isDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('pulse-theme-dark', state.isDark);
  }

  return { isDark, toggleTheme };
}
