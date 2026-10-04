<script setup>
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { APP_NAME, APP_TAGLINE, NAV_GROUPS } from '../../constants/navigation.js';
import { useCompliance } from '../../stores/compliance.js';

defineProps({
  open: { type: Boolean, default: false },
});

const emit = defineEmits(['navigate']);
const route = useRoute();
const store = useCompliance();
const liveCount = computed(() => store.effectiveControls.length);

function isActive(to) {
  if (to.endsWith('/controls') || to.endsWith('/audits')) {
    return route.path === to || route.path.startsWith(`${to}/`);
  }
  return route.path === to;
}
</script>

<template>
  <aside class="aeg-sidebar" :class="{ 'is-open': open }" aria-label="Aegis">
    <div class="aeg-brand">
      <span class="aeg-mark aeg-mark-sidebar" aria-hidden="true">
        <i class="bi bi-shield-check"></i>
      </span>
      <div class="aeg-brand-copy">
        <strong>{{ APP_NAME }}</strong>
        <span>{{ APP_TAGLINE }}</span>
      </div>
    </div>

    <div v-for="group in NAV_GROUPS" :key="group.label">
      <p class="aeg-nav-label">{{ group.label }}</p>
      <nav class="aeg-nav">
        <RouterLink
          v-for="item in group.items"
          :key="item.to"
          :to="item.to"
          class="aeg-nav-link"
          :class="{ 'is-active': isActive(item.to) }"
          @click="emit('navigate')"
        >
          <i :class="`bi ${item.icon}`" aria-hidden="true" />
          <span>{{ item.label }}</span>
        </RouterLink>
      </nav>
    </div>

    <div class="aeg-sidebar-foot">
      <div class="aeg-health-chip">
        <span class="aeg-pulse" />
        {{ liveCount }} controls effective
      </div>
      <p>Mock fixtures · last sync 4 min ago</p>
    </div>
  </aside>
</template>
