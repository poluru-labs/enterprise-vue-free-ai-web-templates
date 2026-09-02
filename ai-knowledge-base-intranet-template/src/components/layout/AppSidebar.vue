<script setup>
import { useRoute } from 'vue-router';
import { Avatar } from '@poluru-labs/enterprise-design-system-vue';
import { NAV_ITEMS, PRODUCT_TAGLINE, currentUser } from '../../constants/navigation.js';

const route = useRoute();

defineProps({
  open: { type: Boolean, default: false },
});

function isActive(item) {
  if (item.name === 'spaces') {
    return route.path.includes('/spaces');
  }
  if (item.name === 'articles') {
    return route.path.includes('/articles');
  }
  return route.path === item.to;
}
</script>

<template>
  <aside class="atlas-sidebar" :class="{ 'is-open': open }">
    <p class="atlas-sidebar-kicker">{{ PRODUCT_TAGLINE }}</p>
    <nav class="atlas-side-nav" aria-label="Primary">
      <router-link
        v-for="item in NAV_ITEMS"
        :key="item.name"
        :to="item.to"
        class="atlas-side-link"
        :class="{ 'is-active': isActive(item) }"
      >
        <i :class="`bi ${item.icon}`" aria-hidden="true"></i>
        {{ item.label }}
      </router-link>
    </nav>
    <div class="atlas-sidebar-user">
      <Avatar :name="currentUser.name" size="md" />
      <div class="atlas-sidebar-user-meta">
        <strong>{{ currentUser.name }}</strong>
        <span>{{ currentUser.role }}</span>
      </div>
    </div>
  </aside>
</template>
