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
  CATEGORY_OPTIONS,
  COMMAND_ITEMS,
  OWNER_OPTIONS,
  SIGNED_IN_USER,
  SITE_OPTIONS,
} from '../../constants/navigation.js';
import { useCommandPalette } from '../../composables/useCommandPalette.js';
import notifications from '../../data/notifications.json';
import { useExperience } from '../../stores/experience.js';
import { formatDateTime } from '../../utils/format.js';
import { searchRecords } from '../../utils/search.js';

const emit = defineEmits(['menu-toggle']);
const route = useRoute();
const router = useRouter();
const store = useExperience();
const { open: paletteOpen, setOpen: setPaletteOpen } = useCommandPalette();

const query = ref('');
const paletteQuery = ref('');
const notifyOpen = ref(false);
const form = ref(blankForm());

const paletteHits = computed(() => searchRecords(COMMAND_ITEMS, paletteQuery.value, ['label', 'hint', 'group']));

watch(
  () => route.query.new,
  (value) => {
    if (value === '1') store.setServiceOpen(true);
  },
  { immediate: true },
);

function blankForm() {
  return {
    name: '',
    category: 'Workplace',
    site: 'Austin',
    owner: SIGNED_IN_USER.name,
    wait: 2,
    score: 4,
    opened: '2026-10-18',
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
  if (item.id === 'new-service') {
    store.setServiceOpen(true);
    return;
  }
  router.push(item.to);
}

function submitService() {
  if (!form.value.name.trim()) {
    showToast({
      title: 'Name required',
      description: 'Name the service before it joins the lobby.',
      variant: 'warning',
    });
    return;
  }
  const record = store.addService(form.value);
  showToast({
    title: 'Service added',
    description: `${record.name} is owned by ${record.owner}.`,
    variant: 'success',
  });
  form.value = blankForm();
  store.setServiceOpen(false);
  router.push(`${BASE_PATH}/services/${record.id}`);
}
</script>

<template>
  <header class="hrt-header">
    <div class="hrt-header-inner">
      <div class="hrt-header-start">
        <Button
          class="hrt-menu-btn"
          variant="tertiary"
          size="sm"
          icon="menu"
          icon-only
          accessible-label="Open navigation"
          @click="emit('menu-toggle')"
        />
        <div class="hrt-header-brand">
          <span class="hrt-mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" width="28" height="28">
              <rect width="32" height="32" rx="8" fill="#FF6500" />
              <path d="M7 17.5 16 9l9 8.5V24H7z" fill="#3A1C08" />
            </svg>
          </span>
          <div>
            <strong>{{ APP_NAME }}</strong>
            <span>{{ APP_TAGLINE }}</span>
          </div>
        </div>
      </div>

      <label class="hrt-inset-search">
        <Icon name="search" size="sm" decorative />
        <VisuallyHidden>Search services, feedback, and resources</VisuallyHidden>
        <input
          v-model="query"
          type="search"
          placeholder="Search services, owners, notes"
          aria-label="Search services, owners, notes"
          @keydown.enter.prevent="goSearch"
        />
        <Tooltip content="Open the command palette">
          <button type="button" class="hrt-kbd-btn" aria-label="Command palette" @click="setPaletteOpen(true)">
            <Kbd>⌘K</Kbd>
          </button>
        </Tooltip>
      </label>

      <div class="hrt-header-end">
        <button type="button" class="hrt-note-pill" @click="router.push(`${BASE_PATH}/feedback`)">
          <Icon name="star" size="sm" decorative />
          <span>{{ store.openNotes.length }} open notes</span>
        </button>
        <Tooltip content="Notifications">
          <span class="hrt-notify-wrap">
            <Button
              variant="tertiary"
              size="sm"
              icon="bell"
              icon-only
              accessible-label="Notifications"
              @click="notifyOpen = true"
            />
            <span v-if="notifications.unread" class="hrt-notify-count">{{ notifications.unread }}</span>
          </span>
        </Tooltip>
        <Button size="sm" icon="plus" @click="store.setServiceOpen(true)">Add service</Button>
      </div>
    </div>
  </header>

  <Modal :open="paletteOpen" heading="Jump to anything" @update:open="setPaletteOpen">
    <label class="hrt-palette-search">
      Search pages and actions
      <input v-model="paletteQuery" placeholder="Services, feedback, resources…" />
    </label>
    <ul class="hrt-palette-list">
      <li v-for="item in paletteHits" :key="item.id">
        <button type="button" @click="goCommand(item)">
          <strong>{{ item.label }}</strong>
          <span>{{ item.hint }}</span>
        </button>
      </li>
    </ul>
  </Modal>

  <Drawer v-model:open="notifyOpen" :heading="`${notifications.unread} unread notes`" size="md">
    <p class="hrt-subtle">{{ SIGNED_IN_USER.name }} · Weekday lobby</p>
    <ul class="hrt-notify-list">
      <li v-for="item in notifications.items" :key="item.id">
        <button type="button" class="hrt-notify-item" @click="notifyOpen = false; router.push(item.href)">
          <strong>{{ item.title }}</strong>
          <p>{{ item.body }}</p>
          <span>{{ formatDateTime(item.time) }}</span>
        </button>
      </li>
    </ul>
  </Drawer>

  <Modal :open="store.serviceOpen" heading="Add service" @update:open="(open) => store.setServiceOpen(open)">
    <div class="hrt-form-grid">
      <Input v-model="form.name" class="full" label="Service name" placeholder="Desk booking" required />
      <Select v-model="form.category" label="Category" :options="CATEGORY_OPTIONS" />
      <Combobox v-model="form.site" label="Site" :options="SITE_OPTIONS" placeholder="Where it runs" />
      <Autocomplete v-model="form.owner" label="Owner" :options="OWNER_OPTIONS" />
      <NumberInput v-model="form.wait" label="Typical wait, days" :min="0" :step="1" />
      <DatePicker v-model="form.opened" class="full" label="Opened" />
      <Slider v-model="form.score" class="full" label="Starting score" :min="1" :max="5" :step="1" show-value />
      <Textarea v-model="form.description" class="full" label="Description" placeholder="What employees can ask for." />
    </div>
    <template #footer>
      <Button variant="secondary" @click="store.setServiceOpen(false)">Cancel</Button>
      <Button icon="save" @click="submitService">Save service</Button>
    </template>
  </Modal>
</template>
