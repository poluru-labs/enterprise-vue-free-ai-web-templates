<script setup>
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
  Autocomplete,
  Avatar,
  Button,
  DatePicker,
  Drawer,
  DropdownMenu,
  Input,
  Kbd,
  MenuItem,
  Modal,
  NumberInput,
  Select,
  Textarea,
  showToast,
} from '@poluru-labs/enterprise-design-system-vue';
import {
  APP_NAME,
  APP_TAGLINE,
  BASE_PATH,
  COMMAND_ITEMS,
  CONTROL_STATUS_OPTIONS,
  DOMAIN_OPTIONS,
  FRAMEWORK_OPTIONS,
  OWNER_OPTIONS,
  SIGNED_IN_USER,
} from '../../constants/navigation.js';
import notifications from '../../data/notifications.json';
import { useCommandPalette } from '../../composables/useCommandPalette.js';
import { useCompliance } from '../../stores/compliance.js';
import { formatDate, formatDateTime } from '../../utils/format.js';
import { searchRecords } from '../../utils/search.js';

const emit = defineEmits(['menu-toggle']);
const router = useRouter();
const route = useRoute();
const store = useCompliance();
const { open: paletteOpen, setOpen: setPaletteOpen } = useCommandPalette();

const query = ref('');
const paletteQuery = ref('');
const notifyOpen = ref(false);
const menuOpen = ref(false);
const form = ref({
  title: '',
  code: '',
  domain: 'Access',
  framework: 'SOC 2',
  owner: SIGNED_IN_USER.name,
  status: 'draft',
  effectiveness: 40,
  nextReview: '2026-12-01',
  notes: '',
});

const dueCount = computed(() => store.dueAudits.length);
const coverage = computed(() => store.coverage);
const paletteHits = computed(() =>
  searchRecords(COMMAND_ITEMS, paletteQuery.value, ['label', 'hint', 'group']),
);

watch(
  () => route.query.new,
  (value) => {
    if (value === '1') store.setControlOpen(true);
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
  if (item.id === 'new-control') {
    store.setControlOpen(true);
    return;
  }
  router.push(item.to);
}

function submitControl() {
  const record = store.addControl(form.value);
  if (!record) {
    showToast({
      title: 'Title required',
      description: 'Name the control before it can join the library.',
      variant: 'warning',
    });
    return;
  }
  showToast({
    title: 'Control added',
    description: `${record.code} is owned by ${record.owner}.`,
    variant: 'success',
  });
  form.value = {
    title: '',
    code: '',
    domain: 'Access',
    framework: 'SOC 2',
    owner: SIGNED_IN_USER.name,
    status: 'draft',
    effectiveness: 40,
    nextReview: '2026-12-01',
    notes: '',
  };
  router.push(`${BASE_PATH}/controls/${record.id}`);
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
  <header class="aeg-header">
    <div class="aeg-header-stripe" aria-hidden="true" />
    <div class="aeg-header-inner">
      <div class="aeg-header-start">
        <Button
          class="aeg-menu-btn"
          variant="tertiary"
          size="sm"
          icon="menu"
          icon-only
          accessible-label="Open navigation"
          @click="emit('menu-toggle')"
        />
        <div class="aeg-header-brand">
          <span class="aeg-mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" width="28" height="28">
              <rect width="32" height="32" rx="9" fill="#FF5722" />
              <path d="M16 5.5 25 9.2v7.1c0 6.1-3.9 9.4-9 10.7-5.1-1.3-9-4.6-9-10.7V9.2L16 5.5z" fill="#FFF3E0" />
              <path d="M16 10.2v12.2c3.6-1.1 6.2-3.5 6.2-7.6V11.8L16 10.2z" fill="#FFCCBC" />
            </svg>
          </span>
          <div>
            <strong>{{ APP_NAME }}</strong>
            <span>{{ APP_TAGLINE }}</span>
          </div>
        </div>
      </div>

      <div class="aeg-header-center">
        <button
          type="button"
          class="aeg-due-chip"
          aria-label="Open upcoming audits"
          @click="router.push(`${BASE_PATH}/audits`)"
        >
          <i class="bi bi-calendar-event" aria-hidden="true" />
          <span>
            <strong>{{ dueCount }} audits on the calendar</strong>
            <small>Next close {{ formatDate(store.dueAudits[0]?.end) }}</small>
          </span>
        </button>
        <div class="aeg-coverage">
          <div class="aeg-coverage-copy">
            <span>Coverage</span>
            <strong>{{ coverage }}%</strong>
          </div>
          <div class="aeg-coverage-track" aria-hidden="true">
            <div class="aeg-coverage-fill" :style="{ width: `${coverage}%` }" />
          </div>
        </div>
      </div>

      <div class="aeg-header-end">
        <label class="aeg-inset-search">
          <i class="bi bi-search" aria-hidden="true" />
          <input
            v-model="query"
            type="search"
            placeholder="Search controls, audits, risks"
            aria-label="Search controls, audits, risks"
            @keydown.enter.prevent="goSearch"
          />
          <button type="button" class="aeg-kbd-btn" aria-label="Command palette" @click="setPaletteOpen(true)">
            <Kbd>⌘K</Kbd>
          </button>
        </label>
        <Button size="sm" icon="plus" @click="store.setControlOpen(true)">Add control</Button>
        <div class="aeg-notify-wrap">
          <Button
            variant="tertiary"
            size="sm"
            icon="bell"
            icon-only
            accessible-label="Notifications"
            @click="notifyOpen = true"
          />
          <span v-if="notifications.unread" class="aeg-notify-count" aria-hidden="true">
            {{ notifications.unread }}
          </span>
        </div>
        <DropdownMenu v-model:open="menuOpen">
          <template #trigger>
            <button
              type="button"
              class="aeg-profile"
              :title="`${SIGNED_IN_USER.name} · ${SIGNED_IN_USER.role}`"
            >
              <Avatar :name="SIGNED_IN_USER.name" size="sm" />
              <div class="aeg-profile-copy">
                <strong>{{ SIGNED_IN_USER.name }}</strong>
                <span>{{ SIGNED_IN_USER.role }}</span>
              </div>
            </button>
          </template>
          <MenuItem label="Aegis settings" value="settings" @select="onMenuSelect" />
          <MenuItem label="Open command palette" value="palette" @select="onMenuSelect" />
          <MenuItem label="Sign out" value="signout" danger @select="onMenuSelect" />
        </DropdownMenu>
      </div>
    </div>
  </header>

  <Drawer v-model:open="notifyOpen" :heading="`${notifications.unread} unread alerts`" size="md">
    <p class="aeg-subtle">Kavya Poluru · last sync 4 min ago</p>
    <ul class="aeg-notify-list">
      <li v-for="item in notifications.items" :key="item.id">
        <button
          type="button"
          class="aeg-notify-item"
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

  <Modal :open="paletteOpen" heading="Jump to anything" @update:open="setPaletteOpen">
    <label class="aeg-palette-search">
      Search pages and actions
      <input v-model="paletteQuery" placeholder="Controls, audits, risks…" />
    </label>
    <ul class="aeg-palette-list">
      <li v-for="item in paletteHits" :key="item.id">
        <button type="button" @click="goCommand(item)">
          <strong>{{ item.label }}</strong>
          <span>{{ item.hint }}</span>
        </button>
      </li>
    </ul>
  </Modal>

  <Modal
    :open="store.controlOpen"
    heading="Add control"
    @update:open="(open) => store.setControlOpen(open)"
  >
    <div class="aeg-form-grid">
      <Input class="full" v-model="form.title" label="Title" placeholder="Privileged access review" required />
      <Input v-model="form.code" label="Code" placeholder="AC-22" />
      <Select v-model="form.domain" label="Domain" :options="DOMAIN_OPTIONS" />
      <Select v-model="form.framework" label="Framework" :options="FRAMEWORK_OPTIONS" />
      <Autocomplete v-model="form.owner" label="Owner" :options="OWNER_OPTIONS" />
      <Select v-model="form.status" label="Status" :options="CONTROL_STATUS_OPTIONS" />
      <NumberInput v-model="form.effectiveness" label="Effectiveness" :min="0" :max="100" :step="1" />
      <DatePicker v-model="form.nextReview" label="Next review" />
      <Textarea class="full" v-model="form.notes" label="Notes" placeholder="Scope, evidence, or residual risk." />
    </div>
    <template #footer>
      <Button variant="secondary" @click="store.setControlOpen(false)">Cancel</Button>
      <Button @click="submitControl">Save control</Button>
    </template>
  </Modal>
</template>
