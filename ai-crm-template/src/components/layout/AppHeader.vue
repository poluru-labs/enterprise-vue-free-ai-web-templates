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
  showToast,
} from '@poluru-labs/enterprise-design-system-vue';
import { APP_NAME, APP_TAGLINE, BASE_PATH, COMPANY, SIGNED_IN_USER } from '../../constants/navigation.js';
import { useCommandPalette } from '../../composables/useCommandPalette.js';
import {
  crm,
  markAllNotificationsRead,
  openDealModal,
  pipelinePills,
  searchWorkspace,
  unreadCount,
} from '../../stores/crm.js';

defineProps({
  onMenuToggle: { type: Function, default: null },
});

const router = useRouter();
const { open: paletteOpen } = useCommandPalette();
const notesOpen = ref(false);
const menuOpen = ref(false);
const stripQuery = ref('');
const quota = SIGNED_IN_USER.attained;
const radius = 16;
const circumference = 2 * Math.PI * radius;
const quotaOffset = circumference * (1 - Math.min(1, Math.max(0, quota / 100)));

const paletteHits = computed(() => searchWorkspace(crm.query));

const notificationItems = computed(() =>
  crm.notifications.map((item) => ({
    id: item.id,
    label: item.read ? item.title : `● ${item.title}`,
    description: `${item.body} · ${item.time}`,
    icon: 'bell',
  })),
);

function runCommand(item) {
  paletteOpen.value = false;
  crm.query = '';
  if (item.to) router.push(item.to);
}

function submitSearch() {
  const q = stripQuery.value.trim() || crm.query.trim();
  if (q) {
    router.push({ path: `${BASE_PATH}/search`, query: { q } });
    return;
  }
  paletteOpen.value = true;
}

function onMenu(item) {
  menuOpen.value = false;
  if (item.value === 'settings') router.push(`${BASE_PATH}/settings`);
  if (item.value === 'palette') paletteOpen.value = true;
  if (item.value === 'signout') {
    showToast({ title: 'Signed out', description: 'Priya Poluru ended the Bloom session.', variant: 'info' });
  }
}
</script>

<template>
  <header class="bloom-header">
    <div class="bloom-ribbon">
      <div class="bloom-ribbon-start">
        <Button
          class="bloom-menu-btn"
          variant="secondary"
          size="sm"
          icon="menu"
          icon-only
          accessible-label="Open navigation"
          @click="onMenuToggle"
        />
        <RouterLink class="bloom-ribbon-brand" :to="`${BASE_PATH}/overview`">
          <span class="bloom-mark bloom-mark-inverse" aria-hidden="true">B</span>
          <span>
            <strong>{{ APP_NAME }}</strong>
            <small>{{ APP_TAGLINE }}</small>
          </span>
        </RouterLink>
      </div>

      <nav class="bloom-stage-pills" aria-label="Pipeline stages">
        <RouterLink
          v-for="pill in pipelinePills"
          :key="pill.id"
          class="bloom-stage-pill"
          :to="`${BASE_PATH}/pipeline`"
        >
          <em>{{ pill.label }}</em>
          <strong>{{ pill.count }}</strong>
        </RouterLink>
      </nav>

      <div class="bloom-ribbon-end">
        <div class="bloom-quota" :title="`${quota}% of ${COMPANY.fiscal}`">
          <svg viewBox="0 0 40 40" class="bloom-quota-ring" aria-hidden="true">
            <circle cx="20" cy="20" r="16" class="bloom-quota-track" />
            <circle
              cx="20"
              cy="20"
              r="16"
              class="bloom-quota-progress"
              :stroke-dasharray="circumference"
              :stroke-dashoffset="quotaOffset"
            />
          </svg>
          <div>
            <em>Q3 quota</em>
            <strong>{{ quota }}%</strong>
          </div>
        </div>

        <button type="button" class="bloom-kbd-btn" @click="paletteOpen = true">
          <Kbd :keys="['⌘', 'K']" />
        </button>
        <button type="button" class="bloom-ribbon-cta" @click="openDealModal()">New deal</button>
        <Popover v-model:open="notesOpen" heading="Inbox" placement="bottom">
          <template #trigger>
            <button type="button" class="bloom-bell" aria-label="Notifications">
              <i class="bi bi-bell" aria-hidden="true" />
              <span v-if="unreadCount" class="bloom-notif-badge">{{ unreadCount }}</span>
            </button>
          </template>
          <div class="bloom-notify-head">
            <span>{{ unreadCount }} unread</span>
            <Button size="sm" variant="tertiary" :disabled="!unreadCount" @click="markAllNotificationsRead">
              Mark all read
            </Button>
          </div>
          <List :items="notificationItems" divided />
        </Popover>
        <DropdownMenu v-model:open="menuOpen" placement="bottom">
          <template #trigger>
            <button type="button" class="bloom-avatar-btn" :title="`${SIGNED_IN_USER.name} · ${SIGNED_IN_USER.role}`">
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

    <div class="bloom-strip">
      <label class="bloom-strip-search">
        <i class="bi bi-search" aria-hidden="true" />
        <input
          v-model="stripQuery"
          type="search"
          placeholder="Search deals, people, accounts…"
          aria-label="Search deals, people, and accounts"
          @focus="crm.query = stripQuery"
          @keydown.enter.prevent="submitSearch"
        />
      </label>
      <p class="bloom-strip-meta">
        {{ COMPANY.fiscal }} · {{ SIGNED_IN_USER.name }} · $936k of $1.20M · 14 closing this week
      </p>
    </div>

    <Modal v-model:open="paletteOpen" heading="Jump to anything">
      <Search v-model="crm.query" placeholder="Type a deal, person, or page" />
      <div v-if="paletteHits.length" class="bloom-cmd-list">
        <button v-for="item in paletteHits" :key="item.id" type="button" @click="runCommand(item)">
          <strong>{{ item.label }}</strong>
          <span>{{ item.hint }}</span>
        </button>
      </div>
      <p v-else class="bloom-note">No matches. Try Harbor, Nimbus, or a last name.</p>
    </Modal>
  </header>
</template>
