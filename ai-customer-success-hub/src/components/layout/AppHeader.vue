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
  Rating,
  Select,
  Slider,
  Textarea,
  TimePicker,
  Tooltip,
  VisuallyHidden,
  showToast,
} from '@poluru-labs/enterprise-design-system-vue';
import {
  APP_NAME,
  APP_TAGLINE,
  BASE_PATH,
  COMMAND_ITEMS,
  OWNER_OPTIONS,
  REGION_OPTIONS,
  SEGMENT_OPTIONS,
  SIGNED_IN_USER,
} from '../../constants/navigation.js';
import { useCommandPalette } from '../../composables/useCommandPalette.js';
import notifications from '../../data/notifications.json';
import { useSuccess } from '../../stores/success.js';
import { formatDateTime } from '../../utils/format.js';
import { searchRecords } from '../../utils/search.js';

const emit = defineEmits(['menu-toggle']);
const route = useRoute();
const router = useRouter();
const store = useSuccess();
const { open: paletteOpen, setOpen: setPaletteOpen } = useCommandPalette();

const query = ref('');
const paletteQuery = ref('');
const notifyOpen = ref(false);
const form = ref(blankForm());

const paletteHits = computed(() =>
  searchRecords(COMMAND_ITEMS, paletteQuery.value, ['label', 'hint', 'group']),
);
const soonCount = computed(() => store.openRenewals.filter((item) => item.date <= '2026-11-30').length);

watch(
  () => route.query.new,
  (value) => {
    if (value === '1') store.setAccountOpen(true);
  },
  { immediate: true },
);

function blankForm() {
  return {
    name: '',
    segment: 'Mid-market',
    region: 'North America',
    owner: SIGNED_IN_USER.name,
    arr: 48000,
    seats: 40,
    health: 70,
    sentiment: 4,
    renewal: '2026-12-15',
    nextCall: '10:00',
    notes: '',
  };
}

function goSearch() {
  const next = query.value.trim();
  router.push(next ? `${BASE_PATH}/search?q=${encodeURIComponent(next)}` : `${BASE_PATH}/search`);
}

function goCommand(item) {
  setPaletteOpen(false);
  paletteQuery.value = '';
  if (item.id === 'new-account') {
    store.setAccountOpen(true);
    return;
  }
  router.push(item.to);
}

function submitAccount() {
  const record = store.addAccount(form.value);
  if (!record) {
    showToast({
      title: 'Name required',
      description: 'Add an account name before saving.',
      variant: 'warning',
    });
    return;
  }
  showToast({
    title: 'Account added',
    description: `${record.name} is owned by ${record.owner}.`,
    variant: 'success',
  });
  form.value = blankForm();
  router.push(`${BASE_PATH}/accounts/${record.id}`);
}

function goNotify(href) {
  notifyOpen.value = false;
  router.push(href);
}
</script>

<template>
  <header class="mrg-header">
    <div class="mrg-header-inner">
      <div class="mrg-header-start">
        <Button
          class="mrg-menu-btn"
          variant="tertiary"
          size="sm"
          icon="menu"
          icon-only
          accessible-label="Open navigation"
          @click="emit('menu-toggle')"
        />
        <div class="mrg-header-brand">
          <span class="mrg-mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" width="28" height="28">
              <rect width="32" height="32" rx="10" fill="#F2C46A" />
              <circle cx="16" cy="16" r="4.2" fill="#3F2E08" />
              <path
                d="M16 5.2v3.2M16 23.6V27M5.2 16h3.2M23.6 16H27M8.2 8.2l2.2 2.2M21.6 21.6l2.2 2.2M23.8 8.2l-2.2 2.2M10.4 21.6l-2.2 2.2"
                stroke="#3F2E08"
                stroke-width="1.6"
                stroke-linecap="round"
              />
            </svg>
          </span>
          <div>
            <strong>{{ APP_NAME }}</strong>
            <span>{{ APP_TAGLINE }}</span>
          </div>
        </div>
      </div>

      <label class="mrg-inset-search">
        <Icon name="search" size="sm" decorative />
        <VisuallyHidden>Search accounts, renewals, and activities</VisuallyHidden>
        <input
          v-model="query"
          type="search"
          placeholder="Search accounts, renewals, activities"
          aria-label="Search accounts, renewals, activities"
          @keydown.enter.prevent="goSearch"
        />
        <Tooltip content="Open the command palette">
          <button type="button" class="mrg-kbd-btn" aria-label="Command palette" @click="setPaletteOpen(true)">
            <Kbd>⌘K</Kbd>
          </button>
        </Tooltip>
      </label>

      <div class="mrg-header-end">
        <button type="button" class="mrg-renewal-pill" @click="router.push(`${BASE_PATH}/renewals`)">
          <Icon name="calendar" size="sm" decorative />
          <span>{{ soonCount }} renewals before December</span>
        </button>
        <Tooltip content="Notifications">
          <span class="mrg-notify-wrap">
            <Button
              variant="tertiary"
              size="sm"
              icon="bell"
              icon-only
              accessible-label="Notifications"
              @click="notifyOpen = true"
            />
            <span v-if="notifications.unread" class="mrg-notify-count">{{ notifications.unread }}</span>
          </span>
        </Tooltip>
        <Button size="sm" icon="plus" @click="store.setAccountOpen(true)">Add account</Button>
      </div>
    </div>
  </header>

  <Modal :open="paletteOpen" heading="Jump to anything" @update:open="setPaletteOpen">
    <label class="mrg-palette-search">
      Search pages and actions
      <input v-model="paletteQuery" placeholder="Accounts, renewals, onboarding…" />
    </label>
    <ul class="mrg-palette-list">
      <li v-for="item in paletteHits" :key="item.id">
        <button type="button" @click="goCommand(item)">
          <strong>{{ item.label }}</strong>
          <span>{{ item.hint }}</span>
        </button>
      </li>
    </ul>
  </Modal>

  <Drawer v-model:open="notifyOpen" :heading="`${notifications.unread} unread notes`" size="md">
    <p class="mrg-subtle">{{ SIGNED_IN_USER.name }} · Thursday book</p>
    <ul class="mrg-notify-list">
      <li v-for="item in notifications.items" :key="item.id">
        <button type="button" class="mrg-notify-item" :class="`tone-${item.tone}`" @click="goNotify(item.href)">
          <strong>{{ item.title }}</strong>
          <p>{{ item.body }}</p>
          <span>{{ formatDateTime(item.time) }}</span>
        </button>
      </li>
    </ul>
  </Drawer>

  <Modal :open="store.accountOpen" heading="Add account" @update:open="(open) => store.setAccountOpen(open)">
    <div class="mrg-form-grid">
      <Input v-model="form.name" class="full" label="Account name" placeholder="Northwind Labs" required />
      <Select v-model="form.segment" label="Segment" :options="SEGMENT_OPTIONS" />
      <Combobox v-model="form.region" label="Region" :options="REGION_OPTIONS" placeholder="Choose a region" />
      <Autocomplete v-model="form.owner" label="Owner" :options="OWNER_OPTIONS" />
      <NumberInput v-model="form.arr" label="ARR" :min="0" :step="1000" />
      <NumberInput v-model="form.seats" label="Seats" :min="1" :step="1" />
      <DatePicker v-model="form.renewal" label="Renewal date" />
      <TimePicker v-model="form.nextCall" label="Next call" />
      <Slider v-model="form.health" class="full" label="Health" :min="0" :max="100" :step="1" show-value />
      <Rating v-model="form.sentiment" label="Sentiment" :max="5" />
      <Textarea v-model="form.notes" class="full" label="Notes" placeholder="What should the next owner know?" />
    </div>
    <template #footer>
      <Button variant="secondary" @click="store.setAccountOpen(false)">Cancel</Button>
      <Button icon="save" @click="submitAccount">Save account</Button>
    </template>
  </Modal>
</template>
