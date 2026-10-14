<script setup>
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
  Autocomplete,
  Button,
  Combobox,
  DatePicker,
  Drawer,
  Icon,
  Input,
  Kbd,
  Modal,
  NumberInput,
  Select,
  Slider,
  Textarea,
  Tooltip,
  VisuallyHidden,
  showToast,
} from '@poluru-labs/enterprise-design-system-vue';
import {
  APP_NAME,
  APP_TAGLINE,
  BASE_PATH,
  CLASS_OPTIONS,
  COMMAND_ITEMS,
  DOMAIN_OPTIONS,
  OWNER_OPTIONS,
  SIGNED_IN_USER,
  SYSTEM_OPTIONS,
} from '../../constants/navigation.js';
import { useCommandPalette } from '../../composables/useCommandPalette.js';
import notifications from '../../data/notifications.json';
import { useGovernance } from '../../stores/governance.js';
import { formatDateTime } from '../../utils/format.js';
import { searchRecords } from '../../utils/search.js';

const emit = defineEmits(['menu-toggle']);
const route = useRoute();
const router = useRouter();
const store = useGovernance();
const { open: paletteOpen, setOpen: setPaletteOpen } = useCommandPalette();

const query = ref('');
const paletteQuery = ref('');
const notifyOpen = ref(false);
const form = ref(blankForm());

const paletteHits = computed(() => searchRecords(COMMAND_ITEMS, paletteQuery.value, ['label', 'hint', 'group']));

watch(
  () => route.query.new,
  (value) => {
    if (value === '1') store.setAssetOpen(true);
  },
  { immediate: true },
);

function blankForm() {
  return {
    name: '',
    domain: 'Customer',
    system: 'Warehouse',
    classification: 'internal',
    owner: SIGNED_IN_USER.name,
    steward: 'Meera Poluru',
    rows: 1000,
    quality: 80,
    freshness: '2026-10-13',
    description: '',
  };
}

function goSearch() {
  const next = query.value.trim();
  router.push(next ? `${BASE_PATH}/search?q=${encodeURIComponent(next)}` : `${BASE_PATH}/search`);
}

function goCommand(item) {
  setPaletteOpen(false);
  paletteQuery.value = '';
  if (item.id === 'new-asset') {
    store.setAssetOpen(true);
    return;
  }
  router.push(item.to);
}

function submitAsset() {
  const record = store.addAsset(form.value);
  if (!record) {
    showToast({
      title: 'Name required',
      description: 'Name the asset before it joins the catalog.',
      variant: 'warning',
    });
    return;
  }
  showToast({
    title: 'Asset registered',
    description: `${record.name} is owned by ${record.owner}.`,
    variant: 'success',
  });
  form.value = blankForm();
  router.push(`${BASE_PATH}/catalog/${record.id}`);
}
</script>

<template>
  <header class="cbt-header">
    <div class="cbt-header-inner">
      <div class="cbt-header-start">
        <Button
          class="cbt-menu-btn"
          variant="tertiary"
          size="sm"
          icon="menu"
          icon-only
          accessible-label="Open navigation"
          @click="emit('menu-toggle')"
        />
        <div class="cbt-header-brand">
          <span class="cbt-mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" width="28" height="28">
              <rect width="32" height="32" rx="8" fill="#3368A0" />
              <rect x="7" y="8" width="18" height="3" rx="1" fill="#ffffff" />
              <rect x="7" y="14.5" width="12" height="3" rx="1" fill="#D6E4F2" />
              <rect x="7" y="21" width="15" height="3" rx="1" fill="#ffffff" />
            </svg>
          </span>
          <div>
            <strong>{{ APP_NAME }}</strong>
            <span>{{ APP_TAGLINE }}</span>
          </div>
        </div>
      </div>

      <label class="cbt-inset-search">
        <Icon name="search" size="sm" decorative />
        <VisuallyHidden>Search the catalog, owners, and requests</VisuallyHidden>
        <input
          v-model="query"
          type="search"
          placeholder="Search assets, owners, policies"
          aria-label="Search assets, owners, policies"
          @keydown.enter.prevent="goSearch"
        />
        <Tooltip content="Open the command palette">
          <button type="button" class="cbt-kbd-btn" aria-label="Command palette" @click="setPaletteOpen(true)">
            <Kbd>⌘K</Kbd>
          </button>
        </Tooltip>
      </label>

      <div class="cbt-header-end">
        <button type="button" class="cbt-request-pill" @click="router.push(`${BASE_PATH}/access`)">
          <Icon name="lock" size="sm" decorative />
          <span>{{ store.openRequests.length }} open requests</span>
        </button>
        <Tooltip content="Notifications">
          <span class="cbt-notify-wrap">
            <Button
              variant="tertiary"
              size="sm"
              icon="bell"
              icon-only
              accessible-label="Notifications"
              @click="notifyOpen = true"
            />
            <span v-if="notifications.unread" class="cbt-notify-count">{{ notifications.unread }}</span>
          </span>
        </Tooltip>
        <Button size="sm" icon="plus" @click="store.setAssetOpen(true)">Register asset</Button>
      </div>
    </div>
  </header>

  <Modal :open="paletteOpen" heading="Jump to anything" @update:open="setPaletteOpen">
    <label class="cbt-palette-search">
      Search pages and actions
      <input v-model="paletteQuery" placeholder="Catalog, quality, access…" />
    </label>
    <ul class="cbt-palette-list">
      <li v-for="item in paletteHits" :key="item.id">
        <button type="button" @click="goCommand(item)">
          <strong>{{ item.label }}</strong>
          <span>{{ item.hint }}</span>
        </button>
      </li>
    </ul>
  </Modal>

  <Drawer v-model:open="notifyOpen" :heading="`${notifications.unread} unread notes`" size="md">
    <p class="cbt-subtle">{{ SIGNED_IN_USER.name }} · Monday registry</p>
    <ul class="cbt-notify-list">
      <li v-for="item in notifications.items" :key="item.id">
        <button type="button" class="cbt-notify-item" @click="notifyOpen = false; router.push(item.href)">
          <strong>{{ item.title }}</strong>
          <p>{{ item.body }}</p>
          <span>{{ formatDateTime(item.time) }}</span>
        </button>
      </li>
    </ul>
  </Drawer>

  <Modal :open="store.assetOpen" heading="Register asset" @update:open="(open) => store.setAssetOpen(open)">
    <div class="cbt-form-grid">
      <Input v-model="form.name" class="full" label="Asset name" placeholder="Customer accounts" required />
      <Select v-model="form.domain" label="Domain" :options="DOMAIN_OPTIONS" />
      <Combobox v-model="form.system" label="System" :options="SYSTEM_OPTIONS" placeholder="Where it lives" />
      <Select v-model="form.classification" label="Classification" :options="CLASS_OPTIONS" />
      <Autocomplete v-model="form.owner" label="Owner" :options="OWNER_OPTIONS" />
      <Autocomplete v-model="form.steward" label="Steward" :options="OWNER_OPTIONS" />
      <NumberInput v-model="form.rows" label="Rows" :min="0" :step="100" />
      <DatePicker v-model="form.freshness" label="Last refresh" />
      <Slider v-model="form.quality" class="full" label="Quality" :min="0" :max="100" :step="1" show-value />
      <Textarea v-model="form.description" class="full" label="Description" placeholder="What this asset is for." />
    </div>
    <template #footer>
      <Button variant="secondary" @click="store.setAssetOpen(false)">Cancel</Button>
      <Button icon="save" @click="submitAsset">Save asset</Button>
    </template>
  </Modal>
</template>
