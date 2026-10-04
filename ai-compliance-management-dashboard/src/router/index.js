import { createRouter, createWebHistory } from 'vue-router';
import { BASE_PATH } from '../constants/navigation.js';
import OverviewView from '../views/OverviewView.vue';
import ControlsView from '../views/ControlsView.vue';
import ControlDetailView from '../views/ControlDetailView.vue';
import AuditsView from '../views/AuditsView.vue';
import AuditDetailView from '../views/AuditDetailView.vue';
import PoliciesView from '../views/PoliciesView.vue';
import RisksView from '../views/RisksView.vue';
import RequirementsView from '../views/RequirementsView.vue';
import SearchView from '../views/SearchView.vue';
import SettingsView from '../views/SettingsView.vue';

export const routes = [
  { path: '/', redirect: `${BASE_PATH}/overview` },
  { path: BASE_PATH, redirect: `${BASE_PATH}/overview` },
  { path: `${BASE_PATH}/overview`, name: 'overview', component: OverviewView, meta: { title: 'Overview' } },
  { path: `${BASE_PATH}/controls`, name: 'controls', component: ControlsView, meta: { title: 'Controls' } },
  { path: `${BASE_PATH}/controls/:id`, name: 'control-detail', component: ControlDetailView, meta: { title: 'Control' } },
  { path: `${BASE_PATH}/audits`, name: 'audits', component: AuditsView, meta: { title: 'Audits' } },
  { path: `${BASE_PATH}/audits/:id`, name: 'audit-detail', component: AuditDetailView, meta: { title: 'Audit' } },
  { path: `${BASE_PATH}/policies`, name: 'policies', component: PoliciesView, meta: { title: 'Policies' } },
  { path: `${BASE_PATH}/risks`, name: 'risks', component: RisksView, meta: { title: 'Risks' } },
  { path: `${BASE_PATH}/requirements`, name: 'requirements', component: RequirementsView, meta: { title: 'Requirements' } },
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
  const page = to.meta?.title ? `${to.meta.title} · Aegis` : 'Aegis · Compliance desk';
  document.title = page;
});

export default router;
