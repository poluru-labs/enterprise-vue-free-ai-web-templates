import { createRouter, createWebHistory } from 'vue-router';
import { BASE_PATH } from '../constants/navigation.js';
import OverviewView from '../views/OverviewView.vue';
import CalendarView from '../views/CalendarView.vue';
import DraftsView from '../views/DraftsView.vue';
import PieceDetailView from '../views/PieceDetailView.vue';
import ReviewsView from '../views/ReviewsView.vue';
import LibraryView from '../views/LibraryView.vue';
import ChannelsView from '../views/ChannelsView.vue';
import AnalyticsView from '../views/AnalyticsView.vue';
import SearchView from '../views/SearchView.vue';
import SettingsView from '../views/SettingsView.vue';

export const routes = [
  { path: '/', redirect: `${BASE_PATH}/overview` },
  { path: BASE_PATH, redirect: `${BASE_PATH}/overview` },
  { path: `${BASE_PATH}/overview`, name: 'overview', component: OverviewView, meta: { title: 'Overview' } },
  { path: `${BASE_PATH}/calendar`, name: 'calendar', component: CalendarView, meta: { title: 'Calendar' } },
  { path: `${BASE_PATH}/drafts`, name: 'drafts', component: DraftsView, meta: { title: 'Drafts' } },
  { path: `${BASE_PATH}/drafts/:id`, name: 'piece-detail', component: PieceDetailView, meta: { title: 'Piece' } },
  { path: `${BASE_PATH}/reviews`, name: 'reviews', component: ReviewsView, meta: { title: 'Reviews' } },
  { path: `${BASE_PATH}/library`, name: 'library', component: LibraryView, meta: { title: 'Library' } },
  { path: `${BASE_PATH}/channels`, name: 'channels', component: ChannelsView, meta: { title: 'Channels' } },
  { path: `${BASE_PATH}/analytics`, name: 'analytics', component: AnalyticsView, meta: { title: 'Analytics' } },
  { path: `${BASE_PATH}/search`, name: 'search', component: SearchView, meta: { title: 'Search' } },
  { path: `${BASE_PATH}/settings`, name: 'settings', component: SettingsView, meta: { title: 'Settings' } },
  { path: '/:pathMatch(.*)*', redirect: `${BASE_PATH}/overview` },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

router.afterEach((to) => {
  document.title = to.meta?.title ? `${to.meta.title} · Folio` : 'Folio · Content operations';
});

export default router;
