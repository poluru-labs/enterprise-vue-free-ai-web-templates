<script setup>
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { APP_NAME, APP_TAGLINE, NAV_GROUPS } from '../../constants/navigation.js';
import { useHr } from '../../stores/hr.js';

defineProps({
  open: { type: Boolean, default: false },
});

const emit = defineEmits(['navigate']);
const route = useRoute();
const store = useHr();
const liveCount = computed(() => store.people.filter((item) => item.status === 'active').length);

function isActive(to) {
  if (to.endsWith('/people')) {
    return route.path === to || route.path.startsWith(`${to}/`);
  }
  return route.path === to;
}
</script>

<template>
  <aside class="grove-sidebar" :class="{ 'is-open': open }" aria-label="Grove">
    <div class="grove-brand">
      <span class="grove-mark grove-mark-sidebar" aria-hidden="true">
        <i class="bi bi-leaf"></i>
      </span>
      <div class="grove-brand-copy">
        <strong>{{ APP_NAME }}</strong>
        <span>{{ APP_TAGLINE }}</span>
      </div>
    </div>

    <div v-for="group in NAV_GROUPS" :key="group.label">
      <p class="grove-nav-label">{{ group.label }}</p>
      <nav class="grove-nav">
        <RouterLink
          v-for="item in group.items"
          :key="item.to"
          :to="item.to"
          class="grove-nav-link"
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

    <div class="grove-sidebar-foot">
      <div class="grove-health-chip">
        <span class="grove-pulse" />
        Grove · {{ liveCount }} active today
      </div>
      <p>Mock fixtures · last sync 4 min ago</p>
    </div>
  </aside>
</template>
