import { computed, reactive } from 'vue';
import { showToast } from '@poluru-labs/enterprise-design-system-vue';
import { currentUser } from '../constants/navigation.js';
import seedDocuments from '../data/documents.json';
import seedReviews from '../data/reviews.json';
import seedNotifications from '../data/notifications.json';
import { matchesQuery } from '../utils/search.js';

export const reviewers = [
  { value: 'ariana', label: 'Ariana Poluru' },
  { value: 'devin', label: 'Devin Poluru' },
  { value: 'meera', label: 'Meera Poluru' },
  { value: 'rohan', label: 'Rohan Poluru' },
  { value: 'talia', label: 'Talia Poluru' },
  { value: 'owen', label: 'Owen Poluru' },
];

export const docTypes = [
  { value: 'contract', label: 'Contract' },
  { value: 'policy', label: 'Policy' },
  { value: 'report', label: 'Report' },
  { value: 'memo', label: 'Memo' },
];

export const scopes = [
  { value: 'all', label: 'All documents' },
  { value: 'pending', label: 'Pending review' },
  { value: 'shared', label: 'Shared with me' },
];

export const documentColumns = [
  { key: 'name', label: 'Document', sortable: true },
  { key: 'owner', label: 'Owner', sortable: true },
  { key: 'type', label: 'Type', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'updated', label: 'Updated', sortable: true },
  { key: 'size', label: 'Size', sortable: false },
];

const state = reactive({
  documents: seedDocuments.map((doc) => ({ ...doc })),
  reviews: seedReviews.map((item) => ({ ...item })),
  notifications: seedNotifications.map((item) => ({ ...item })),
  searchQuery: '',
  scope: 'all',
  typeFilter: '',
  folderFilter: null,
  collectionFilter: null,
  page: 1,
  pageSize: 5,
  uploadOpen: false,
});

export function matchesPath(doc, folderFilter, collectionFilter) {
  if (collectionFilter && doc.collection !== collectionFilter) return false;
  if (folderFilter && doc.folder !== folderFilter) return false;
  return true;
}

export function filterDocuments(documents, { query, scope, typeFilter, folderFilter, collectionFilter } = {}) {
  const q = String(query ?? '').trim();
  return documents.filter((doc) => {
    const matchesScope = !scope || scope === 'all' || doc.scope === scope;
    const matchesType = !typeFilter || doc.type === typeFilter;
    const matchesFolder = matchesPath(doc, folderFilter, collectionFilter);
    const matchesSearch = matchesQuery(`${doc.name} ${doc.owner} ${doc.id}`, q);
    return matchesScope && matchesType && matchesFolder && matchesSearch;
  });
}

const filteredDocuments = computed(() =>
  filterDocuments(state.documents, {
    query: state.searchQuery,
    scope: state.scope,
    typeFilter: state.typeFilter,
    folderFilter: state.folderFilter,
    collectionFilter: state.collectionFilter,
  }),
);

const pageCount = computed(() => Math.max(1, Math.ceil(filteredDocuments.value.length / state.pageSize)));

const pagedDocuments = computed(() => {
  const start = (state.page - 1) * state.pageSize;
  return filteredDocuments.value.slice(start, start + state.pageSize);
});

const unreadCount = computed(() => state.notifications.filter((item) => item.unread).length);

function resetPage() {
  state.page = 1;
}

function setTypeFilter(value) {
  state.typeFilter = value;
  resetPage();
}

function setScope(value) {
  state.scope = value;
  resetPage();
}

function setSearchQuery(value) {
  state.searchQuery = value;
  resetPage();
}

function setPathFilter(crumb) {
  if (!crumb || crumb.id === 'workspace') {
    state.folderFilter = null;
    state.collectionFilter = null;
  } else if (crumb.id === 'legal') {
    state.folderFilter = 'Legal';
    state.collectionFilter = null;
  } else if (crumb.id === 'contracts') {
    state.folderFilter = 'Legal';
    state.collectionFilter = 'Contracts';
  }
  resetPage();
}

function clearFilters() {
  state.searchQuery = '';
  state.typeFilter = '';
  state.scope = 'all';
  state.folderFilter = null;
  state.collectionFilter = null;
  resetPage();
}

function openUpload() {
  state.uploadOpen = true;
}

function closeUpload() {
  state.uploadOpen = false;
}

function submitUpload({ name, type, files }) {
  if (!String(name || '').trim()) {
    showToast({
      title: 'Name required',
      description: 'Give the document a name before creating it.',
      variant: 'warning',
    });
    return false;
  }

  const next = {
    id: `DOC-${Math.floor(3000 + Math.random() * 999)}`,
    name: name.trim(),
    owner: currentUser.name,
    type: docTypes.find((item) => item.value === type)?.label ?? 'Memo',
    status: 'Draft',
    updated: 'Just now',
    updatedAt: new Date().toISOString(),
    size: files?.[0] ? `${Math.max(1, Math.round(files[0].size / 1024))} KB` : '—',
    scope: 'all',
    folder: 'Legal',
    collection: 'Contracts',
    path: ['Workspace', 'Legal', 'Contracts'],
    excerpt: 'Newly uploaded document awaiting first citation pass.',
    citations: 0,
    pages: 1,
    version: 'v0.1',
  };

  state.documents.unshift(next);
  state.uploadOpen = false;
  resetPage();
  showToast({
    title: 'Document created',
    description: `"${next.name}" was added to the library.`,
    variant: 'success',
  });
  return next;
}

function reviewAction(item, title, variant) {
  if (title === 'Removed from queue') {
    state.reviews = state.reviews.filter((row) => row.id !== item.id);
  }
  showToast({ title, description: item.task, variant });
}

function markNotificationsRead() {
  state.notifications.forEach((item) => {
    item.unread = false;
  });
}

function getDocument(id) {
  return state.documents.find((doc) => doc.id === id) || null;
}

export function useDocuments() {
  return {
    state,
    filteredDocuments,
    pagedDocuments,
    pageCount,
    unreadCount,
    setTypeFilter,
    setScope,
    setSearchQuery,
    setPathFilter,
    clearFilters,
    openUpload,
    closeUpload,
    submitUpload,
    reviewAction,
    markNotificationsRead,
    getDocument,
  };
}
