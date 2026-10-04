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
  CONTROL_STATUS_OPTIONS,
  DOMAIN_OPTIONS,
  FRAMEWORK_OPTIONS,
  NAV_GROUPS,
  OWNER_OPTIONS,
  SIGNED_IN_USER,
} from '../../constants/navigation.js';
import notifications from '../../data/notifications.json';
import { useCompliance } from '../../stores/compliance.js';
import { formatDate, formatDateTime } from '../../utils/format.js';

defineProps({
  open: { type: Boolean, default: false },
});

const emit = defineEmits(['navigate']);
const route = useRoute();
const router = useRouter();
const store = useCompliance();
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

const liveCount = computed(() => store.effectiveControls.length);
const dueCount = computed(() => store.dueAudits.length);
const coverage = computed(() => store.coverage);

watch(
  () => route.query.new,
  (value) => {
    if (value === '1') store.setControlOpen(true);
  },
  { immediate: true },
);

function isActive(to) {
  if (to.endsWith('/controls') || to.endsWith('/audits')) {
    return route.path === to || route.path.startsWith(`${to}/`);
  }
  return route.path === to;
}

function go(to) {
  emit('navigate');
  router.push(to);
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
  emit('navigate');
  router.push(`${BASE_PATH}/controls/${record.id}`);
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
  <aside class="aeg-sidebar" :class="{ 'is-open': open }" aria-label="Aegis">
    <div class="aeg-brand">
      <span class="aeg-mark aeg-mark-sidebar" aria-hidden="true">
        <i class="bi bi-shield-check"></i>
      </span>
      <div class="aeg-brand-copy">
        <strong>{{ APP_NAME }}</strong>
        <span>{{ APP_TAGLINE }}</span>
      </div>
    </div>

    <div class="aeg-sidebar-add">
      <Button size="sm" icon="plus" @click="store.setControlOpen(true)">Add control</Button>
    </div>

    <div class="aeg-sidebar-nav">
      <div v-for="group in NAV_GROUPS" :key="group.label">
        <p class="aeg-nav-label">{{ group.label }}</p>
        <nav class="aeg-nav">
          <RouterLink
            v-for="item in group.items"
            :key="item.to"
            :to="item.to"
            class="aeg-nav-link"
            :class="{ 'is-active': isActive(item.to) }"
            @click="emit('navigate')"
          >
            <i :class="`bi ${item.icon}`" aria-hidden="true" />
            <span>{{ item.label }}</span>
          </RouterLink>
        </nav>
      </div>
    </div>

    <div class="aeg-sidebar-tools">
      <button type="button" class="aeg-due-chip" aria-label="Open upcoming audits" @click="go(`${BASE_PATH}/audits`)">
        <i class="bi bi-calendar-event" aria-hidden="true" />
        <span>
          <strong>{{ dueCount }} audits due</strong>
          <small>Next {{ formatDate(store.dueAudits[0]?.end) }}</small>
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

    <div class="aeg-sidebar-foot">
      <div class="aeg-sidebar-actions">
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
          <MenuItem label="Sign out" value="signout" danger @select="onMenuSelect" />
        </DropdownMenu>
      </div>
      <div class="aeg-health-chip">
        <span class="aeg-pulse" />
        {{ liveCount }} controls effective
      </div>
      <p>Mock fixtures · last sync 4 min ago</p>
    </div>
  </aside>

  <Drawer v-model:open="notifyOpen" :heading="`${notifications.unread} unread alerts`" size="md">
    <p class="aeg-subtle">Kavya Poluru · last sync 4 min ago</p>
    <ul class="aeg-notify-list">
      <li v-for="item in notifications.items" :key="item.id">
        <button
          type="button"
          class="aeg-notify-item"
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
