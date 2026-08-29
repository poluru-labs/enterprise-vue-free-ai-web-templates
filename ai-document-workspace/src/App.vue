<script setup>
import { computed, ref } from 'vue';
import {
  Alert,
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  ButtonGroup,
  Card,
  Combobox,
  DataTable,
  Divider,
  DropdownMenu,
  EdsThemeProvider,
  EmptyState,
  FileUpload,
  Input,
  Meter,
  MenuItem,
  Modal,
  Pagination,
  ProgressBar,
  Search,
  SegmentedControl,
  Select,
  Stat,
  Status,
  Tag,
  Timeline,
  ToastProvider,
  Toolbar,
  Tooltip,
  showToast,
} from '@poluru-labs/enterprise-design-system-vue';

const currentUser = { name: 'Ariana Poluru', role: 'Knowledge Ops Lead' };

const reviewers = [
  { value: 'ariana', label: 'Ariana Poluru' },
  { value: 'devin', label: 'Devin Poluru' },
  { value: 'meera', label: 'Meera Poluru' },
  { value: 'rohan', label: 'Rohan Poluru' },
  { value: 'talia', label: 'Talia Poluru' },
  { value: 'owen', label: 'Owen Poluru' },
];

const docTypes = [
  { value: 'contract', label: 'Contract' },
  { value: 'policy', label: 'Policy' },
  { value: 'report', label: 'Report' },
  { value: 'memo', label: 'Memo' },
];

const documents = ref([
  { id: 'DOC-3241', name: 'Vendor MSA — Northwind', owner: 'Ariana Poluru', type: 'Contract', status: 'Approved', updated: 'Aug 24, 2026', size: '482 KB', scope: 'all' },
  { id: 'DOC-3238', name: 'Data retention policy v4', owner: 'Devin Poluru', type: 'Policy', status: 'In review', updated: 'Aug 23, 2026', size: '128 KB', scope: 'pending' },
  { id: 'DOC-3231', name: 'Q3 security audit report', owner: 'Meera Poluru', type: 'Report', status: 'Draft', updated: 'Aug 22, 2026', size: '2.1 MB', scope: 'all' },
  { id: 'DOC-3227', name: 'Onboarding checklist — APAC', owner: 'Rohan Poluru', type: 'Memo', status: 'Shared', updated: 'Aug 21, 2026', size: '64 KB', scope: 'shared' },
  { id: 'DOC-3219', name: 'Master services agreement', owner: 'Talia Poluru', type: 'Contract', status: 'In review', updated: 'Aug 20, 2026', size: '910 KB', scope: 'pending' },
  { id: 'DOC-3204', name: 'Incident response runbook', owner: 'Owen Poluru', type: 'Policy', status: 'Approved', updated: 'Aug 18, 2026', size: '340 KB', scope: 'all' },
  { id: 'DOC-3198', name: 'Board deck — annual review', owner: 'Ariana Poluru', type: 'Report', status: 'Shared', updated: 'Aug 17, 2026', size: '5.4 MB', scope: 'shared' },
  { id: 'DOC-3187', name: 'Supplier NDA template', owner: 'Devin Poluru', type: 'Contract', status: 'Draft', updated: 'Aug 15, 2026', size: '58 KB', scope: 'all' },
]);

const documentColumns = [
  { key: 'name', label: 'Document', sortable: true },
  { key: 'owner', label: 'Owner', sortable: true },
  { key: 'type', label: 'Type', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'updated', label: 'Updated', sortable: true },
  { key: 'size', label: 'Size', sortable: false },
];

const reviewQueue = [
  { name: 'Meera Poluru', task: 'Data retention policy v4', due: 'Due tomorrow', tone: 'warning' },
  { name: 'Talia Poluru', task: 'Master services agreement', due: 'Due in 3 days', tone: 'info' },
  { name: 'Owen Poluru', task: 'Incident response runbook', due: 'Overdue', tone: 'danger' },
];

const activity = [
  { id: '1', title: 'Ariana Poluru approved "Vendor MSA — Northwind"', description: 'Legal + security sign-off complete', time: 'Today, 9:12 AM' },
  { id: '2', title: 'Devin Poluru uploaded "Supplier NDA template"', description: 'Added to Contracts library', time: 'Yesterday, 4:40 PM' },
  { id: '3', title: 'Meera Poluru requested changes on "Q3 security audit report"', description: '2 comments left on page 4', time: 'Yesterday, 1:05 PM' },
  { id: '4', title: 'Rohan Poluru shared "Onboarding checklist — APAC" with 6 people', description: 'Visible to People Ops team', time: 'Mon, 11:30 AM' },
];

const connectedSources = ['Google Drive', 'SharePoint', 'Notion', 'Slack', 'Confluence'];

const showBanner = ref(true);
const searchQuery = ref('');
const scope = ref('all');
const scopes = [
  { value: 'all', label: 'All documents' },
  { value: 'pending', label: 'Pending review' },
  { value: 'shared', label: 'Shared with me' },
];
const typeFilter = ref('');
const typeFilterOpen = ref(false);
const page = ref(1);
const pageSize = 5;

const filteredDocuments = computed(() => {
  const q = searchQuery.value.trim().toLowerCase();
  return documents.value.filter((doc) => {
    const matchesScope = scope.value === 'all' || doc.scope === scope.value;
    const matchesType = !typeFilter.value || doc.type === typeFilter.value;
    const matchesQuery = !q || doc.name.toLowerCase().includes(q) || doc.owner.toLowerCase().includes(q);
    return matchesScope && matchesType && matchesQuery;
  });
});

const pageCount = computed(() => Math.max(1, Math.ceil(filteredDocuments.value.length / pageSize)));
const pagedDocuments = computed(() => {
  const start = (page.value - 1) * pageSize;
  return filteredDocuments.value.slice(start, start + pageSize);
});

function setTypeFilter(value) {
  typeFilter.value = value;
  typeFilterOpen.value = false;
  page.value = 1;
}

function clearFilters() {
  searchQuery.value = '';
  typeFilter.value = '';
  scope.value = 'all';
}

const uploadOpen = ref(false);
const uploadName = ref('');
const uploadType = ref('');
const uploadReviewer = ref('');
const uploadFiles = ref([]);

function openUpload() {
  uploadName.value = '';
  uploadType.value = '';
  uploadReviewer.value = '';
  uploadFiles.value = [];
  uploadOpen.value = true;
}

function submitUpload() {
  if (!uploadName.value.trim()) {
    showToast({ title: 'Name required', description: 'Give the document a name before creating it.', variant: 'warning' });
    return;
  }
  documents.value.unshift({
    id: `DOC-${Math.floor(3000 + Math.random() * 999)}`,
    name: uploadName.value,
    owner: currentUser.name,
    type: docTypes.find((t) => t.value === uploadType.value)?.label ?? 'Memo',
    status: 'Draft',
    updated: 'Just now',
    size: uploadFiles.value[0] ? `${Math.max(1, Math.round(uploadFiles.value[0].size / 1024))} KB` : '—',
    scope: 'all',
  });
  uploadOpen.value = false;
  showToast({ title: 'Document created', description: `"${uploadName.value}" was added to the library.`, variant: 'success' });
}

function reviewAction(item, title, variant) {
  showToast({ title, description: item.task, variant });
}
</script>

<template>
  <EdsThemeProvider default-theme="light">
    <ToastProvider>
      <div class="shell">
        <aside class="sidebar">
          <a class="brand" href="#">
            <i class="bi bi-file-earmark-text" aria-hidden="true"></i>
            <strong>AI Document Workspace</strong>
          </a>
          <nav class="side-nav" aria-label="Primary">
            <a class="side-link is-active" href="#">Overview</a>
            <a class="side-link" href="#">Library</a>
            <a class="side-link" href="#">Reviews</a>
            <a class="side-link" href="#">Search</a>
            <a class="side-link" href="#">Sources</a>
            <a class="side-link" href="#">Settings</a>
          </nav>
          <div class="sidebar-storage">
            <Meter :value="68" :max="100" label="Storage used" show-value />
          </div>
          <div class="sidebar-user">
            <Avatar :name="currentUser.name" size="md" />
            <div class="sidebar-user-meta">
              <strong>{{ currentUser.name }}</strong>
              <span>{{ currentUser.role }}</span>
            </div>
          </div>
        </aside>
        <main class="main">
          <Breadcrumb class="mb-2" :items="[{ label: 'Workspace', href: '#' }, { label: 'Overview' }]" />
          <header class="page-header">
            <div>
              <span class="eyebrow">Knowledge ops</span>
              <h1>AI Document Workspace</h1>
              <p>Ingest, review, and retrieve documents with citations and owners.</p>
            </div>
            <div class="page-header-actions">
              <Tooltip content="Refresh library">
                <Button variant="secondary" icon="refresh" icon-only accessible-label="Refresh" />
              </Tooltip>
              <Button icon="upload" class-name="btn-accent-text" @click="openUpload">New document</Button>
            </div>
          </header>

          <Alert
            v-if="showBanner"
            class="mb-4"
            variant="info"
            title="New: citation-aware search"
            message="Answers now link back to the exact source paragraph. Try it from the Search tab."
            dismissible
            @dismiss="showBanner = false"
          />

          <section class="metrics" aria-label="Key metrics">
            <Card>
              <Stat label="Documents" value="12.6k" hint="840 added this week" trend="up" trend-value="+7.2%" />
            </Card>
            <Card>
              <Stat label="Pending review" value="46" hint="Legal + security" trend="down" trend-value="-9" />
            </Card>
            <Card>
              <Stat label="Search success" value="91%" hint="Cited answers" trend="up" trend-value="+3 pts" />
            </Card>
            <Card>
              <Stat label="Stale sources" value="28" hint="> 180 days" trend="down" trend-value="-4" />
            </Card>
          </section>

          <Card class="mt-4">
            <Toolbar class="library-toolbar">
              <template #start>
                <Search v-model="searchQuery" placeholder="Search documents or owners…" class-name="library-search" @update:model-value="page = 1" />
                <SegmentedControl v-model="scope" :segments="scopes" @update:model-value="page = 1" />
              </template>
              <template #end>
                <DropdownMenu v-model:open="typeFilterOpen" placement="bottom">
                  <template #trigger>
                    <Button variant="secondary" icon="filter">{{ typeFilter || 'All types' }}</Button>
                  </template>
                  <MenuItem label="All types" @select="setTypeFilter('')" />
                  <MenuItem v-for="t in docTypes" :key="t.value" :label="t.label" @select="setTypeFilter(t.label)" />
                </DropdownMenu>
              </template>
            </Toolbar>

            <div class="library-status-row">
              <Tag v-for="t in docTypes" :key="t.value" :label="t.label" variant="brand" />
            </div>

            <DataTable :columns="documentColumns" :rows="pagedDocuments" sortable striped />

            <EmptyState
              v-if="!pagedDocuments.length"
              title="No documents match your filters"
              description="Try clearing the search or switching scope."
              icon="search"
            >
              <Button variant="secondary" @click="clearFilters">Clear filters</Button>
            </EmptyState>

            <div class="library-footer">
              <span class="library-count">{{ filteredDocuments.length }} documents</span>
              <Pagination v-model:page="page" :page-count="pageCount" />
            </div>
          </Card>

          <section class="secondary-grid">
            <Card>
              <h2 class="card-heading">Recent activity</h2>
              <Timeline :items="activity" />
            </Card>

            <Card>
              <h2 class="card-heading">Review queue</h2>
              <ul class="review-list">
                <li v-for="item in reviewQueue" :key="item.task" class="review-item">
                  <Avatar :name="item.name" size="sm" />
                  <div class="review-item-body">
                    <strong>{{ item.name }}</strong>
                    <span>{{ item.task }}</span>
                  </div>
                  <Status :label="item.due" :tone="item.tone" />
                  <DropdownMenu placement="left">
                    <template #trigger>
                      <Button variant="tertiary" icon="more-horizontal" icon-only accessible-label="Row actions" />
                    </template>
                    <MenuItem label="Approve" @select="reviewAction(item, 'Approved', 'success')" />
                    <MenuItem label="Reassign" @select="reviewAction(item, 'Reassigned', 'info')" />
                    <MenuItem label="Remove" danger @select="reviewAction(item, 'Removed from queue', 'warning')" />
                  </DropdownMenu>
                </li>
              </ul>
            </Card>
          </section>

          <Card class="mt-4">
            <div class="sources-header">
              <h2 class="card-heading">Storage &amp; sources</h2>
              <Badge label="5 connected" variant="brand" />
            </div>
            <ProgressBar :value="68" :max="100" label="Storage used" show-value />
            <Divider class="my-3" />
            <div class="sources-tags">
              <Tag v-for="s in connectedSources" :key="s" :label="s" variant="neutral" />
            </div>
          </Card>
        </main>
      </div>

      <Modal v-model:open="uploadOpen" heading="New document">
        <div class="upload-form">
          <Input v-model="uploadName" label="Document name" placeholder="e.g. Reseller agreement — Acme" required />
          <Select v-model="uploadType" label="Document type" :options="docTypes" placeholder="Select a type" />
          <Combobox v-model="uploadReviewer" label="Assign reviewer" :options="reviewers" placeholder="Search reviewers…" />
          <FileUpload label="Attachment" hint="PDF, DOCX up to 25MB" @files-change="(d) => (uploadFiles = d.files)" />
        </div>
        <template #footer>
          <ButtonGroup :attached="false">
            <Button variant="secondary" @click="uploadOpen = false">Cancel</Button>
            <Button class-name="btn-accent-text" @click="submitUpload">Create document</Button>
          </ButtonGroup>
        </template>
      </Modal>
    </ToastProvider>
  </EdsThemeProvider>
</template>
