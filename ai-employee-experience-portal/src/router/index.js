import { createRouter, createWebHistory } from 'vue-router';
import { BASE_PATH } from '../constants/navigation';
import OverviewView from '../views/OverviewView.vue';
import ServicesView from '../views/ServicesView.vue';
import ServiceDetailView from '../views/ServiceDetailView.vue';
import FeedbackView from '../views/FeedbackView.vue';
import AnnouncementsView from '../views/AnnouncementsView.vue';
import ResourcesView from '../views/ResourcesView.vue';
import SearchView from '../views/SearchView.vue';
import SettingsView from '../views/SettingsView.vue';

const routes = [
  { path: '/', redirect: `${BASE_PATH}/overview` },
  { path: BASE_PATH, redirect: `${BASE_PATH}/overview` },
  { path: `${BASE_PATH}/overview`, name: 'overview', component: OverviewView, meta: { title: 'Overview' } },
  { path: `${BASE_PATH}/services`, name: 'services', component: ServicesView, meta: { title: 'Services' } },
  { path: `${BASE_PATH}/services/:id`, name: 'service', component: ServiceDetailView, meta: { title: 'Service' } },
  { path: `${BASE_PATH}/feedback`, name: 'feedback', component: FeedbackView, meta: { title: 'Feedback' } },
  { path: `${BASE_PATH}/announcements`, name: 'announcements', component: AnnouncementsView, meta: { title: 'Announcements' } },
  { path: `${BASE_PATH}/resources`, name: 'resources', component: ResourcesView, meta: { title: 'Resources' } },
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
  const title = to.meta.title ? `${to.meta.title} · Hearth` : 'Hearth';
  document.title = title;
});

export default router;
