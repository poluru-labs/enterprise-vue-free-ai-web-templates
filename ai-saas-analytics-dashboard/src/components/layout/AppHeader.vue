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
  Popover,
  Search,
  SegmentedControl,
  showToast,
  Tooltip,
} from '@poluru-labs/enterprise-design-system-vue';
import MiniSparkline from '../charts/MiniSparkline.vue';
import { PRODUCT_NAME } from '../../constants/product.js';
import { usePulseStore } from '../../stores/pulse.js';
import { useTheme } from '../../composables/useTheme.js';
import { useDateRange } from '../../composables/useDateRange.js';
import { useRequests } from '../../composables/useRequests.js';

const router = useRouter();
const { state, unreadCount, markAllRead } = usePulseStore();
const { isDark, toggleTheme } = useTheme();
const { range, segments } = useDateRange();
const { exportRequestsCsv } = useRequests();

const profileOpen = ref(false);
const notifOpen = ref(false);

const query = computed({
  get: () => state.query,
  set: (value) => {
    state.query = value;
  },
});

const notificationItems = computed(() =>
  state.notifications.map((item) => ({
    id: item.id,
    label: item.read ? item.title : `● ${item.title}`,
    description: `${item.body} · ${item.time}`,
    icon: 'bell',
  })),
);

function goSearch() {
  router.push('/search');
}

function onMenu(item) {
  profileOpen.value = false;
  if (item.value === 'settings') {
    router.push('/settings');
  }
  if (item.value === 'signout') {
    showToast({ title: 'Signed out', description: `${state.currentUser.name} ended the session.`, variant: 'info' });
  }
}
</script>

<template>
  <header class="pulse-header">
    <RouterLink class="pulse-brand" to="/">
      <span class="pulse-brand-mark" aria-hidden="true">
        <svg viewBox="0 0 32 32" width="28" height="28">
          <rect width="32" height="32" rx="9" fill="currentColor" opacity="0.16" />
          <path
            d="M4 17h5l2.2-6 3.4 12 3-8.5 2 4.5H28"
            fill="none"
            stroke="currentColor"
            stroke-width="2.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
      <span class="pulse-brand-text">
        <strong>{{ PRODUCT_NAME }}</strong>
        <small>Product analytics</small>
      </span>
    </RouterLink>

    <div class="pulse-header-sparks" aria-label="Live product signals">
      <MiniSparkline
        v-for="spark in state.headerSparklines"
        :key="spark.id"
        :label="spark.label"
        :value="spark.value"
        :points="spark.points"
      />
    </div>

    <div class="pulse-header-end">
      <SegmentedControl class-name="pulse-range" v-model="range" :segments="segments" />
      <div class="pulse-header-search">
        <Search v-model="query" placeholder="Search metrics, cohorts…" @submit="goSearch" />
      </div>
      <Tooltip content="Command palette · ⌘K">
        <button type="button" class="pulse-icon-btn" aria-label="Command palette" @click="state.commandOpen = true">
          <Kbd :keys="['⌘', 'K']" />
        </button>
      </Tooltip>
      <Button icon="download" variant="secondary" @click="exportRequestsCsv">Export</Button>
      <Tooltip :content="isDark ? 'Switch to light mode' : 'Switch to dark mode'">
        <button
          type="button"
          class="pulse-icon-btn pulse-theme-btn"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          @click="toggleTheme"
        >
          <i :class="isDark ? 'bi bi-sun' : 'bi bi-moon-stars'"></i>
        </button>
      </Tooltip>
      <Popover v-model:open="notifOpen" heading="Inbox" placement="bottom">
        <template #trigger>
          <button type="button" class="pulse-icon-btn" aria-label="Notifications">
            <i class="bi bi-bell"></i>
            <span v-if="unreadCount" class="pulse-notif-badge">{{ unreadCount }}</span>
          </button>
        </template>
        <div class="pulse-row pulse-row-between pulse-mb">
          <span class="pulse-muted">{{ unreadCount }} unread</span>
          <Button size="sm" variant="tertiary" :disabled="!unreadCount" @click="markAllRead">Mark all read</Button>
        </div>
        <List :items="notificationItems" divided />
      </Popover>
      <DropdownMenu v-model:open="profileOpen" placement="bottom-end">
        <template #trigger>
          <button class="pulse-avatar-btn" type="button">
            <Avatar :name="state.currentUser.name" size="sm" />
            <span class="pulse-avatar-text">
              <strong>{{ state.currentUser.name }}</strong>
              <small>{{ state.currentUser.role }}</small>
            </span>
          </button>
        </template>
        <MenuItem value="profile" label="View profile" @select="onMenu" />
        <MenuItem value="settings" label="Preferences" @select="onMenu" />
        <MenuItem value="signout" label="Sign out" danger @select="onMenu" />
      </DropdownMenu>
    </div>
  </header>
</template>
