<script setup>
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { APP_NAME, APP_TAGLINE, NAV_GROUPS } from '../../constants/navigation.js';
import { useHelpdesk } from '../../stores/helpdesk.js';

defineProps({
  open: { type: Boolean, default: false },
});

const emit = defineEmits(['navigate']);
const route = useRoute();
const store = useHelpdesk();
const openCount = computed(() => store.openTickets.value.length);

function isActive(to) {
  if (to.endsWith('/tickets')) {
    return route.path === to || route.path.startsWith(`${to}/`);
  }
  if (to.endsWith('/inbox')) {
    return route.path === to;
  }
  return route.path === to;
}
</script>

<template>
  <aside class="lumen-sidebar" :class="{ 'is-open': open }" aria-label="Lumen">
    <div class="lumen-brand">
      <span class="lumen-mark" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M11 2h2l1.2 4H9.8L11 2zm-3.2 6h8.4l.8 2.4H7l.8-2.4zM8 12h8v2H8v-2zm-1 4h10l1.5 6h-2.1l-.4-1.6H8l-.4 1.6H5.5L7 16zm2.4 2.4h5.2l-.4 1.6H9.8l-.4-1.6z" />
        </svg>
      </span>
      <div class="lumen-brand-copy">
        <strong>{{ APP_NAME }}</strong>
        <span>{{ APP_TAGLINE }}</span>
      </div>
    </div>

    <div v-for="group in NAV_GROUPS" :key="group.label">
      <p class="lumen-nav-label">{{ group.label }}</p>
      <nav class="lumen-nav">
        <RouterLink
          v-for="item in group.items"
          :key="item.to"
          :to="item.to"
          class="lumen-nav-link"
          :class="{ 'is-active': isActive(item.to) }"
          @click="emit('navigate')"
        >
          <i :class="`bi ${item.icon}`" aria-hidden="true" />
          <span>
            <em>{{ item.label }}</em>
            <small>{{ item.description }}</small>
          </span>
        </RouterLink>
      </nav>
    </div>

    <div class="lumen-sidebar-foot">
      <div class="lumen-health-chip">
        <span class="lumen-pulse" />
        Desk live · {{ openCount }} open in sample
      </div>
      <p>Mock fixtures · last sync 2 min ago</p>
    </div>
  </aside>
</template>
