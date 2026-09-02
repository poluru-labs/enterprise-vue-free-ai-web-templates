<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { NAV_ITEMS } from '../../constants/nav.js';

const route = useRoute();

const items = computed(() =>
  NAV_ITEMS.map((item) => ({
    ...item,
    active: item.to === '/' ? route.path === '/' : route.path.startsWith(item.to),
  })),
);
</script>

<template>
  <aside class="quota-sidebar">
    <p class="quota-sidebar-label">Sales ops</p>
    <nav class="quota-sidenav" aria-label="Primary">
      <RouterLink
        v-for="item in items"
        :key="item.id"
        :to="item.to"
        class="quota-sidenav-link"
        :class="{ 'is-active': item.active }"
      >
        <i :class="`bi ${item.icon}`" aria-hidden="true"></i>
        <span>{{ item.label }}</span>
      </RouterLink>
    </nav>
  </aside>
</template>
