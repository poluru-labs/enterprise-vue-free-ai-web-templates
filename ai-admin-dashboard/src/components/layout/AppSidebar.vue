<script setup>
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { APP_NAME, APP_TAGLINE, NAV_GROUPS } from '../../constants/navigation.js';
import { useWorkspace } from '../../stores/workspace.js';

defineProps({
  open: { type: Boolean, default: false },
});

const emit = defineEmits(['navigate']);
const route = useRoute();
const store = useWorkspace();
const liveCount = computed(() => store.tenants.filter((item) => item.status === 'active').length);

function isActive(to) {
  if (to.endsWith('/tenants')) {
    return route.path === to || route.path.startsWith(`${to}/`);
  }
  return route.path === to;
}
</script>

<template>
  <aside class="hbr-sidebar" :class="{ 'is-open': open }" aria-label="Harbor">
    <div class="hbr-brand">
      <span class="hbr-mark" aria-hidden="true">
        <i class="bi bi-water"></i>
      </span>
      <div class="hbr-brand-copy">
        <strong>{{ APP_NAME }}</strong>
        <span>{{ APP_TAGLINE }}</span>
      </div>
    </div>

    <div v-for="group in NAV_GROUPS" :key="group.label">
      <p class="hbr-nav-label">{{ group.label }}</p>
      <nav class="hbr-nav">
        <RouterLink
          v-for="item in group.items"
          :key="item.to"
          :to="item.to"
          class="hbr-nav-link"
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

    <div class="hbr-sidebar-foot">
      <div class="hbr-health-chip">
        <span class="hbr-pulse" />
        Plane · {{ liveCount }} tenants live
      </div>
      <p>Mock fixtures · last sync 3 min ago</p>
    </div>
  </aside>
</template>
