import { createRouter, createWebHistory } from 'vue-router';
import { BASE_PATH } from '../constants/navigation.js';
import OverviewView from '../views/OverviewView.vue';
import PeopleView from '../views/PeopleView.vue';
import PersonDetailView from '../views/PersonDetailView.vue';
import LeaveView from '../views/LeaveView.vue';
import HiringView from '../views/HiringView.vue';
import LearningView from '../views/LearningView.vue';
import OrgView from '../views/OrgView.vue';
import SearchView from '../views/SearchView.vue';
import SettingsView from '../views/SettingsView.vue';

export const routes = [
  { path: '/', redirect: `${BASE_PATH}/overview` },
  { path: BASE_PATH, redirect: `${BASE_PATH}/overview` },
  { path: `${BASE_PATH}/overview`, name: 'overview', component: OverviewView, meta: { title: 'Overview' } },
  { path: `${BASE_PATH}/people`, name: 'people', component: PeopleView, meta: { title: 'People' } },
  { path: `${BASE_PATH}/people/:id`, name: 'person-detail', component: PersonDetailView, meta: { title: 'Person' } },
  { path: `${BASE_PATH}/leave`, name: 'leave', component: LeaveView, meta: { title: 'Leave' } },
  { path: `${BASE_PATH}/hiring`, name: 'hiring', component: HiringView, meta: { title: 'Hiring' } },
  { path: `${BASE_PATH}/learning`, name: 'learning', component: LearningView, meta: { title: 'Learning' } },
  { path: `${BASE_PATH}/org`, name: 'org', component: OrgView, meta: { title: 'Org' } },
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
  const page = to.meta?.title ? `${to.meta.title} · Grove` : 'Grove · People operations';
  document.title = page;
});

export default router;
