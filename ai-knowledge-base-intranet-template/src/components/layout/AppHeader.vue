<script setup>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
  Avatar,
  Button,
  DropdownMenu,
  MenuItem,
  Modal,
  Search,
  setEdsTheme,
  useTheme,
} from '@poluru-labs/enterprise-design-system-vue';
import {
  BASE_PATH,
  COMMAND_ITEMS,
  PRODUCT_NAME,
  PRODUCT_TAGLINE,
  SPACE_TABS,
  currentUser,
} from '../../constants/navigation.js';
import { useCommandPalette } from '../../composables/useCommandPalette.js';
import { useIntranet } from '../../stores/intranet.js';
import { searchGroups } from '../../utils/search.js';

const router = useRouter();
const route = useRoute();
const { state, unreadCount, setSpaceFilter, openPublish, markNotificationsRead } = useIntranet();
const { open: paletteOpen, setOpen: setPaletteOpen, toggle: togglePalette } = useCommandPalette();
const themeCtx = useTheme();
const theme = themeCtx?.theme;
const toggleTheme = themeCtx?.toggleTheme;

const headerQuery = ref('');
const notifyOpen = ref(false);
const commandQuery = ref('');
let themeFallback = 'light';

defineEmits(['toggle-sidebar']);

const commandGroups = computed(() => {
  const groups = COMMAND_ITEMS.reduce((acc, item) => {
    const group = acc.find((entry) => entry.group === item.group);
    if (group) group.items.push(item);
    else acc.push({ group: item.group, items: [item] });
    return acc;
  }, []);
  return searchGroups(groups, commandQuery.value);
});

const activeSpaceId = computed(() => {
  if (route.name === 'space') return String(route.params.id || '');
  return state.spaceFilter || '';
});

function onSpaceTab(tab) {
  setSpaceFilter(tab.id);
  router.push({ path: `${BASE_PATH}/spaces/${tab.id}` });
}

function submitHeaderSearch() {
  const q = headerQuery.value.trim();
  router.push({ path: `${BASE_PATH}/search`, query: q ? { q } : {} });
}

function onCommand(item) {
  setPaletteOpen(false);
  commandQuery.value = '';
  if (item.action === 'publish') {
    openPublish();
    return;
  }
  if (item.to) router.push(item.to);
}

function onThemeToggle() {
  try {
    toggleTheme();
  } catch {
    themeFallback = themeFallback === 'light' ? 'dark' : 'light';
    setEdsTheme(themeFallback);
  }
}

function openNotify() {
  notifyOpen.value = true;
}

function markRead() {
  markNotificationsRead();
  notifyOpen.value = false;
}
</script>

<template>
  <header class="atlas-header">
    <div class="atlas-header-top">
      <div class="atlas-header-left">
        <button class="atlas-menu-btn d-lg-none" type="button" aria-label="Open navigation" @click="$emit('toggle-sidebar')">
          <i class="bi bi-list" aria-hidden="true"></i>
        </button>
        <router-link class="atlas-brand" :to="`${BASE_PATH}/overview`">
          <span class="atlas-globe-mark" aria-hidden="true">
            <i class="bi bi-globe2"></i>
          </span>
          <span class="atlas-brand-copy">
            <strong>{{ PRODUCT_NAME }}</strong>
            <small>{{ PRODUCT_TAGLINE }}</small>
          </span>
        </router-link>
      </div>

      <div class="atlas-header-right">
        <form class="atlas-header-search" @submit.prevent="submitHeaderSearch">
          <Search v-model="headerQuery" placeholder="Search spaces, policies, how-tos…" />
        </form>

        <Button class-name="atlas-btn-accent" icon="plus" @click="openPublish">Publish article</Button>
        <Button variant="secondary" class-name="atlas-cmdk" @click="togglePalette">⌘K</Button>

        <button class="atlas-icon-btn" type="button" aria-label="Notifications" @click="openNotify">
          <i class="bi bi-bell" aria-hidden="true"></i>
          <span v-if="unreadCount" class="atlas-notify-dot">{{ unreadCount }}</span>
        </button>

        <button class="atlas-icon-btn" type="button" :aria-label="`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`" @click="onThemeToggle">
          <i :class="theme === 'dark' ? 'bi bi-sun' : 'bi bi-moon'" aria-hidden="true"></i>
        </button>

        <DropdownMenu placement="bottom">
          <template #trigger>
            <button class="atlas-avatar-btn" type="button" :aria-label="currentUser.name">
              <Avatar :name="currentUser.name" size="sm" />
            </button>
          </template>
          <MenuItem :label="currentUser.name" />
          <MenuItem :label="currentUser.role" />
          <MenuItem label="Settings" @select="router.push(`${BASE_PATH}/settings`)" />
        </DropdownMenu>
      </div>
    </div>

    <nav class="atlas-space-switcher" aria-label="Team spaces">
      <p class="atlas-space-switcher-kicker">Spaces</p>
      <div class="atlas-space-tabs" role="tablist">
        <button
          v-for="tab in SPACE_TABS"
          :key="tab.id"
          type="button"
          role="tab"
          class="atlas-space-tab"
          :class="{ 'is-active': activeSpaceId === tab.id }"
          :aria-selected="activeSpaceId === tab.id"
          @click="onSpaceTab(tab)"
        >
          <i :class="`bi ${tab.icon}`" aria-hidden="true"></i>
          {{ tab.label }}
        </button>
      </div>
      <router-link class="atlas-space-more" :to="`${BASE_PATH}/spaces`">All six spaces</router-link>
    </nav>
  </header>

  <Modal :open="paletteOpen" heading="Jump across Atlas" @update:open="setPaletteOpen">
    <Search v-model="commandQuery" placeholder="Spaces, articles, publish…" class-name="mb-3" />
    <div v-for="group in commandGroups" :key="group.group" class="atlas-cmd-group">
      <p class="atlas-cmd-label">{{ group.group }}</p>
      <button
        v-for="item in group.items"
        :key="item.label"
        type="button"
        class="atlas-cmd-item"
        @click="onCommand(item)"
      >
        <strong>{{ item.label }}</strong>
        <span>{{ item.hint }}</span>
      </button>
    </div>
  </Modal>

  <Modal :open="notifyOpen" heading="Notifications" @update:open="(v) => (notifyOpen = v)">
    <ul class="atlas-notify-list">
      <li v-for="item in state.notifications" :key="item.id" :class="{ 'is-unread': item.unread }">
        <strong>{{ item.title }}</strong>
        <span>{{ item.body }}</span>
        <small>{{ item.time }}</small>
      </li>
    </ul>
    <template #footer>
      <Button variant="secondary" @click="markRead">Mark all read</Button>
    </template>
  </Modal>
</template>
