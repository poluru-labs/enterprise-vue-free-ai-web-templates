<script setup>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Avatar, DropdownMenu, MenuItem, SideNav, showToast } from '@poluru-labs/enterprise-design-system-vue';
import { BASE_PATH, NAV_ITEMS, SIGNED_IN_USER } from '../../constants/navigation.js';

defineProps({
  open: { type: Boolean, default: false },
});

const emit = defineEmits(['navigate']);
const route = useRoute();
const router = useRouter();
const menuOpen = ref(false);

const items = computed(() =>
  NAV_ITEMS.map((item) => ({
    id: item.id,
    label: item.label,
    href: item.to,
    icon: item.icon,
    active: item.id === 'services' ? route.path.startsWith(`${BASE_PATH}/services`) : route.path === item.to,
  })),
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
  <aside class="hrt-sidebar" :class="{ 'is-open': open }" aria-label="Hearth" @click.capture="onNavClick">
    <div class="hrt-sidebar-nav">
      <SideNav :items="items" />
    </div>
    <div class="hrt-sidebar-foot">
      <DropdownMenu v-model:open="menuOpen">
        <template #trigger>
          <button type="button" class="hrt-profile">
            <Avatar :name="SIGNED_IN_USER.name" size="sm" />
            <span class="hrt-profile-copy">
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
