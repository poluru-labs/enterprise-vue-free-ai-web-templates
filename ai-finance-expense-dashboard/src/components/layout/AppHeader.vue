<script setup>
import { computed, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import {
  Avatar,
  Button,
  DropdownMenu,
  Kbd,
  MenuItem,
  Popover,
  showToast,
  useTheme,
} from '@poluru-labs/enterprise-design-system-vue';
import { APP_NAME, APP_TAGLINE, BASE_PATH, SIGNED_IN_USER } from '../../constants/navigation.js';
import { useCommandPalette } from '../../composables/useCommandPalette.js';
import { useFinanceStore } from '../../stores/finance.js';
import { formatCurrency, formatPercent } from '../../utils/format.js';

const router = useRouter();
const store = useFinanceStore();
const { theme, toggleTheme } = useTheme();
const { setOpen: setPaletteOpen } = useCommandPalette();

const query = ref('');
const notifyOpen = ref(false);
const menuOpen = ref(false);

const close = computed(() => store.close);

function submitSearch() {
  const q = query.value.trim();
  router.push({ path: `${BASE_PATH}/search`, query: q ? { q } : {} });
}

function onMenu(item) {
  menuOpen.value = false;
  if (item.value === 'settings') router.push(`${BASE_PATH}/settings`);
  if (item.value === 'signout') {
    showToast({
      title: 'Signed out',
      description: `${SIGNED_IN_USER.name} ended the Mint session.`,
      variant: 'info',
    });
  }
}
</script>

<template>
  <header class="mint-header">
    <div class="mint-header-row">
      <div class="mint-header-left">
        <button
          type="button"
          class="mint-icon-btn mint-menu-btn"
          aria-label="Open navigation"
          @click="store.setSidebarOpen(!store.sidebarOpen)"
        >
          <i class="bi bi-list" />
        </button>
        <RouterLink class="mint-wordmark" :to="`${BASE_PATH}/overview`">
          <span class="mint-mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" width="32" height="32">
              <rect width="32" height="32" rx="10" fill="#047857" />
              <path d="M9 22c5-10 9-13 14-15-1 6-2 11-4 15-4 1-7 1-10 0z" fill="#A7F3D0" />
              <path d="M8 12h16M8 17h12" stroke="#ECFDF5" stroke-width="1.7" stroke-linecap="round" />
            </svg>
          </span>
          <span class="mint-wordmark-copy">
            <strong>{{ APP_NAME }}</strong>
            <small>{{ APP_TAGLINE }}</small>
          </span>
        </RouterLink>
      </div>

      <div class="mint-header-center">
        <div class="mint-burn" aria-label="August close burn meter">
          <span class="mint-burn-kicker">{{ close.label }}</span>
          <div class="mint-burn-meter" role="img" :aria-label="`${close.percent} percent closed`">
            <svg viewBox="0 0 56 56" width="44" height="44">
              <circle cx="28" cy="28" r="18" fill="none" stroke="#A7F3D0" stroke-width="6" />
              <circle
                cx="28"
                cy="28"
                r="18"
                fill="none"
                stroke="#047857"
                stroke-width="6"
                stroke-linecap="round"
                :stroke-dasharray="`${(close.percent / 100) * 113} 113`"
                transform="rotate(-90 28 28)"
              />
              <text x="28" y="32" text-anchor="middle" class="mint-burn-num">{{ close.percent }}</text>
            </svg>
          </div>
          <span class="mint-burn-copy">
            <strong>{{ formatPercent(close.percent) }} closed</strong>
            <small>{{ formatCurrency(store.remainingBudget) }} remaining</small>
          </span>
        </div>
      </div>

      <div class="mint-header-actions">
        <form class="mint-pill-search" @submit.prevent="submitSearch">
          <i class="bi bi-search" aria-hidden="true" />
          <input
            v-model="query"
            type="search"
            placeholder="Search expenses or vendors"
            aria-label="Search expenses or vendors"
          />
        </form>
        <Button icon="plus" @click="store.openComposer()">Submit expense</Button>
        <button type="button" class="mint-kbd-btn" @click="setPaletteOpen(true)">
          <Kbd :keys="['⌘', 'K']" />
        </button>
        <Popover v-model:open="notifyOpen" heading="Inbox" placement="bottom">
          <template #trigger>
            <button type="button" class="mint-icon-btn" aria-label="Notifications">
              <i class="bi bi-bell" />
              <span v-if="store.unreadCount" class="mint-dot">{{ store.unreadCount }}</span>
            </button>
          </template>
          <div class="mint-notify-head">
            <span>{{ store.unreadCount }} unread</span>
            <Button size="sm" variant="tertiary" :disabled="!store.unreadCount" @click="store.markNotificationsRead()">
              Mark all read
            </Button>
          </div>
          <ul class="mint-notify-list">
            <li v-for="item in store.notifications" :key="item.id">
              <strong>{{ item.read ? item.title : `● ${item.title}` }}</strong>
              <span>{{ item.body }} · {{ item.time }}</span>
            </li>
          </ul>
        </Popover>
        <button
          type="button"
          class="mint-icon-btn"
          :aria-label="theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'"
          @click="toggleTheme"
        >
          <i :class="theme === 'dark' ? 'bi bi-sun' : 'bi bi-moon'" />
        </button>
        <DropdownMenu v-model:open="menuOpen" placement="bottom">
          <template #trigger>
            <button type="button" class="mint-avatar-btn" :aria-label="SIGNED_IN_USER.name">
              <Avatar :name="SIGNED_IN_USER.name" size="sm" />
            </button>
          </template>
          <MenuItem value="settings" label="Close settings" @select="onMenu" />
          <MenuItem value="signout" label="Sign out" danger @select="onMenu" />
        </DropdownMenu>
      </div>
    </div>
    <div class="mint-close-track" role="progressbar" :aria-valuenow="close.percent" aria-valuemin="0" aria-valuemax="100" :aria-label="`${close.label} ${close.percent} percent closed`">
      <span class="mint-close-track-fill" :style="{ width: `${close.percent}%` }" />
    </div>
  </header>
</template>
