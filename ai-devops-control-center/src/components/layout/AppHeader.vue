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
  BRANCH_OPTIONS,
  COMMAND_ITEMS,
  ENV_OPTIONS,
  OWNER_OPTIONS,
  REGION_OPTIONS,
  SIGNED_IN_USER,
} from '../../constants/navigation.js';
import { useCommandPalette } from '../../composables/useCommandPalette.js';
import notifications from '../../data/notifications.json';
import { useDevops } from '../../stores/devops.js';
import { formatDateTime } from '../../utils/format.js';
import { searchRecords } from '../../utils/search.js';

const emit = defineEmits(['menu-toggle']);
const route = useRoute();
const router = useRouter();
const store = useDevops();
const { open: paletteOpen, setOpen: setPaletteOpen } = useCommandPalette();

const query = ref('');
const paletteQuery = ref('');
const notifyOpen = ref(false);
const form = ref(blankForm());

const paletteHits = computed(() => searchRecords(COMMAND_ITEMS, paletteQuery.value, ['label', 'hint', 'group']));

watch(
  () => route.query.new,
  (value) => {
    if (value === '1') store.setPipelineOpen(true);
  },
  { immediate: true },
);

function blankForm() {
  return {
    name: '',
    service: '',
    branch: 'main',
    environment: 'Staging',
    region: 'us-east',
    owner: SIGNED_IN_USER.name,
    durationMin: 5,
    success: 95,
    started: '2026-10-14',
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
  if (item.id === 'new-pipeline') {
    store.setPipelineOpen(true);
    return;
  }
  router.push(item.to);
}

function submitPipeline() {
  const record = store.addPipeline(form.value);
  if (!record) {
    showToast({
      title: 'Name required',
      description: 'Name the pipeline before it joins the board.',
      variant: 'warning',
    });
    return;
  }
  showToast({
    title: 'Pipeline started',
    description: `${record.name} is owned by ${record.owner}.`,
    variant: 'success',
  });
  form.value = blankForm();
  router.push(`${BASE_PATH}/pipelines/${record.id}`);
}
</script>

<template>
  <header class="tde-header">
    <div class="tde-header-inner">
      <div class="tde-header-start">
        <Button
          class="tde-menu-btn"
          variant="tertiary"
          size="sm"
          icon="menu"
          icon-only
          accessible-label="Open navigation"
          @click="emit('menu-toggle')"
        />
        <div class="tde-header-brand">
          <span class="tde-mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" width="28" height="28">
              <rect width="32" height="32" rx="8" fill="#086288" />
              <path d="M8 10h10l4 6-4 6H8l4-6-4-6z" fill="#ffffff" />
            </svg>
          </span>
          <div>
            <strong>{{ APP_NAME }}</strong>
            <span>{{ APP_TAGLINE }}</span>
          </div>
        </div>
      </div>

      <label class="tde-inset-search">
        <Icon name="search" size="sm" decorative />
        <VisuallyHidden>Search pipelines, environments, and deploys</VisuallyHidden>
        <input
          v-model="query"
          type="search"
          placeholder="Search pipelines, owners, deploys"
          aria-label="Search pipelines, owners, deploys"
          @keydown.enter.prevent="goSearch"
        />
        <Tooltip content="Open the command palette">
          <button type="button" class="tde-kbd-btn" aria-label="Command palette" @click="setPaletteOpen(true)">
            <Kbd>⌘K</Kbd>
          </button>
        </Tooltip>
      </label>

      <div class="tde-header-end">
        <button type="button" class="tde-deploy-pill" @click="router.push(`${BASE_PATH}/deployments`)">
          <Icon name="upload" size="sm" decorative />
          <span>{{ store.inFlight.length }} in flight</span>
        </button>
        <Tooltip content="Notifications">
          <span class="tde-notify-wrap">
            <Button
              variant="tertiary"
              size="sm"
              icon="bell"
              icon-only
              accessible-label="Notifications"
              @click="notifyOpen = true"
            />
            <span v-if="notifications.unread" class="tde-notify-count">{{ notifications.unread }}</span>
          </span>
        </Tooltip>
        <Button size="sm" icon="plus" @click="store.setPipelineOpen(true)">Start pipeline</Button>
      </div>
    </div>
  </header>

  <Modal :open="paletteOpen" heading="Jump to anything" @update:open="setPaletteOpen">
    <label class="tde-palette-search">
      Search pages and actions
      <input v-model="paletteQuery" placeholder="Pipelines, uptime, deploys…" />
    </label>
    <ul class="tde-palette-list">
      <li v-for="item in paletteHits" :key="item.id">
        <button type="button" @click="goCommand(item)">
          <strong>{{ item.label }}</strong>
          <span>{{ item.hint }}</span>
        </button>
      </li>
    </ul>
  </Modal>

  <Drawer v-model:open="notifyOpen" :heading="`${notifications.unread} unread notes`" size="md">
    <p class="tde-subtle">{{ SIGNED_IN_USER.name }} · Weekday board</p>
    <ul class="tde-notify-list">
      <li v-for="item in notifications.items" :key="item.id">
        <button type="button" class="tde-notify-item" @click="notifyOpen = false; router.push(item.href)">
          <strong>{{ item.title }}</strong>
          <p>{{ item.body }}</p>
          <span>{{ formatDateTime(item.time) }}</span>
        </button>
      </li>
    </ul>
  </Drawer>

  <Modal :open="store.pipelineOpen" heading="Start pipeline" @update:open="(open) => store.setPipelineOpen(open)">
    <div class="tde-form-grid">
      <Input v-model="form.name" class="full" label="Pipeline name" placeholder="Checkout API" required />
      <Input v-model="form.service" label="Service" placeholder="checkout" />
      <Select v-model="form.branch" label="Branch" :options="BRANCH_OPTIONS" />
      <Combobox v-model="form.environment" label="Environment" :options="ENV_OPTIONS" placeholder="Where it ships" />
      <Select v-model="form.region" label="Region" :options="REGION_OPTIONS" />
      <Autocomplete v-model="form.owner" label="Owner" :options="OWNER_OPTIONS" />
      <NumberInput v-model="form.durationMin" label="Typical minutes" :min="1" :step="1" />
      <DatePicker v-model="form.started" class="full" label="First run" />
      <Slider v-model="form.success" class="full" label="Success" :min="0" :max="100" :step="1" show-value />
      <Textarea v-model="form.description" class="full" label="Description" placeholder="What this pipeline ships." />
    </div>
    <template #footer>
      <Button variant="secondary" @click="store.setPipelineOpen(false)">Cancel</Button>
      <Button icon="save" @click="submitPipeline">Save pipeline</Button>
    </template>
  </Modal>
</template>
