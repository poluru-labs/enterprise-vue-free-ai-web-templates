<script setup>
import { useRoute } from 'vue-router';
import { Avatar, Meter } from '@poluru-labs/enterprise-design-system-vue';
import { NAV_ITEMS, STORAGE_USED, currentUser } from '../../constants/navigation.js';

const route = useRoute();

defineProps({
  open: { type: Boolean, default: false },
});

function isActive(item) {
  if (item.name === 'library') {
    return route.path.startsWith(item.to);
  }
  return route.path === item.to;
}
</script>

<template>
  <aside class="vault-sidebar" :class="{ 'is-open': open }">
    <nav class="vault-side-nav" aria-label="Primary">
      <router-link
        v-for="item in NAV_ITEMS"
        :key="item.name"
        :to="item.to"
        class="vault-side-link"
        :class="{ 'is-active': isActive(item) }"
      >
        <i :class="`bi ${item.icon}`" aria-hidden="true"></i>
        {{ item.label }}
      </router-link>
    </nav>
    <div class="vault-sidebar-storage">
      <Meter :value="STORAGE_USED" :max="100" label="Storage used" show-value />
    </div>
    <div class="vault-sidebar-user">
      <Avatar :name="currentUser.name" size="md" />
      <div class="vault-sidebar-user-meta">
        <strong>{{ currentUser.name }}</strong>
        <span>{{ currentUser.role }}</span>
      </div>
    </div>
  </aside>
</template>
