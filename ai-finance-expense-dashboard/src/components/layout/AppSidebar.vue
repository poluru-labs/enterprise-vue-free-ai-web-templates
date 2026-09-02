<script setup>
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { APP_NAME, APP_TAGLINE, BASE_PATH, NAV_GROUPS, SIGNED_IN_USER } from '../../constants/navigation.js';
import { useFinanceStore } from '../../stores/finance.js';

const route = useRoute();
const store = useFinanceStore();

const closePercent = computed(() => store.close.percent);

function isActive(to) {
  return route.path === to || route.path.startsWith(`${to}/`);
}
</script>

<template>
  <aside class="mint-sidebar" :class="{ 'is-open': store.sidebarOpen }">
    <RouterLink class="mint-sidebar-brand" :to="`${BASE_PATH}/overview`" @click="store.setSidebarOpen(false)">
      <span class="mint-mark" aria-hidden="true">
        <svg viewBox="0 0 32 32" width="28" height="28">
          <rect width="32" height="32" rx="9" fill="#10B981" />
          <path d="M10 22c4-9 8-12 12-14-1 5-2 10-4 14-3 1-6 1-8 0z" fill="#ECFDF5" />
          <path d="M9 11h14M9 16h10M9 21h7" stroke="#047857" stroke-width="1.6" stroke-linecap="round" opacity="0.55" />
        </svg>
      </span>
      <span>
        <strong>{{ APP_NAME }}</strong>
        <small>{{ APP_TAGLINE }}</small>
      </span>
    </RouterLink>

    <nav class="mint-sidenav" aria-label="Finance">
      <section v-for="group in NAV_GROUPS" :key="group.label" class="mint-sidenav-group">
        <p class="mint-sidenav-label">{{ group.label }}</p>
        <RouterLink
          v-for="item in group.items"
          :key="item.to"
          class="mint-sidenav-link"
          :class="{ active: isActive(item.to) }"
          :to="item.to"
          @click="store.setSidebarOpen(false)"
        >
          <i :class="['bi', item.icon]" aria-hidden="true" />
          <span>
            <strong>{{ item.label }}</strong>
            <small>{{ item.description }}</small>
          </span>
        </RouterLink>
      </section>
    </nav>

    <div class="mint-sidebar-foot">
      <div class="mint-close-chip">
        <span>{{ store.close.label }}</span>
        <strong>{{ closePercent }}%</strong>
      </div>
      <p class="mint-sidebar-user">{{ SIGNED_IN_USER.name }} · {{ SIGNED_IN_USER.role }}</p>
    </div>
  </aside>
</template>
