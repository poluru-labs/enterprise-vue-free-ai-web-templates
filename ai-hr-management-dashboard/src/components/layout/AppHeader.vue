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
} from '@poluru-labs/enterprise-design-system-vue';
import {
  APP_NAME,
  APP_TAGLINE,
  BASE_PATH,
  COMMAND_ITEMS,
  DEPARTMENT_OPTIONS,
  EMPLOYMENT_OPTIONS,
  LOCATION_OPTIONS,
  NEXT_HOLIDAY,
  SIGNED_IN_USER,
} from '../../constants/navigation.js';
import notifications from '../../data/notifications.json';
import { useCommandPalette } from '../../composables/useCommandPalette.js';
import { useHr } from '../../stores/hr.js';
import { formatDateTime } from '../../utils/format.js';
import { searchRecords } from '../../utils/search.js';

const emit = defineEmits(['menu-toggle']);
const router = useRouter();
const route = useRoute();
const store = useHr();
const { open: paletteOpen, setOpen: setPaletteOpen } = useCommandPalette();

const query = ref('');
const paletteQuery = ref('');
const notifyOpen = ref(false);
const menuOpen = ref(false);
const form = ref({
  name: '',
  email: '',
  title: '',
  department: 'People',
  location: 'Austin',
  employmentType: 'Full-time',
});

const leaveAvatars = computed(() => store.onLeaveThisWeek.slice(0, 5));
const leaveCount = computed(() => store.onLeaveThisWeek.length);
const paletteHits = computed(() =>
  searchRecords(COMMAND_ITEMS, paletteQuery.value, ['label', 'hint', 'group']),
);

watch(
  () => route.query.new,
  (value) => {
    if (value === '1') store.setAddEmployeeOpen(true);
  },
  { immediate: true },
);

function goSearch() {
  const next = query.value.trim();
  router.push(next ? `${BASE_PATH}/search?q=${encodeURIComponent(next)}` : `${BASE_PATH}/search`);
}

function goCommand(item) {
  setPaletteOpen(false);
  paletteQuery.value = '';
  if (item.id === 'add-employee') {
    store.setAddEmployeeOpen(true);
    return;
  }
  router.push(item.to);
}

function submitEmployee() {
  if (!form.value.name.trim() || !form.value.email.trim()) {
    showToast({
      title: 'Name and email required',
      description: 'Grove needs both before the record can be created.',
      variant: 'warning',
    });
    return;
  }
  const person = store.addEmployee(form.value);
  showToast({
    title: 'Employee added',
    description: `${person.name} joined ${person.department}.`,
    variant: 'success',
  });
  form.value = {
    name: '',
    email: '',
    title: '',
    department: 'People',
    location: 'Austin',
    employmentType: 'Full-time',
  };
  store.setAddEmployeeOpen(false);
  router.push(`${BASE_PATH}/people/${person.id}`);
}

function closeEmployee() {
  store.setAddEmployeeOpen(false);
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

function onAddEvent() {
  store.setAddEmployeeOpen(true);
}

onMounted(() => window.addEventListener('grove:add-employee', onAddEvent));
onBeforeUnmount(() => window.removeEventListener('grove:add-employee', onAddEvent));
</script>

<template>
  <header class="grove-header">
    <div class="grove-header-stripe" aria-hidden="true" />
    <div class="grove-header-inner">
      <div class="grove-header-start">
        <Button
          class="grove-menu-btn"
          variant="tertiary"
          size="sm"
          icon="menu"
          icon-only
          accessible-label="Open navigation"
          @click="emit('menu-toggle')"
        />
        <div class="grove-header-brand">
          <span class="grove-mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" width="28" height="28">
              <rect width="32" height="32" rx="9" fill="#7C3AED" />
              <path
                d="M16 6c4.2 3.2 6.6 7.2 6.6 11.2A6.6 6.6 0 0 1 16 23.8 6.6 6.6 0 0 1 9.4 17.2C9.4 13.2 11.8 9.2 16 6z"
                fill="#F5F3FF"
              />
              <circle cx="12.2" cy="24.4" r="2.1" fill="#EDE9FE" />
              <circle cx="19.8" cy="24.4" r="2.1" fill="#EDE9FE" />
              <circle cx="16" cy="25.4" r="2.3" fill="#fff" />
            </svg>
          </span>
          <div>
            <strong>{{ APP_NAME }}</strong>
            <span>{{ APP_TAGLINE }}</span>
          </div>
        </div>
      </div>

      <div class="grove-header-center">
        <button
          type="button"
          class="grove-leave-cluster"
          aria-label="People on leave this week"
          @click="router.push(`${BASE_PATH}/leave`)"
        >
          <span class="grove-avatar-stack">
            <Avatar
              v-for="person in leaveAvatars"
              :key="person.id"
              :name="person.name"
              size="sm"
            />
          </span>
          <span class="grove-leave-copy">
            <strong>{{ leaveCount }} on leave this week</strong>
            <small>Open the PTO calendar</small>
          </span>
        </button>
        <button
          type="button"
          class="grove-holiday-chip"
          @click="router.push(`${BASE_PATH}/leave`)"
        >
          <i class="bi bi-calendar3" aria-hidden="true" />
          {{ NEXT_HOLIDAY.label }}
        </button>
      </div>

      <div class="grove-header-end">
        <label class="grove-people-search">
          <i class="bi bi-search" aria-hidden="true" />
          <input
            v-model="query"
            type="search"
            placeholder="Search people"
            aria-label="Search people"
            @keydown.enter.prevent="goSearch"
          />
          <button type="button" class="grove-kbd-btn" aria-label="Command palette" @click="setPaletteOpen(true)">
            <Kbd>⌘K</Kbd>
          </button>
        </label>
        <Button size="sm" icon="plus" @click="store.setAddEmployeeOpen(true)">Add employee</Button>
        <div class="grove-notify-wrap">
          <Button
            variant="tertiary"
            size="sm"
            icon="bell"
            icon-only
            accessible-label="Notifications"
            @click="notifyOpen = true"
          />
          <span v-if="notifications.unread" class="grove-notify-count" aria-hidden="true">
            {{ notifications.unread }}
          </span>
        </div>
        <DropdownMenu v-model:open="menuOpen">
          <template #trigger>
            <button
              type="button"
              class="grove-profile"
              :title="`${SIGNED_IN_USER.name} · ${SIGNED_IN_USER.role}`"
            >
              <Avatar :name="SIGNED_IN_USER.name" size="sm" />
              <div class="grove-profile-copy">
                <strong>{{ SIGNED_IN_USER.name }}</strong>
                <span>{{ SIGNED_IN_USER.role }}</span>
              </div>
            </button>
          </template>
          <MenuItem label="Grove settings" value="settings" @select="onMenuSelect" />
          <MenuItem label="Open command palette" value="palette" @select="onMenuSelect" />
          <MenuItem label="Sign out" value="signout" danger @select="onMenuSelect" />
        </DropdownMenu>
      </div>
    </div>
  </header>

  <Drawer v-model:open="notifyOpen" :heading="`${notifications.unread} unread alerts`" size="md">
    <p class="grove-subtle">Sravani Poluru · last sync 4 min ago</p>
    <ul class="grove-notify-list">
      <li v-for="item in notifications.items" :key="item.id">
        <button
          type="button"
          class="grove-notify-item"
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
    <label class="grove-palette-search">
      Search pages and actions
      <input
        v-model="paletteQuery"
        placeholder="People, leave, hiring…"
      />
    </label>
    <ul class="grove-palette-list">
      <li v-for="item in paletteHits" :key="item.id">
        <button type="button" @click="goCommand(item)">
          <strong>{{ item.label }}</strong>
          <span>{{ item.hint }}</span>
        </button>
      </li>
    </ul>
  </Modal>

  <Modal
    :open="store.addEmployeeOpen"
    heading="Add employee"
    @update:open="(open) => (open ? store.setAddEmployeeOpen(true) : closeEmployee())"
  >
    <div class="grove-form-stack">
      <Input v-model="form.name" label="Full name" placeholder="Leela Poluru" />
      <Input v-model="form.email" label="Work email" type="email" placeholder="leela.poluru@polurulabs.example" />
      <Input v-model="form.title" label="Title" placeholder="People partner" />
      <Select v-model="form.department" label="Department" :options="DEPARTMENT_OPTIONS" />
      <Select v-model="form.location" label="Location" :options="LOCATION_OPTIONS" />
      <Select v-model="form.employmentType" label="Employment" :options="EMPLOYMENT_OPTIONS" />
    </div>
    <template #footer>
      <Button variant="secondary" @click="closeEmployee">Cancel</Button>
      <Button @click="submitEmployee">Add employee</Button>
    </template>
  </Modal>
</template>
