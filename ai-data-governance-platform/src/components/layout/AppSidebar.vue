<script setup>
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Avatar, DropdownMenu, MenuItem, SideNav, showToast } from '@poluru-labs/enterprise-design-system-vue';
import { BASE_PATH, NAV_ITEMS, SIGNED_IN_USER } from '../../constants/navigation.js';
import { useGovernance } from '../../stores/governance.js';

defineProps({
  open: { type: Boolean, default: false },
});

const emit = defineEmits(['navigate']);
const route = useRoute();
const router = useRouter();
const store = useGovernance();
const menuOpen = ref(false);

const items = computed(() =>
  NAV_ITEMS.map((item) => ({
    id: item.id,
    label: item.label,
    href: item.to,
    icon: item.icon,
    active: item.id === 'catalog' ? route.path.startsWith(`${BASE_PATH}/catalog`) : route.path === item.to,
  })),
);

watch(
  () => route.query.new,
  (value) => {
    if (value === '1') store.setAssetOpen(true);
  },
  { immediate: true },
);

function onNavClick(event) {
  const link = event.target.closest('a');
  if (!link) return;
  const href = link.getAttribute('href');
  if (!href || href.startsWith('http')) return;
  event.preventDefault();
  emit('navigate');
  router.push(href);
}

function onMenuSelect(item) {
  menuOpen.value = false;
  if (item.value === 'settings') {
    emit('navigate');
    router.push(`${BASE_PATH}/settings`);
  }
  if (item.value === 'signout') {
    showToast({
      title: 'Signed out',
      description: `${SIGNED_IN_USER.name} ended the session.`,
      variant: 'info',
    });
  }
}
</script>

<template>
  <aside class="cbt-sidebar" :class="{ 'is-open': open }" aria-label="Cobalt" @click.capture="onNavClick">
    <div class="cbt-sidebar-nav">
      <SideNav :items="items" />
    </div>
    <div class="cbt-sidebar-foot">
      <DropdownMenu v-model:open="menuOpen">
        <template #trigger>
          <button type="button" class="cbt-profile">
            <Avatar :name="SIGNED_IN_USER.name" size="sm" />
            <span class="cbt-profile-copy">
              <strong>{{ SIGNED_IN_USER.name }}</strong>
              <span>{{ SIGNED_IN_USER.role }}</span>
            </span>
          </button>
        </template>
        <MenuItem label="Workspace settings" value="settings" @select="onMenuSelect" />
        <MenuItem label="Sign out" value="signout" danger @select="onMenuSelect" />
      </DropdownMenu>
    </div>
  </aside>
</template>
