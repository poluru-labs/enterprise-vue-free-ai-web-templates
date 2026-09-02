<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  Avatar,
  Button,
  DropdownMenu,
  Kbd,
  List,
  MenuItem,
  Modal,
  Popover,
  Search,
  Select,
  showToast,
} from '@poluru-labs/enterprise-design-system-vue';
import {
  APP_NAME,
  BASE_PATH,
  SIGNED_IN_USER,
} from '../../constants/navigation.js';
import { useCommandPalette } from '../../composables/useCommandPalette.js';
import {
  markAllNotificationsRead,
  openIssueModal,
  searchWorkspace,
  selectSprint,
  sprintOptions,
  sprintProgress,
  unreadCount,
  workspace,
} from '../../stores/projects.js';
import { formatPoints } from '../../utils/format.js';

defineProps({
  onMenuToggle: { type: Function, default: null },
});

const router = useRouter();
const { open: paletteOpen } = useCommandPalette();
const notesOpen = ref(false);
const menuOpen = ref(false);
const mastQuery = ref('');

const paletteHits = computed(() => searchWorkspace(workspace.query));
const railPct = computed(() => `${sprintProgress.value.pct}%`);
const fraction = computed(() => formatPoints(sprintProgress.value.done, sprintProgress.value.committed));

const notificationItems = computed(() =>
  workspace.notifications.map((item) => ({
    id: item.id,
    label: item.read ? item.title : `● ${item.title}`,
    description: `${item.body} · ${item.time}`,
    icon: 'bell',
  })),
);

function runCommand(item) {
  paletteOpen.value = false;
  workspace.query = '';
  if (item.to) router.push(item.to);
}

function submitSearch() {
  const q = mastQuery.value.trim() || workspace.query.trim();
  if (q) {
    router.push({ path: `${BASE_PATH}/search`, query: { q } });
    return;
  }
  paletteOpen.value = true;
}

function onSprint(value) {
  selectSprint(value);
}

function onMenu(item) {
  menuOpen.value = false;
  if (item.value === 'settings') router.push(`${BASE_PATH}/settings`);
  if (item.value === 'palette') paletteOpen.value = true;
  if (item.value === 'signout') {
    showToast({
      title: 'Signed out',
      description: 'Arjun Poluru ended the Keel session.',
      variant: 'info',
    });
  }
}
</script>

<template>
  <header class="keel-header">
    <div class="keel-mast">
      <div class="keel-mast-start">
        <Button
          class="keel-menu-btn"
          variant="secondary"
          size="sm"
          icon="menu"
          icon-only
          accessible-label="Open navigation"
          @click="onMenuToggle"
        />
        <RouterLink class="keel-mast-brand" :to="`${BASE_PATH}/overview`">
          <span class="keel-mark keel-mark-inverse" aria-hidden="true">
            <svg viewBox="0 0 32 32" width="22" height="22">
              <path d="M5 20 16 7.5 27 20h-3.4L16 12.2 8.4 20H5Z" fill="currentColor" />
              <path d="M7 22.4h18c-1.5 2.2-4.7 3.6-9 3.6s-7.5-1.4-9-3.6Z" fill="currentColor" opacity="0.7" />
            </svg>
          </span>
          <strong>{{ APP_NAME }}</strong>
        </RouterLink>
      </div>

      <div class="keel-sprint-clock" data-testid="sprint-clock">
        <em>{{ sprintProgress.name }} · {{ sprintProgress.daysLeft }} days left</em>
        <strong>{{ fraction }} pts</strong>
      </div>

      <div class="keel-mast-end">
        <Select
          class="keel-sprint-select"
          :model-value="workspace.selectedSprintId"
          :options="sprintOptions"
          size="sm"
          placeholder="Sprint"
          aria-label="Sprint switcher"
          @update:model-value="onSprint"
        />
        <label class="keel-mast-search">
          <i class="bi bi-search" aria-hidden="true" />
          <input
            v-model="mastQuery"
            type="search"
            placeholder="Search issues…"
            aria-label="Search issues"
            @keydown.enter.prevent="submitSearch"
          />
        </label>
        <button type="button" class="keel-kbd-btn" aria-label="Open command palette" @click="paletteOpen = true">
          <Kbd :keys="['⌘', 'K']" />
        </button>
        <button type="button" class="keel-mast-cta" @click="openIssueModal()">New issue</button>
        <Popover v-model:open="notesOpen" heading="Alerts" placement="bottom">
          <template #trigger>
            <button type="button" class="keel-bell" aria-label="Notifications">
              <i class="bi bi-bell" aria-hidden="true" />
              <span v-if="unreadCount" class="keel-notif-badge">{{ unreadCount }}</span>
            </button>
          </template>
          <div class="keel-notify-head">
            <span>{{ unreadCount }} unread</span>
            <Button size="sm" variant="tertiary" :disabled="!unreadCount" @click="markAllNotificationsRead">
              Mark all read
            </Button>
          </div>
          <List :items="notificationItems" divided />
        </Popover>
        <DropdownMenu v-model:open="menuOpen" placement="bottom">
          <template #trigger>
            <button type="button" class="keel-avatar-btn" :title="`${SIGNED_IN_USER.name} · ${SIGNED_IN_USER.role}`">
              <Avatar :name="SIGNED_IN_USER.name" size="sm" />
            </button>
          </template>
          <MenuItem value="profile" :label="SIGNED_IN_USER.name" @select="onMenu" />
          <MenuItem value="settings" label="Preferences" @select="onMenu" />
          <MenuItem value="palette" label="Open command palette" @select="onMenu" />
          <MenuItem value="signout" label="Sign out" danger @select="onMenu" />
        </DropdownMenu>
      </div>
    </div>

    <div
      class="keel-rail"
      role="progressbar"
      :aria-valuenow="sprintProgress.done"
      :aria-valuemin="0"
      :aria-valuemax="sprintProgress.committed"
      :aria-label="`${sprintProgress.name} story points ${fraction}`"
      data-testid="sprint-rail"
    >
      <span class="keel-rail-fill" :style="{ width: railPct }" />
      <span class="keel-rail-keel" :style="{ left: railPct }" aria-hidden="true" />
    </div>

    <Modal v-model:open="paletteOpen" heading="Jump the delivery workspace">
      <Search v-model="workspace.query" placeholder="Issue key, person, or page" />
      <div v-if="paletteHits.length" class="keel-cmd-list">
        <button v-for="item in paletteHits" :key="item.id" type="button" @click="runCommand(item)">
          <strong>{{ item.label }}</strong>
          <span>{{ item.hint }}</span>
        </button>
      </div>
      <p v-else class="keel-note">No matches. Try KEEL-124, Maya, or Board.</p>
    </Modal>
  </header>
</template>
