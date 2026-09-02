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
  PATH_CRUMBS,
  PRODUCT_NAME,
  STORAGE_USED,
  currentUser,
} from '../../constants/navigation.js';
import { useCommandPalette } from '../../composables/useCommandPalette.js';
import { useDocuments } from '../../stores/documents.js';
import { searchGroups } from '../../utils/search.js';

const router = useRouter();
const route = useRoute();
const { state, unreadCount, setPathFilter, openUpload, markNotificationsRead } = useDocuments();
const { open: paletteOpen, setOpen: setPaletteOpen, toggle: togglePalette } = useCommandPalette();
const themeCtx = useTheme();
const theme = themeCtx?.theme;
const toggleTheme = themeCtx?.toggleTheme;

const headerQuery = ref('');
const notifyOpen = ref(false);
const commandQuery = ref('');
let themeFallback = 'light';

const commandGroups = computed(() => {
  const groups = COMMAND_ITEMS.reduce((acc, item) => {
    const group = acc.find((entry) => entry.group === item.group);
    if (group) group.items.push(item);
    else acc.push({ group: item.group, items: [item] });
    return acc;
  }, []);
  return searchGroups(groups, commandQuery.value);
});

const activeCrumbId = computed(() => {
  if (state.collectionFilter === 'Contracts') return 'contracts';
  if (state.folderFilter === 'Legal') return 'legal';
  return 'workspace';
});

function onCrumb(crumb) {
  setPathFilter(crumb);
  router.push({ path: `${BASE_PATH}/library` });
}

function submitHeaderSearch() {
  const q = headerQuery.value.trim();
  router.push({ path: `${BASE_PATH}/search`, query: q ? { q } : {} });
}

function onCommand(item) {
  setPaletteOpen(false);
  commandQuery.value = '';
  if (item.action === 'upload') {
    openUpload();
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
  <header class="vault-header">
    <div class="vault-header-bar">
      <div class="vault-header-left">
        <button class="vault-menu-btn d-lg-none" type="button" aria-label="Open navigation" @click="$emit('toggle-sidebar')">
          <i class="bi bi-list" aria-hidden="true"></i>
        </button>
        <router-link class="vault-brand" :to="`${BASE_PATH}/overview`">
          <span class="vault-folder-mark" aria-hidden="true">
            <i class="bi bi-folder2-fill"></i>
          </span>
          <span class="vault-brand-copy">
            <strong>{{ PRODUCT_NAME }}</strong>
            <small>Knowledge ops</small>
          </span>
        </router-link>
      </div>

      <nav class="vault-path" aria-label="Workspace path">
        <template v-for="(crumb, index) in PATH_CRUMBS" :key="crumb.id">
          <span v-if="index" class="vault-path-sep" aria-hidden="true">/</span>
          <button
            type="button"
            class="vault-path-crumb"
            :class="{ 'is-active': activeCrumbId === crumb.id || (crumb.id === 'legal' && activeCrumbId === 'contracts') }"
            @click="onCrumb(crumb)"
          >
            {{ crumb.label }}
          </button>
        </template>
      </nav>

      <div class="vault-header-right">
        <div class="vault-storage-chip" title="Storage used">
          <span class="vault-storage-label">Storage</span>
          <span class="vault-storage-track" aria-hidden="true">
            <span class="vault-storage-fill" :style="{ width: `${STORAGE_USED}%` }"></span>
          </span>
          <strong>{{ STORAGE_USED }}%</strong>
        </div>

        <form class="vault-header-search" @submit.prevent="submitHeaderSearch">
          <Search v-model="headerQuery" placeholder="Find docs, owners, citations…" />
        </form>

        <Button class-name="vault-btn-accent" icon="upload" @click="openUpload">Upload</Button>
        <Button variant="secondary" class-name="vault-cmdk" @click="togglePalette">⌘K</Button>

        <button class="vault-icon-btn" type="button" aria-label="Notifications" @click="openNotify">
          <i class="bi bi-bell" aria-hidden="true"></i>
          <span v-if="unreadCount" class="vault-notify-dot">{{ unreadCount }}</span>
        </button>

        <button class="vault-icon-btn" type="button" :aria-label="`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`" @click="onThemeToggle">
          <i :class="theme === 'dark' ? 'bi bi-sun' : 'bi bi-moon'" aria-hidden="true"></i>
        </button>

        <DropdownMenu placement="bottom">
          <template #trigger>
            <button class="vault-avatar-btn" type="button" :aria-label="currentUser.name">
              <Avatar :name="currentUser.name" size="sm" />
            </button>
          </template>
          <MenuItem :label="currentUser.name" />
          <MenuItem :label="currentUser.role" />
          <MenuItem label="Settings" @select="router.push(`${BASE_PATH}/settings`)" />
        </DropdownMenu>
      </div>
    </div>
  </header>

  <Modal :open="paletteOpen" heading="Jump to" @update:open="setPaletteOpen">
    <Search v-model="commandQuery" placeholder="Pages, upload, reviews…" class-name="mb-3" />
    <div v-for="group in commandGroups" :key="group.group" class="vault-cmd-group">
      <p class="vault-cmd-label">{{ group.group }}</p>
      <button
        v-for="item in group.items"
        :key="item.label"
        type="button"
        class="vault-cmd-item"
        @click="onCommand(item)"
      >
        <strong>{{ item.label }}</strong>
        <span>{{ item.hint }}</span>
      </button>
    </div>
  </Modal>

  <Modal :open="notifyOpen" heading="Notifications" @update:open="(v) => (notifyOpen = v)">
    <ul class="vault-notify-list">
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
