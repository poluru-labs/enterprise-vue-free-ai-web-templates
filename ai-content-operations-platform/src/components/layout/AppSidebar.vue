<script setup>
import { computed, ref, watch } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import {
  Autocomplete,
  Avatar,
  Button,
  DatePicker,
  Drawer,
  DropdownMenu,
  Input,
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
  CHANNEL_OPTIONS,
  NAV_GROUPS,
  OWNER_OPTIONS,
  SIGNED_IN_USER,
  STATUS_OPTIONS,
  TYPE_OPTIONS,
} from '../../constants/navigation.js';
import notifications from '../../data/notifications.json';
import { useContent } from '../../stores/content.js';
import { formatDate, formatDateTime } from '../../utils/format.js';

defineProps({
  open: { type: Boolean, default: false },
});

const emit = defineEmits(['navigate']);
const route = useRoute();
const router = useRouter();
const store = useContent();
const notifyOpen = ref(false);
const menuOpen = ref(false);
const form = ref({
  title: '',
  code: '',
  type: 'Article',
  channel: 'Web',
  owner: SIGNED_IN_USER.name,
  reviewer: 'Tara Poluru',
  status: 'draft',
  score: 40,
  words: 400,
  publishOn: '2026-10-18',
  notes: '',
});

const reviewCount = computed(() => store.reviews.length);
const fill = computed(() => store.calendarFill);

watch(
  () => route.query.new,
  (value) => {
    if (value === '1') store.setBriefOpen(true);
  },
  { immediate: true },
);

function isActive(to) {
  if (to.endsWith('/drafts')) {
    return route.path === to || route.path.startsWith(`${to}/`);
  }
  return route.path === to;
}

function go(to) {
  emit('navigate');
  router.push(to);
}

function submitBrief() {
  const record = store.addPiece(form.value);
  if (!record) {
    showToast({
      title: 'Title required',
      description: 'Name the brief before it can join the desk.',
      variant: 'warning',
    });
    return;
  }
  showToast({
    title: 'Brief added',
    description: `${record.code} is with ${record.owner}.`,
    variant: 'success',
  });
  form.value = {
    title: '',
    code: '',
    type: 'Article',
    channel: 'Web',
    owner: SIGNED_IN_USER.name,
    reviewer: 'Tara Poluru',
    status: 'draft',
    score: 40,
    words: 400,
    publishOn: '2026-10-18',
    notes: '',
  };
  emit('navigate');
  router.push(`${BASE_PATH}/drafts/${record.id}`);
}

function onMenuSelect(item) {
  menuOpen.value = false;
  if (item.value === 'settings') go(`${BASE_PATH}/settings`);
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
  <aside class="flo-sidebar" :class="{ 'is-open': open }" aria-label="Folio">
    <div class="flo-brand">
      <span class="flo-mark flo-mark-sidebar" aria-hidden="true">
        <i class="bi bi-type"></i>
      </span>
      <div class="flo-brand-copy">
        <strong>{{ APP_NAME }}</strong>
        <span>{{ APP_TAGLINE }}</span>
      </div>
    </div>

    <div class="flo-sidebar-add">
      <Button size="sm" icon="plus" @click="store.setBriefOpen(true)">New brief</Button>
    </div>

    <div class="flo-sidebar-nav">
      <div v-for="group in NAV_GROUPS" :key="group.label">
        <p class="flo-nav-label">{{ group.label }}</p>
        <nav class="flo-nav">
          <RouterLink
            v-for="item in group.items"
            :key="item.to"
            :to="item.to"
            class="flo-nav-link"
            :class="{ 'is-active': isActive(item.to) }"
            @click="emit('navigate')"
          >
            <i :class="`bi ${item.icon}`" aria-hidden="true" />
            <span>{{ item.label }}</span>
          </RouterLink>
        </nav>
      </div>
    </div>

    <div class="flo-sidebar-tools">
      <button type="button" class="flo-due-chip" @click="go(`${BASE_PATH}/reviews`)">
        <i class="bi bi-inboxes" aria-hidden="true" />
        <span>
          <strong>{{ reviewCount }} in review</strong>
          <small>Next {{ formatDate(store.reviews[0]?.publishOn) }}</small>
        </span>
      </button>
      <div class="flo-coverage">
        <div class="flo-coverage-copy">
          <span>Calendar fill</span>
          <strong>{{ fill }}%</strong>
        </div>
        <div class="flo-coverage-track" aria-hidden="true">
          <div class="flo-coverage-fill" :style="{ width: `${fill}%` }" />
        </div>
      </div>
    </div>

    <div class="flo-sidebar-foot">
      <div class="flo-sidebar-actions">
        <div class="flo-notify-wrap">
          <Button
            variant="tertiary"
            size="sm"
            icon="bell"
            icon-only
            accessible-label="Notifications"
            @click="notifyOpen = true"
          />
          <span v-if="notifications.unread" class="flo-notify-count" aria-hidden="true">
            {{ notifications.unread }}
          </span>
        </div>
        <DropdownMenu v-model:open="menuOpen">
          <template #trigger>
            <button type="button" class="flo-profile" :title="`${SIGNED_IN_USER.name} · ${SIGNED_IN_USER.role}`">
              <Avatar :name="SIGNED_IN_USER.name" size="sm" />
              <div class="flo-profile-copy">
                <strong>{{ SIGNED_IN_USER.name }}</strong>
                <span>{{ SIGNED_IN_USER.role }}</span>
              </div>
            </button>
          </template>
          <MenuItem label="Folio settings" value="settings" @select="onMenuSelect" />
          <MenuItem label="Sign out" value="signout" danger @select="onMenuSelect" />
        </DropdownMenu>
      </div>
      <div class="flo-health-chip">
        <span class="flo-pulse" />
        {{ store.published.length }} pieces live
      </div>
      <p>Mock fixtures · last sync 3 min ago</p>
    </div>
  </aside>

  <Drawer v-model:open="notifyOpen" :heading="`${notifications.unread} unread alerts`" size="md">
    <p class="flo-subtle">Ananya Poluru · last sync 3 min ago</p>
    <ul class="flo-notify-list">
      <li v-for="item in notifications.items" :key="item.id">
        <button
          type="button"
          class="flo-notify-item"
          :class="`tone-${item.tone}`"
          @click="notifyOpen = false; go(item.href)"
        >
          <strong>{{ item.title }}</strong>
          <p>{{ item.body }}</p>
          <span>{{ formatDateTime(item.time) }}</span>
        </button>
      </li>
    </ul>
  </Drawer>

  <Modal :open="store.briefOpen" heading="New brief" @update:open="(open) => store.setBriefOpen(open)">
    <div class="flo-form-grid">
      <Input class="full" v-model="form.title" label="Title" placeholder="Launch week recap" required />
      <Input v-model="form.code" label="Code" placeholder="WEB-17" />
      <Select v-model="form.type" label="Type" :options="TYPE_OPTIONS" />
      <Select v-model="form.channel" label="Channel" :options="CHANNEL_OPTIONS" />
      <Autocomplete v-model="form.owner" label="Owner" :options="OWNER_OPTIONS" />
      <Select v-model="form.status" label="Status" :options="STATUS_OPTIONS" />
      <NumberInput v-model="form.score" label="Readiness" :min="0" :max="100" :step="1" />
      <DatePicker v-model="form.publishOn" label="Publish on" />
      <Textarea class="full" v-model="form.notes" label="Notes" placeholder="Angle, audience, or asset gaps." />
    </div>
    <template #footer>
      <Button variant="secondary" @click="store.setBriefOpen(false)">Cancel</Button>
      <Button @click="submitBrief">Save brief</Button>
    </template>
  </Modal>
</template>
