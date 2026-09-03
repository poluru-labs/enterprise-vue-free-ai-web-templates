<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
  Avatar,
  Button,
  Drawer,
  DropdownMenu,
  Input,
  Kbd,
  MenuItem,
  Modal,
  Select,
  showToast,
  setEdsTheme,
} from '@poluru-labs/enterprise-design-system-vue';
import {
  APP_NAME,
  APP_TAGLINE,
  BASE_PATH,
  COMMAND_ITEMS,
  ROLE_OPTIONS,
  SIGNED_IN_USER,
} from '../../constants/navigation.js';
import notifications from '../../data/notifications.json';
import { useCommandPalette } from '../../composables/useCommandPalette.js';
import { useWorkspace } from '../../stores/workspace.js';
import { formatDateTime, formatNumber } from '../../utils/format.js';
import { searchRecords } from '../../utils/search.js';

const emit = defineEmits(['menu-toggle']);
const router = useRouter();
const route = useRoute();
const store = useWorkspace();
const { open: paletteOpen, setOpen: setPaletteOpen } = useCommandPalette();

const query = ref('');
const paletteQuery = ref('');
const notifyOpen = ref(false);
const menuOpen = ref(false);
const isDark = ref(false);
const inviteName = ref('');
const inviteEmail = ref('');
const inviteRole = ref('Viewer');
const inviteOrg = ref(store.state.selectedTenantId || store.state.tenants[0]?.id || '');

const orgOptions = computed(() =>
  store.state.tenants.map((tenant) => ({ value: tenant.id, label: tenant.name })),
);

const paletteHits = computed(() =>
  searchRecords(COMMAND_ITEMS, paletteQuery.value, ['label', 'hint', 'group']),
);

const seatUsed = computed(() => store.seatsUsed);
const seatLimit = computed(() => store.seatsLimit);
const seatPct = computed(() =>
  seatLimit.value ? Math.round((seatUsed.value / seatLimit.value) * 100) : 0,
);
const rolloutCount = computed(() => store.rolloutFlags.length);

watch(
  () => store.state.inviteOpen,
  (open) => {
    if (open) inviteOrg.value = store.state.selectedTenantId || store.state.tenants[0]?.id || '';
  },
);

watch(
  () => route.query.invite,
  (value) => {
    if (value === '1') store.setInviteOpen(true);
  },
  { immediate: true },
);

function applyTheme(dark) {
  isDark.value = dark;
  if (typeof setEdsTheme === 'function') {
    setEdsTheme(dark ? 'dark' : 'light');
  }
  document.documentElement.classList.toggle('hbr-dark', dark);
}

function toggleTheme() {
  applyTheme(!isDark.value);
}

function goSearch() {
  const next = query.value.trim();
  router.push(next ? `${BASE_PATH}/search?q=${encodeURIComponent(next)}` : `${BASE_PATH}/search`);
}

function onOrgChange(id) {
  store.setSelectedTenant(id);
  if (id) router.push(`${BASE_PATH}/tenants/${id}`);
}

function goCommand(item) {
  setPaletteOpen(false);
  paletteQuery.value = '';
  if (item.id === 'invite-member') {
    store.setInviteOpen(true);
    return;
  }
  router.push(item.to);
}

function submitInvite() {
  if (!inviteName.value.trim() || !inviteEmail.value.trim()) {
    showToast({
      title: 'Name and email required',
      description: 'Add both before Harbor can send the seat.',
      variant: 'warning',
    });
    return;
  }
  store.addMember({
    name: inviteName.value,
    email: inviteEmail.value,
    role: inviteRole.value,
    orgId: inviteOrg.value,
    status: 'invited',
  });
  showToast({
    title: 'Invite sent',
    description: `${inviteName.value} will join as ${inviteRole.value}.`,
    variant: 'success',
  });
  inviteName.value = '';
  inviteEmail.value = '';
  inviteRole.value = 'Viewer';
  store.setInviteOpen(false);
  router.push(`${BASE_PATH}/members`);
}

function closeInvite() {
  store.setInviteOpen(false);
  inviteName.value = '';
  inviteEmail.value = '';
  inviteRole.value = 'Viewer';
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

function onInviteEvent() {
  store.setInviteOpen(true);
}

onMounted(() => window.addEventListener('hbr:invite', onInviteEvent));
onBeforeUnmount(() => window.removeEventListener('hbr:invite', onInviteEvent));
</script>

<template>
  <header class="hbr-header">
    <div class="hbr-header-stripe" aria-hidden="true" />
    <div class="hbr-header-inner">
      <div class="hbr-header-start">
        <Button
          class="hbr-menu-btn"
          variant="tertiary"
          size="sm"
          icon="menu"
          icon-only
          accessible-label="Open navigation"
          @click="emit('menu-toggle')"
        />
        <div class="hbr-header-brand">
          <strong>{{ APP_NAME }}</strong>
          <span>{{ APP_TAGLINE }}</span>
        </div>
        <label class="hbr-org-switcher">
          <span>Org</span>
          <Select
            :model-value="store.selectedTenantId"
            :options="orgOptions"
            size="sm"
            @update:model-value="onOrgChange"
          />
        </label>
      </div>

      <div class="hbr-header-center">
        <div class="hbr-seat-meter" aria-label="Seat usage">
          <div class="hbr-seat-copy">
            <span>Seats</span>
            <strong>{{ formatNumber(seatUsed) }} / {{ formatNumber(seatLimit) }}</strong>
          </div>
          <div class="hbr-seat-track" role="meter" :aria-valuenow="seatPct" aria-valuemin="0" aria-valuemax="100">
            <div class="hbr-seat-fill" :style="{ width: `${seatPct}%` }" />
          </div>
        </div>
        <button type="button" class="hbr-rollout-chip" @click="router.push(`${BASE_PATH}/flags`)">
          {{ rolloutCount }} flags in rollout
        </button>
        <label class="hbr-inset-search">
          <i class="bi bi-search" aria-hidden="true" />
          <input
            v-model="query"
            type="search"
            placeholder="Search tenants, members, flags"
            aria-label="Search tenants, members, flags"
            @keydown.enter.prevent="goSearch"
          />
          <button type="button" class="hbr-kbd-btn" @click="setPaletteOpen(true)">
            <Kbd>⌘K</Kbd>
          </button>
        </label>
      </div>

      <div class="hbr-header-end">
        <Button size="sm" icon="user" @click="store.setInviteOpen(true)">Invite member</Button>
        <div class="hbr-notify-wrap">
          <Button
            variant="tertiary"
            size="sm"
            icon="bell"
            icon-only
            accessible-label="Notifications"
            @click="notifyOpen = true"
          />
          <span v-if="notifications.unread" class="hbr-notify-count" aria-hidden="true">
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
              class="hbr-profile"
              :title="`${SIGNED_IN_USER.name} · ${SIGNED_IN_USER.role}`"
            >
              <Avatar :name="SIGNED_IN_USER.name" size="sm" />
              <div class="hbr-profile-copy">
                <strong>{{ SIGNED_IN_USER.name }}</strong>
                <span>{{ SIGNED_IN_USER.role }}</span>
              </div>
            </button>
          </template>
          <MenuItem label="Workspace settings" value="settings" @select="onMenuSelect" />
          <MenuItem label="Open command palette" value="palette" @select="onMenuSelect" />
          <MenuItem label="Sign out" value="signout" danger @select="onMenuSelect" />
        </DropdownMenu>
      </div>
    </div>
  </header>

  <Drawer v-model:open="notifyOpen" :heading="`${notifications.unread} unread alerts`" size="md">
    <p class="hbr-subtle">Lakshmi Poluru · last sync 3 min ago</p>
    <ul class="hbr-notify-list">
      <li v-for="item in notifications.items" :key="item.id">
        <button
          type="button"
          class="hbr-notify-item"
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
    <label class="hbr-palette-search">
      Search pages and actions
      <input
        v-model="paletteQuery"
        placeholder="Tenants, members, invite…"
      />
    </label>
    <ul class="hbr-palette-list">
      <li v-for="item in paletteHits" :key="item.id">
        <button type="button" @click="goCommand(item)">
          <strong>{{ item.label }}</strong>
          <span>{{ item.hint }}</span>
        </button>
      </li>
    </ul>
  </Modal>

  <Modal
    :open="store.inviteOpen"
    heading="Invite member"
    @update:open="(open) => (open ? store.setInviteOpen(true) : closeInvite())"
  >
    <div class="hbr-form-stack">
      <Input v-model="inviteName" label="Full name" placeholder="Ananya Poluru" />
      <Input v-model="inviteEmail" label="Work email" type="email" placeholder="ananya.poluru@northwind.example" />
      <Select v-model="inviteRole" label="Role" :options="ROLE_OPTIONS" />
      <Select v-model="inviteOrg" label="Tenant" :options="orgOptions" />
    </div>
    <template #footer>
      <Button variant="secondary" @click="closeInvite">Cancel</Button>
      <Button @click="submitInvite">Send invite</Button>
    </template>
  </Modal>
</template>
