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
  showToast,
  Tooltip,
} from '@poluru-labs/enterprise-design-system-vue';
import ForecastGauge from '../charts/ForecastGauge.vue';
import CoverageChip from '../widgets/CoverageChip.vue';
import { PRODUCT_NAME, PRODUCT_TAGLINE } from '../../constants/product.js';
import { useQuotaStore } from '../../stores/quota.js';

const router = useRouter();
const { state, unreadCount, markAllRead } = useQuotaStore();

const profileOpen = ref(false);
const notifOpen = ref(false);

const query = computed({
  get: () => state.query,
  set: (value) => {
    state.query = value;
  },
});

const coverageLabel = computed(() => `${state.forecast.coverage}×`);

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
  <header class="quota-header">
    <RouterLink class="quota-brand" to="/">
      <span class="quota-brand-mark" aria-hidden="true">
        <svg viewBox="0 0 32 32" width="28" height="28">
          <circle cx="16" cy="16" r="14" fill="none" stroke="currentColor" stroke-width="2.2" />
          <circle cx="16" cy="16" r="8" fill="none" stroke="currentColor" stroke-width="2.2" />
          <circle cx="16" cy="16" r="3" fill="currentColor" />
        </svg>
      </span>
      <span class="quota-brand-text">
        <strong>{{ PRODUCT_NAME }}</strong>
        <small>{{ PRODUCT_TAGLINE }}</small>
      </span>
    </RouterLink>

    <div class="quota-header-center" aria-label="Q3 forecast">
      <div class="quota-gauge-block">
        <ForecastGauge :percent="state.forecast.attainment" :label="state.forecast.label" />
        <span class="quota-gauge-caption">{{ state.forecast.label }}</span>
      </div>
      <CoverageChip :value="coverageLabel" />
    </div>

    <div class="quota-header-end">
      <div class="quota-header-search">
        <Search v-model="query" placeholder="Search deals, coverage…" @submit="goSearch" />
      </div>
      <Tooltip content="Command palette · ⌘K">
        <button type="button" class="quota-icon-btn" aria-label="Command palette" @click="state.commandOpen = true">
          <Kbd :keys="['⌘', 'K']" />
        </button>
      </Tooltip>
      <Button icon="plus" variant="secondary" @click="state.activityOpen = true">Log activity</Button>
      <Popover v-model:open="notifOpen" heading="Inbox" placement="bottom">
        <template #trigger>
          <button type="button" class="quota-icon-btn" aria-label="Notifications">
            <i class="bi bi-bell"></i>
            <span v-if="unreadCount" class="quota-notif-badge">{{ unreadCount }}</span>
          </button>
        </template>
        <div class="quota-row quota-row-between quota-mb">
          <span class="quota-muted">{{ unreadCount }} unread</span>
          <Button size="sm" variant="tertiary" :disabled="!unreadCount" @click="markAllRead">Mark all read</Button>
        </div>
        <List :items="notificationItems" divided />
      </Popover>
      <DropdownMenu v-model:open="profileOpen" placement="bottom-end">
        <template #trigger>
          <button class="quota-avatar-btn" type="button">
            <Avatar :name="state.currentUser.name" size="sm" />
            <span class="quota-avatar-text">
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
