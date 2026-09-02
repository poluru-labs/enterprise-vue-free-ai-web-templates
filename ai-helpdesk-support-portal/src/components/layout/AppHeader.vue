<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  Avatar,
  Button,
  Drawer,
  DropdownMenu,
  Kbd,
  MenuItem,
  Modal,
  showToast,
  setEdsTheme,
} from '@poluru-labs/enterprise-design-system-vue';
import {
  APP_NAME,
  APP_TAGLINE,
  BASE_PATH,
  COMMAND_ITEMS,
  SIGNED_IN_USER,
} from '../../constants/navigation.js';
import notifications from '../../data/notifications.json';
import { useCommandPalette } from '../../composables/useCommandPalette.js';
import { useHelpdesk } from '../../stores/helpdesk.js';
import { formatDateTime } from '../../utils/format.js';
import { searchRecords } from '../../utils/search.js';

const emit = defineEmits(['menu-toggle']);
const router = useRouter();
const store = useHelpdesk();
const { open: paletteOpen, setOpen: setPaletteOpen } = useCommandPalette();

const query = ref('');
const paletteQuery = ref('');
const notifyOpen = ref(false);
const menuOpen = ref(false);
const isDark = ref(false);

const counts = computed(() => store.headerCounts.value);
const paletteHits = computed(() =>
  searchRecords(COMMAND_ITEMS, paletteQuery.value, ['label', 'hint', 'group']),
);

function applyTheme(dark) {
  isDark.value = dark;
  if (typeof setEdsTheme === 'function') {
    setEdsTheme(dark ? 'dark' : 'light');
  }
  document.documentElement.classList.toggle('lumen-dark', dark);
}

function toggleTheme() {
  applyTheme(!isDark.value);
}

function goSearch() {
  const next = query.value.trim();
  router.push(next ? `${BASE_PATH}/search?q=${encodeURIComponent(next)}` : `${BASE_PATH}/search`);
}

function goInbox(filter) {
  if (filter.sla) {
    router.push(`${BASE_PATH}/inbox?sla=${filter.sla}`);
    return;
  }
  router.push(`${BASE_PATH}/inbox?status=${filter.status}`);
}

function assignNext() {
  const ticket = store.assignNext();
  if (!ticket) {
    showToast({
      title: 'Queue is clear',
      description: 'No unassigned tickets are waiting.',
      variant: 'info',
    });
    return;
  }
  showToast({
    title: 'Assigned to Meera Poluru',
    description: `${ticket.id} · ${ticket.subject}`,
    variant: 'success',
  });
  router.push(`${BASE_PATH}/tickets/${ticket.id}`);
}

function goCommand(item) {
  setPaletteOpen(false);
  paletteQuery.value = '';
  if (item.id === 'assign-next') {
    assignNext();
    return;
  }
  router.push(item.to);
}

function onMenuSelect(item) {
  menuOpen.value = false;
  if (item.value === 'settings') router.push(`${BASE_PATH}/settings`);
  if (item.value === 'palette') setPaletteOpen(true);
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
  <header class="lumen-header">
    <div class="lumen-header-inner">
      <div class="lumen-header-start">
        <Button
          class="lumen-menu-btn"
          variant="tertiary"
          size="sm"
          icon="menu"
          icon-only
          accessible-label="Open navigation"
          @click="emit('menu-toggle')"
        />
        <div class="lumen-header-brand">
          <span class="lumen-header-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M11 2h2l1.2 4H9.8L11 2zm-3.2 6h8.4l.8 2.4H7l.8-2.4zM8 12h8v2H8v-2zm-1 4h10l1.5 6h-2.1l-.4-1.6H8l-.4 1.6H5.5L7 16zm2.4 2.4h5.2l-.4 1.6H9.8l-.4-1.6z" />
            </svg>
          </span>
          <div>
            <strong>{{ APP_NAME }}</strong>
            <span>{{ APP_TAGLINE }}</span>
          </div>
        </div>
      </div>

      <div class="lumen-header-center">
        <div class="lumen-count-stack">
          <div class="lumen-count-row" role="group" aria-label="Ticket counts">
            <button type="button" class="lumen-count-badge" @click="goInbox({ status: 'open' })">
              <span>Open</span>
              <strong>{{ counts.open }}</strong>
            </button>
            <button type="button" class="lumen-count-badge" @click="goInbox({ status: 'waiting' })">
              <span>Waiting</span>
              <strong>{{ counts.waiting }}</strong>
            </button>
            <button type="button" class="lumen-count-badge is-breach" @click="goInbox({ sla: 'breached' })">
              <span>Breached</span>
              <strong>{{ counts.breached }}</strong>
            </button>
          </div>
          <p class="lumen-count-meta">first response {{ counts.firstResponse }}</p>
        </div>
        <label class="lumen-compact-search">
          <i class="bi bi-search" aria-hidden="true" />
          <input
            v-model="query"
            type="search"
            placeholder="Search tickets"
            aria-label="Search tickets"
            @keydown.enter.prevent="goSearch"
          />
        </label>
      </div>

      <div class="lumen-header-end">
        <Button size="sm" variant="secondary" icon="user" @click="assignNext">Assign next</Button>
        <Button variant="tertiary" size="sm" accessible-label="Open command palette" @click="setPaletteOpen(true)">
          <Kbd>⌘K</Kbd>
        </Button>
        <div class="lumen-notify-wrap">
          <Button
            variant="tertiary"
            size="sm"
            icon="bell"
            icon-only
            accessible-label="Notifications"
            @click="notifyOpen = true"
          />
          <span v-if="notifications.unread" class="lumen-notify-count" aria-hidden="true">
            {{ notifications.unread }}
          </span>
        </div>
        <Button
          variant="tertiary"
          size="sm"
          :accessible-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
          @click="toggleTheme"
        >
          <i :class="`bi ${isDark ? 'bi-sun' : 'bi-moon'}`" aria-hidden="true" />
        </Button>
        <DropdownMenu v-model:open="menuOpen">
          <template #trigger>
            <button
              type="button"
              class="lumen-profile"
              :title="`${SIGNED_IN_USER.name} · ${SIGNED_IN_USER.role}`"
            >
              <Avatar :name="SIGNED_IN_USER.name" size="sm" />
              <div class="lumen-profile-copy">
                <strong>{{ SIGNED_IN_USER.name }}</strong>
                <span>{{ SIGNED_IN_USER.role }}</span>
              </div>
            </button>
          </template>
          <MenuItem label="Desk settings" value="settings" @select="onMenuSelect" />
          <MenuItem label="Open command palette" value="palette" @select="onMenuSelect" />
          <MenuItem label="Sign out" value="signout" danger @select="onMenuSelect" />
        </DropdownMenu>
      </div>
    </div>
  </header>

  <Drawer v-model:open="notifyOpen" :heading="`${notifications.unread} unread alerts`" size="md">
    <p class="lumen-subtle">Meera Poluru · last sync 2 min ago</p>
    <ul class="lumen-notify-list">
      <li v-for="item in notifications.items" :key="item.id">
        <button
          type="button"
          class="lumen-notify-item"
          :class="`tone-${item.tone}`"
          @click="notifyOpen = false; router.push(item.href)"
        >
          <strong>{{ item.title }}</strong>
          <p>{{ item.body }}</p>
          <span>{{ formatDateTime(item.time) }}</span>
        </button>
      </li>
    </ul>
  </Drawer>

  <Modal
    :open="paletteOpen"
    heading="Jump to anything"
    @update:open="setPaletteOpen"
  >
    <label class="lumen-palette-search">
      Search pages and actions
      <input
        v-model="paletteQuery"
        placeholder="Inbox, assign next, macros…"
      />
    </label>
    <ul class="lumen-palette-list">
      <li v-for="item in paletteHits" :key="item.id">
        <button type="button" @click="goCommand(item)">
          <strong>{{ item.label }}</strong>
          <span>{{ item.hint }}</span>
        </button>
      </li>
    </ul>
  </Modal>
</template>
