<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import {
  Autocomplete,
  Avatar,
  Button,
  Combobox,
  DatePicker,
  Divider,
  Drawer,
  DropdownMenu,
  EdsThemeProvider,
  EmptyState,
  FileUpload,
  Input,
  Kbd,
  List,
  MenuItem,
  Modal,
  NumberInput,
  Popover,
  Search,
  Select,
  SideNav,
  Textarea,
  TimePicker,
  ToastProvider,
  Toolbar,
  Tooltip,
  showToast,
} from '@poluru-labs/enterprise-design-system-vue';
import {
  accountOptions,
  commands,
  currentUser,
  leads,
  navItems,
  notifications,
  ownerOptions,
  quickLinks,
  sourceOptions,
  stageOptions,
} from './data';
import { go, route, ui } from './ui';
import Overview from './pages/Overview.vue';
import Pipeline from './pages/Pipeline.vue';
import Deals from './pages/Deals.vue';
import DealDetail from './pages/DealDetail.vue';
import Leads from './pages/Leads.vue';
import Accounts from './pages/Accounts.vue';
import AccountDetail from './pages/AccountDetail.vue';
import Activities from './pages/Activities.vue';
import Reports from './pages/Reports.vue';
import Settings from './pages/Settings.vue';

const menuOpen = ref(false);
const notesOpen = ref(false);
const dealName = ref('');
const dealAccount = ref('acc_harbor');
const dealOwner = ref('priya');
const dealStage = ref('Qualify');
const dealAmount = ref(48000);
const dealSource = ref('inbound');
const activityDate = ref('2026-08-27');
const activityTime = ref('16:30');
const activityNotes = ref('');
const convertOwner = ref('priya');

const sideItems = computed(() =>
  navItems.map((item) => ({
    ...item,
    active: route.value.name === item.id,
  })),
);

const filteredCommands = computed(() => {
  const q = ui.query.trim().toLowerCase();
  if (!q) return commands;
  return commands.filter((item) => item.label.toLowerCase().includes(q));
});

const pages = {
  overview: Overview,
  pipeline: Pipeline,
  deals: Deals,
  deal: DealDetail,
  leads: Leads,
  accounts: Accounts,
  account: AccountDetail,
  activities: Activities,
  reports: Reports,
  settings: Settings,
};

const page = computed(() => pages[route.value.name] || Overview);

function syncHash() {
  ui.hash = window.location.hash || '#/overview';
}

function onKey(event) {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    ui.commandOpen = true;
  }
}

function runCommand(href) {
  ui.commandOpen = false;
  ui.query = '';
  go(href);
}

function openQuick(id) {
  if (id === 'ql-deal') ui.dealOpen = true;
  if (id === 'ql-call') ui.activityOpen = true;
  if (id === 'ql-lead') ui.leadOpen = true;
}

function createDeal() {
  if (!dealName.value.trim()) {
    showToast({ title: 'Name required', description: 'Give the opportunity a title first.', variant: 'warning' });
    return;
  }
  ui.dealOpen = false;
  showToast({
    title: 'Deal created',
    description: `${dealName.value} is owned by ${ownerOptions.find((item) => item.value === dealOwner.value)?.label}.`,
    variant: 'success',
  });
  dealName.value = '';
  go('#/pipeline');
}

function logActivity() {
  ui.activityOpen = false;
  showToast({
    title: 'Activity logged',
    description: `Saved for ${activityDate.value} at ${activityTime.value}.`,
    variant: 'success',
  });
  activityNotes.value = '';
}

function convertLead() {
  const lead = leads.find((item) => item.id === ui.selectedLead);
  ui.leadOpen = false;
  showToast({
    title: 'Lead converted',
    description: `${lead?.name || 'Lead'} is now a discovery deal.`,
    variant: 'success',
  });
  go('#/deals');
}

function onMenu(item) {
  menuOpen.value = false;
  if (item.value === 'settings') go('#/settings');
  if (item.value === 'signout') {
    showToast({ title: 'Signed out', description: 'Priya Poluru ended the Bloom session.', variant: 'info' });
  }
}

onMounted(() => {
  if (!window.location.hash) window.location.hash = '#/overview';
  syncHash();
  window.addEventListener('hashchange', syncHash);
  window.addEventListener('keydown', onKey);
});

onBeforeUnmount(() => {
  window.removeEventListener('hashchange', syncHash);
  window.removeEventListener('keydown', onKey);
});
</script>

<template>
  <EdsThemeProvider default-theme="light">
    <ToastProvider>
      <a class="skip-link" href="#main">Skip to content</a>
      <div class="shell">
        <aside class="sidebar">
          <a class="brand" href="#/overview">
            <span class="brand-mark" aria-hidden="true">B</span>
            <span>
              <small>Poluru Cloud</small>
              <strong>Bloom CRM</strong>
            </span>
          </a>
          <SideNav class="sidebar-nav" :items="sideItems" />
          <div class="quick">
            <p class="quick-label">Quick links</p>
            <List :items="quickLinks" divided />
            <div class="stack" style="margin-top: 0.55rem">
              <Button size="sm" icon="plus" @click="openQuick('ql-deal')">New deal</Button>
              <Button size="sm" variant="secondary" icon="mail" @click="openQuick('ql-call')">Log a call</Button>
              <Button size="sm" variant="tertiary" icon="user" @click="openQuick('ql-lead')">Convert lead</Button>
            </div>
          </div>
          <DropdownMenu v-model:open="menuOpen" placement="top">
            <template #trigger>
              <button class="profile" type="button">
                <Avatar :name="currentUser.name" size="md" />
                <span>
                  <strong>{{ currentUser.name }}</strong>
                  <small>{{ currentUser.role }}</small>
                </span>
              </button>
            </template>
            <MenuItem value="profile" label="View profile" @select="onMenu" />
            <MenuItem value="settings" label="Preferences" @select="onMenu" />
            <MenuItem value="signout" label="Sign out" danger @select="onMenu" />
          </DropdownMenu>
        </aside>

        <div class="workspace">
          <Toolbar class="topbar">
            <div class="search-wrap">
              <Search v-model="ui.query" placeholder="Search deals, people, accounts…" @submit="ui.commandOpen = true" />
            </div>
            <template #end>
              <div class="topbar-end">
                <Tooltip content="Open command palette">
                  <button type="button" class="profile" style="width: auto; gap: 0.4rem" @click="ui.commandOpen = true">
                    <Kbd :keys="['⌘', 'K']" />
                  </button>
                </Tooltip>
                <Popover v-model:open="notesOpen" heading="Inbox" placement="bottom">
                  <template #trigger>
                    <Button variant="secondary" icon="bell" icon-only accessible-label="Notifications" />
                  </template>
                  <List
                    :items="notifications.map((item) => ({ id: item.id, label: item.title, description: `${item.body} · ${item.time}`, icon: 'bell' }))"
                    divided
                  />
                </Popover>
                <Button icon="plus" @click="ui.dealOpen = true">New deal</Button>
              </div>
            </template>
          </Toolbar>
          <main id="main" class="content">
            <component :is="page" @create-deal="ui.dealOpen = true" @log-activity="ui.activityOpen = true" @convert-lead="ui.leadOpen = true" />
          </main>
        </div>
      </div>

      <Modal v-model:open="ui.commandOpen" heading="Jump to anything">
        <Search v-model="ui.query" placeholder="Type a deal, person, or page" />
        <EmptyState v-if="!filteredCommands.length" title="No matches" description="Try Harbor, Nimbus, or a person’s last name." icon="search" />
        <div v-else class="cmd-list">
          <a v-for="item in filteredCommands" :key="item.id" :href="item.href" @click.prevent="runCommand(item.href)">
            {{ item.label }}
          </a>
        </div>
      </Modal>

      <Modal v-model:open="ui.dealOpen" heading="Create opportunity">
        <div class="form-grid">
          <Input class="full" v-model="dealName" label="Deal name" placeholder="Harbor expansion" required />
          <Combobox v-model="dealAccount" label="Account" :options="accountOptions" />
          <Autocomplete v-model="dealOwner" label="Owner" :options="ownerOptions" />
          <Select v-model="dealStage" label="Stage" :options="stageOptions" />
          <Select v-model="dealSource" label="Source" :options="sourceOptions" />
          <NumberInput v-model="dealAmount" label="Amount" :min="0" :step="1000" hint="USD" />
        </div>
        <template #footer>
          <Button variant="secondary" @click="ui.dealOpen = false">Cancel</Button>
          <Button @click="createDeal">Save deal</Button>
        </template>
      </Modal>

      <Drawer v-model:open="ui.activityOpen" heading="Log activity" size="md">
        <div class="stack">
          <Select v-model="dealStage" label="Type" :options="[{ value: 'Call', label: 'Call' }, { value: 'Meeting', label: 'Meeting' }, { value: 'Task', label: 'Task' }]" />
          <DatePicker v-model="activityDate" label="Date" />
          <TimePicker v-model="activityTime" label="Time" />
          <Textarea v-model="activityNotes" label="Notes" placeholder="What did Meera Poluru agree to?" />
          <FileUpload label="Attach a file" hint="Deck, redlines, or security questionnaire" />
        </div>
        <template #footer>
          <Button variant="secondary" @click="ui.activityOpen = false">Cancel</Button>
          <Button @click="logActivity">Save activity</Button>
        </template>
      </Drawer>

      <Drawer v-model:open="ui.leadOpen" heading="Convert lead" size="md">
        <div class="stack">
          <Select
            v-model="ui.selectedLead"
            label="Lead"
            :options="leads.map((item) => ({ value: item.id, label: `${item.name} · ${item.company}` }))"
          />
          <Autocomplete v-model="convertOwner" label="Deal owner" :options="ownerOptions" />
          <Divider />
          <p class="note">Bloom keeps Priya Poluru on the account team and opens a discovery deal at 20% probability.</p>
        </div>
        <template #footer>
          <Button variant="secondary" @click="ui.leadOpen = false">Cancel</Button>
          <Button @click="convertLead">Convert</Button>
        </template>
      </Drawer>
    </ToastProvider>
  </EdsThemeProvider>
</template>
