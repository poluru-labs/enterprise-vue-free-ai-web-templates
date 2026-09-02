import { computed } from 'vue';
import { setEdsTheme } from '@poluru-labs/enterprise-design-system-vue';
import { useQuotaStore } from '../stores/quota.js';

export function useTheme() {
  const { state } = useQuotaStore();
  const isDark = computed(() => state.isDark);

  function toggleTheme() {
    state.isDark = !state.isDark;
    setEdsTheme(state.isDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('quota-theme-dark', state.isDark);
  }

  return { isDark, toggleTheme };
}
