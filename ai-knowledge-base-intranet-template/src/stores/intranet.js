import { computed, reactive } from 'vue';
import { showToast } from '@poluru-labs/enterprise-design-system-vue';
import { currentUser } from '../constants/navigation.js';
import seedArticles from '../data/articles.json';
import seedSpaces from '../data/spaces.json';
import seedHowTos from '../data/howtos.json';
import seedPolicies from '../data/policies.json';
import seedNotifications from '../data/notifications.json';
import { matchesQuery } from '../utils/search.js';

export const articleTypes = [
  { value: 'article', label: 'Article' },
  { value: 'how-to', label: 'How-to' },
  { value: 'policy', label: 'Policy' },
];

export const articleStatuses = [
  { value: 'Published', label: 'Published' },
  { value: 'Draft', label: 'Draft' },
  { value: 'Stale', label: 'Stale' },
];

export const articleColumns = [
  { key: 'title', label: 'Article', sortable: true },
  { key: 'space', label: 'Space', sortable: true },
  { key: 'type', label: 'Type', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'owner', label: 'Owner', sortable: true },
  { key: 'updated', label: 'Updated', sortable: true },
];

export function matchesSpace(record, spaceId) {
  if (!spaceId) return true;
  return record.spaceId === spaceId;
}

export function filterArticles(articles, { query, spaceId, typeFilter, statusFilter } = {}) {
  const q = String(query ?? '').trim();
  return articles.filter((article) => {
    const matchesType = !typeFilter || article.type === typeFilter;
    const matchesStatus = !statusFilter || article.status === statusFilter;
    const matchesTeam = matchesSpace(article, spaceId);
    const matchesSearch = matchesQuery(`${article.title} ${article.owner} ${article.space} ${article.id} ${article.excerpt}`, q);
    return matchesType && matchesStatus && matchesTeam && matchesSearch;
  });
}

const state = reactive({
  articles: seedArticles.map((item) => ({ ...item })),
  spaces: seedSpaces.map((item) => ({ ...item })),
  howTos: seedHowTos.map((item) => ({ ...item })),
  policies: seedPolicies.map((item) => ({ ...item })),
  notifications: seedNotifications.map((item) => ({ ...item })),
  bookmarks: [],
  searchQuery: '',
  spaceFilter: null,
  typeFilter: '',
  statusFilter: '',
  page: 1,
  pageSize: 6,
  publishOpen: false,
});

const filteredArticles = computed(() =>
  filterArticles(state.articles, {
    query: state.searchQuery,
    spaceId: state.spaceFilter,
    typeFilter: state.typeFilter,
    statusFilter: state.statusFilter,
  }),
);

const pageCount = computed(() => Math.max(1, Math.ceil(filteredArticles.value.length / state.pageSize)));

const pagedArticles = computed(() => {
  const start = (state.page - 1) * state.pageSize;
  return filteredArticles.value.slice(start, start + state.pageSize);
});

const unreadCount = computed(() => state.notifications.filter((item) => item.unread).length);

function resetPage() {
  state.page = 1;
}

function setTypeFilter(value) {
  state.typeFilter = value;
  resetPage();
}

function setStatusFilter(value) {
  state.statusFilter = value;
  resetPage();
}

function setSearchQuery(value) {
  state.searchQuery = value;
  resetPage();
}

function setSpaceFilter(spaceId) {
  state.spaceFilter = !spaceId || spaceId === 'all' ? null : spaceId;
  resetPage();
}

function clearFilters() {
  state.searchQuery = '';
  state.typeFilter = '';
  state.statusFilter = '';
  state.spaceFilter = null;
  resetPage();
}

function openPublish() {
  state.publishOpen = true;
}

function closePublish() {
  state.publishOpen = false;
}

function submitPublish({ title, spaceId, type, excerpt }) {
  if (!String(title || '').trim()) {
    showToast({
      title: 'Title required',
      description: 'Name the article before publishing it to a space.',
      variant: 'warning',
    });
    return false;
  }

  const space = state.spaces.find((item) => item.id === spaceId) || state.spaces[0];
  const next = {
    id: `ATL-${Math.floor(1900 + Math.random() * 99)}`,
    title: title.trim(),
    spaceId: space.id,
    space: space.name,
    type: type || 'article',
    status: 'Draft',
    owner: currentUser.name,
    updated: 'Just now',
    updatedAt: new Date().toISOString(),
    reads: 0,
    excerpt: String(excerpt || '').trim() || 'Draft posted from Internal Comms. Owners can expand this in the space.',
    body: String(excerpt || '').trim() || 'Draft posted from Internal Comms.',
  };

  state.articles.unshift(next);
  state.publishOpen = false;
  resetPage();
  showToast({
    title: 'Article drafted',
    description: `"${next.title}" is a draft in ${next.space}.`,
    variant: 'success',
  });
  return next;
}

function isBookmarked(id) {
  return state.bookmarks.includes(id);
}

function toggleBookmark(article) {
  if (!article?.id) return false;
  const exists = state.bookmarks.includes(article.id);
  if (exists) {
    state.bookmarks = state.bookmarks.filter((id) => id !== article.id);
    showToast({
      title: 'Removed bookmark',
      description: `"${article.title}" left your reading list.`,
      variant: 'info',
    });
    return false;
  }
  state.bookmarks = [...state.bookmarks, article.id];
  showToast({
    title: 'Bookmarked',
    description: `"${article.title}" saved to your Atlas reading list.`,
    variant: 'success',
  });
  return true;
}

function markNotificationsRead() {
  state.notifications.forEach((item) => {
    item.unread = false;
  });
}

function getArticle(id) {
  return state.articles.find((item) => item.id === id) || null;
}

function getSpace(id) {
  return state.spaces.find((item) => item.id === id) || null;
}

function articlesForSpace(spaceId) {
  return state.articles.filter((item) => item.spaceId === spaceId);
}

export function useIntranet() {
  return {
    state,
    filteredArticles,
    pagedArticles,
    pageCount,
    unreadCount,
    setTypeFilter,
    setStatusFilter,
    setSearchQuery,
    setSpaceFilter,
    clearFilters,
    openPublish,
    closePublish,
    submitPublish,
    isBookmarked,
    toggleBookmark,
    markNotificationsRead,
    getArticle,
    getSpace,
    articlesForSpace,
  };
}
