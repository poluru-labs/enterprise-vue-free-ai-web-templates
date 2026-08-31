<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import {
  Accordion,
  Alert,
  Autocomplete,
  Avatar,
  Badge,
  Button,
  Card,
  CircularProgress,
  DataTable,
  DatePicker,
  DropdownMenu,
  EdsThemeProvider,
  EmptyState,
  Input,
  Kbd,
  List,
  MenuItem,
  Meter,
  Modal,
  NumberInput,
  Pagination,
  Popover,
  ProgressBar,
  Search,
  SegmentedControl,
  Select,
  SideNav,
  Stat,
  Status,
  Tabs,
  Tag,
  Textarea,
  Timeline,
  Toolbar,
  Tooltip,
  ToastProvider,
  setEdsTheme,
  showToast,
} from '@poluru-labs/enterprise-design-system-vue';
import {
  agenda,
  atRisk,
  currentUser,
  kpis,
  navItems,
  notifications,
  ownerOptions,
  pipelineMonths,
  playbooks,
  priorityOptions,
  priorityVariant,
  requestColumns,
  requests,
  sparkPoints,
  statusTone,
  teamBoard,
  timelineItems,
  typeOptions,
} from './data';

const query = ref('');
const profileOpen = ref(false);
const notifOpen = ref(false);
const requestOpen = ref(false);
const commandOpen = ref(false);
const commandQuery = ref('');
const isDark = ref(false);
const range = ref('month');
const coachTab = ref('commit');
const requestTab = ref('all');
const ownerFilter = ref('all');
const page = ref(1);
const perPage = 4;

const spark = sparkPoints(pipelineMonths);
const notificationItems = ref(notifications.map((item) => ({ ...item, read: false })));
const unreadCount = computed(() => notificationItems.value.filter((item) => !item.read).length);

const requestTitle = ref('');
const requestType = ref('feature');
const requestPriority = ref('medium');
const requestOwner = ref('meera');
const requestDue = ref('2026-09-15');
const requestEstimate = ref(3);
const requestNotes = ref('');

const ownerFilterOptions = computed(() => [{ value: 'all', label: 'All owners' }, ...ownerOptions]);

const quickActions = [
  { id: 'new-request', label: 'Add feature or enhancement', action: () => { requestOpen.value = true; } },
  { id: 'toggle-theme', label: 'Toggle light / dark theme', action: () => toggleTheme() },
];

const filteredCommands = computed(() => {
  const q = commandQuery.value.trim().toLowerCase();
  const navMatches = navItems.filter((item) => !q || item.label.toLowerCase().includes(q));
  const actionMatches = quickActions.filter((item) => !q || item.label.toLowerCase().includes(q));
  return [...navMatches, ...actionMatches];
});

const filteredRequests = computed(() => {
  const list = requestTab.value === 'all' ? requests : requests.filter((item) => item.type.toLowerCase() === requestTab.value);
  const ownerOk = (item) => ownerFilter.value === 'all' || item.owner === ownerFilterOptions.value.find((o) => o.value === ownerFilter.value)?.label;
  const q = query.value.trim().toLowerCase();
  return list.filter((item) => ownerOk(item) && (!q || `${item.title} ${item.owner}`.toLowerCase().includes(q)));
});

const pagedRequests = computed(() => {
  const start = (page.value - 1) * perPage;
  return filteredRequests.value.slice(start, start + perPage);
});

function markAllRead() {
  notificationItems.value.forEach((item) => {
    item.read = true;
  });
}

function toggleTheme() {
  isDark.value = !isDark.value;
  setEdsTheme(isDark.value ? 'dark' : 'light');
}

function runCommand(item) {
  commandOpen.value = false;
  commandQuery.value = '';
  if (item.action) {
    item.action();
  } else if (item.href) {
    window.location.hash = item.href;
  }
}

function exportRequestsCsv() {
  const header = requestColumns.map((c) => c.label).join(',');
  const rows = filteredRequests.value.map((row) => requestColumns.map((c) => `"${String(row[c.key]).replace(/"/g, '""')}"`).join(','));
  const blob = new Blob([[header, ...rows].join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'sales-requests.csv';
  link.click();
  URL.revokeObjectURL(url);
  showToast({ title: 'Exported', description: 'Feature and enhancement requests exported to CSV.', variant: 'success' });
}

function newDeal() {
  showToast({ title: 'New deal', description: 'Deal composer opened.', variant: 'info' });
}

function onKey(event) {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    commandOpen.value = true;
  }
}

onMounted(() => window.addEventListener('keydown', onKey));
onBeforeUnmount(() => window.removeEventListener('keydown', onKey));

function submitRequest() {
  if (!requestTitle.value.trim()) {
    showToast({ title: 'Title required', description: 'Give the request a short title first.', variant: 'warning' });
    return;
  }
  requestOpen.value = false;
  showToast({
    title: 'Request added',
    description: `${requestTitle.value} was added to the enhancements board.`,
    variant: 'success',
  });
  requestTitle.value = '';
  requestNotes.value = '';
}

function onMenu(item) {
  profileOpen.value = false;
  if (item.value === 'signout') {
    showToast({ title: 'Signed out', description: 'Priya Poluru ended the session.', variant: 'info' });
  }
}
</script>

<template>
  <EdsThemeProvider default-theme="light">
    <ToastProvider>
      <a class="skip-link" href="#main">Skip to content</a>
      <div class="shell">
        <header class="topbar">
          <Toolbar>
            <div class="topbar-start">
              <a class="brand" href="#overview">
                <span class="brand-mark" aria-hidden="true">
                  <i class="bi bi-bar-chart-line"></i>
                </span>
                <strong>AI Sales Ops</strong>
              </a>
              <div class="search-wrap">
                <Search v-model="query" placeholder="Search deals, people, requests…" />
              </div>
            </div>
            <template #end>
              <div class="topbar-end">
                <Tooltip content="Toggle theme">
                  <button type="button" class="icon-btn theme-btn" :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'" @click="toggleTheme">
                    <i :class="isDark ? 'bi bi-sun' : 'bi bi-moon-stars'"></i>
                  </button>
                </Tooltip>
                <Tooltip content="Command palette · ⌘K">
                  <button type="button" class="icon-btn" aria-label="Command palette" @click="commandOpen = true">
                    <Kbd :keys="['⌘', 'K']" />
                  </button>
                </Tooltip>
                <DropdownMenu placement="bottom-end">
                  <template #trigger>
                    <Button icon="plus" variant="primary">Add new</Button>
                  </template>
                  <MenuItem value="feature" label="New feature request" @select="requestOpen = true" />
                  <MenuItem value="enhancement" label="New enhancement" @select="requestOpen = true" />
                  <MenuItem value="deal" label="New deal" @select="newDeal" />
                </DropdownMenu>
                <Popover v-model:open="notifOpen" heading="Inbox" placement="bottom">
                  <template #trigger>
                    <button type="button" class="icon-btn" aria-label="Notifications">
                      <Button variant="secondary" icon="bell" icon-only accessible-label="Notifications" />
                      <span v-if="unreadCount" class="notif-badge">{{ unreadCount }}</span>
                    </button>
                  </template>
                  <div class="row" style="justify-content: space-between; margin-bottom: 0.5rem">
                    <span class="muted">{{ unreadCount }} unread</span>
                    <Button size="sm" variant="tertiary" :disabled="!unreadCount" @click="markAllRead">Mark all read</Button>
                  </div>
                  <List
                    :items="notificationItems.map((item) => ({ id: item.id, label: item.read ? item.title : `● ${item.title}`, description: `${item.body} · ${item.time}`, icon: 'bell' }))"
                    divided
                  />
                </Popover>
                <DropdownMenu v-model:open="profileOpen" placement="bottom-end">
                  <template #trigger>
                    <button class="profile" type="button">
                      <Avatar :name="currentUser.name" size="sm" />
                      <span class="profile-text">
                        <strong>{{ currentUser.name }}</strong>
                        <small>{{ currentUser.role }}</small>
                      </span>
                    </button>
                  </template>
                  <MenuItem value="profile" label="View profile" />
                  <MenuItem value="settings" label="Preferences" />
                  <MenuItem value="signout" label="Sign out" danger @select="onMenu" />
                </DropdownMenu>
              </div>
            </template>
          </Toolbar>
        </header>

        <div class="body">
          <aside class="sidebar">
            <SideNav :items="navItems.map((item, i) => ({ ...item, active: i === 0 }))" />
          </aside>

          <main id="main" class="main">
            <header class="page-header" id="overview">
              <div>
                <span class="eyebrow">Revenue ops</span>
                <h1>AI Sales Ops</h1>
                <p>Forecast, coverage, and deal hygiene for the sales operations team.</p>
              </div>
              <Button icon="plus" @click="requestOpen = true">New request</Button>
            </header>

            <Alert
              class="mb-4"
              variant="info"
              title="Next best action"
              message="Book 15 minutes with Meera Poluru before 17:00 — Harbor Labs' $184k expansion stays in commit if legal moves today."
            />

            <section class="metrics" aria-label="Key metrics">
              <Card v-for="item in kpis" :key="item.label">
                <Stat :label="item.label" :value="item.value" :hint="item.hint" :trend="item.trend" :trend-value="item.trendValue" />
              </Card>
            </section>

            <div class="grid-2" id="forecast">
              <div class="stack">
                <Card title="Pipeline pulse" description="Trailing twelve months · $4.86M open">
                  <div class="row" style="justify-content: space-between; margin-bottom: 0.5rem">
                    <SegmentedControl
                      v-model="range"
                      :segments="[
                        { value: 'week', label: 'Week' },
                        { value: 'month', label: 'Month' },
                        { value: 'quarter', label: 'Quarter' },
                      ]"
                    />
                  </div>
                  <svg class="spark" viewBox="0 0 220 56" aria-hidden="true">
                    <polyline :points="spark" />
                    <circle cx="220" cy="4" r="3.5" />
                  </svg>
                  <ProgressBar label="Quota attained" :value="78" show-value />
                  <Meter class="mt-3" label="Commit coverage" :value="1.4" :min="0" :max="3" :low="1" :high="2" :optimum="2" show-value />
                </Card>
                <Card title="Team board" id="coverage">
                  <div class="stack">
                    <div v-for="rep in teamBoard" :key="rep.name" class="row" style="justify-content: space-between">
                      <div class="row" style="gap: 0.6rem">
                        <Avatar :name="rep.name" size="sm" />
                        <div>
                          <strong>{{ rep.name }}</strong>
                          <div class="muted">{{ rep.closed }} closed · {{ rep.pipeline }} pipeline</div>
                        </div>
                      </div>
                      <Badge :label="`${rep.quota}%`" :variant="rep.quota >= 70 ? 'success' : 'warning'" pill />
                    </div>
                  </div>
                </Card>
              </div>
              <div class="stack">
                <Card title="AI coaching" description="Next actions for Priya Poluru this afternoon" id="hygiene">
                  <Tabs
                    class="coach-tabs"
                    v-model="coachTab"
                    :items="[
                      { id: 'commit', label: 'Commit' },
                      { id: 'risk', label: 'At risk' },
                      { id: 'motion', label: 'Motion' },
                    ]"
                  >
                    <template #default="{ active }">
                      <div v-if="active === 'commit'" class="stack">
                        <p class="note">Keep Harbor Labs and Fieldwork Co in commit. Weighted coverage is 1.4×.</p>
                        <Accordion :items="playbooks" id="playbooks" />
                      </div>
                      <List v-else-if="active === 'risk'" :items="atRisk" divided />
                      <Timeline v-else :items="timelineItems.slice(0, 3)" />
                    </template>
                  </Tabs>
                </Card>
                <Card title="Today">
                  <div class="stack">
                    <div v-for="item in agenda" :key="item.id" class="row" style="justify-content: space-between">
                      <div>
                        <strong>{{ item.title }}</strong>
                        <div class="muted">{{ item.with }} · {{ item.time }}</div>
                      </div>
                      <Status :label="item.type" :tone="item.type === 'Task' ? 'warning' : 'info'" />
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            <Card class="mt-4" title="Feature &amp; enhancement requests" description="Roadmap for sales ops tooling" id="enhancements">
              <div class="row" style="justify-content: space-between; margin-bottom: 0.85rem; flex-wrap: wrap; gap: 0.6rem">
                <Tabs
                  v-model="requestTab"
                  :items="[
                    { id: 'all', label: 'All' },
                    { id: 'feature', label: 'Features' },
                    { id: 'enhancement', label: 'Enhancements' },
                    { id: 'fix', label: 'Fixes' },
                  ]"
                />
                <div class="row" style="gap: 0.5rem; flex-wrap: wrap">
                  <div style="min-width: 14rem">
                    <Search v-model="query" placeholder="Search requests" />
                  </div>
                  <Select v-model="ownerFilter" :options="ownerFilterOptions" style="min-width: 10rem" />
                  <Button icon="download" variant="secondary" :disabled="!filteredRequests.length" @click="exportRequestsCsv">Export CSV</Button>
                  <Button icon="plus" variant="secondary" @click="requestOpen = true">Add request</Button>
                </div>
              </div>

              <EmptyState v-if="!filteredRequests.length" title="No requests found" description="Try another tab or clear search." icon="search" />
              <template v-else>
                <DataTable :columns="requestColumns" :rows="pagedRequests" sortable striped>
                  <template #cell-type="{ row }">
                    <Tag :label="row.type" variant="brand" />
                  </template>
                  <template #cell-priority="{ row }">
                    <Tag :label="row.priority" :variant="priorityVariant(row.priority)" />
                  </template>
                  <template #cell-status="{ row }">
                    <Status :label="row.status" :tone="statusTone(row.status)" />
                  </template>
                  <template #cell-owner="{ row }">
                    <div class="row" style="gap: 0.5rem">
                      <Avatar :name="row.owner" size="xs" />
                      <span>{{ row.owner }}</span>
                    </div>
                  </template>
                </DataTable>
                <div class="row" style="justify-content: flex-end; margin-top: 0.85rem">
                  <Pagination v-model="page" :total="filteredRequests.length" :per-page="perPage" />
                </div>
              </template>
            </Card>

            <div class="grid-3 mt-4">
              <Card title="Harbor Labs health">
                <div style="text-align: center; padding: 0.5rem 0">
                  <CircularProgress :value="86" show-value label="Harbor Labs" />
                </div>
              </Card>
              <Card title="Nimbus Retail health">
                <div style="text-align: center; padding: 0.5rem 0">
                  <CircularProgress :value="42" show-value label="Nimbus Retail" />
                </div>
              </Card>
              <Card title="Recent activity">
                <Timeline :items="timelineItems" />
              </Card>
            </div>
          </main>
        </div>
      </div>

      <Modal v-model:open="requestOpen" heading="Add feature or enhancement">
        <div class="form-grid">
          <Input class="full" v-model="requestTitle" label="Title" placeholder="Auto-flag stalled deals" required />
          <Select v-model="requestType" label="Type" :options="typeOptions" />
          <Select v-model="requestPriority" label="Priority" :options="priorityOptions" />
          <Autocomplete v-model="requestOwner" label="Owner" :options="ownerOptions" />
          <DatePicker v-model="requestDue" label="Due date" />
          <NumberInput v-model="requestEstimate" label="Estimate (days)" :min="1" :step="1" hint="Rough sizing" />
          <Textarea class="full" v-model="requestNotes" label="Notes" placeholder="What should ship, and why does it matter?" />
        </div>
        <template #footer>
          <Button variant="secondary" @click="requestOpen = false">Cancel</Button>
          <Button @click="submitRequest">Save request</Button>
        </template>
      </Modal>

      <Modal v-model:open="commandOpen" heading="Jump to anything">
        <Search v-model="commandQuery" placeholder="Type a section or action" />
        <EmptyState v-if="!filteredCommands.length" title="No matches" description="Try Overview, Coverage, or Add request." icon="search" />
        <div v-else class="cmd-list">
          <a v-for="item in filteredCommands" :key="item.id" :href="item.href || '#'" @click.prevent="runCommand(item)">
            {{ item.label }}
          </a>
        </div>
      </Modal>
    </ToastProvider>
  </EdsThemeProvider>
</template>
