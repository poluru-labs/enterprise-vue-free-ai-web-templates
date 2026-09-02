import { createRouter, createWebHistory } from 'vue-router';
import { BASE_PATH } from '../constants/navigation.js';
import OverviewView from '../views/OverviewView.vue';
import TenantsView from '../views/TenantsView.vue';
import TenantDetailView from '../views/TenantDetailView.vue';
import MembersView from '../views/MembersView.vue';
import FlagsView from '../views/FlagsView.vue';
import AuditView from '../views/AuditView.vue';
import SearchView from '../views/SearchView.vue';
import SettingsView from '../views/SettingsView.vue';

const routes = [
  { path: '/', redirect: `${BASE_PATH}/overview` },
  { path: BASE_PATH, redirect: `${BASE_PATH}/overview` },
  { path: `${BASE_PATH}/overview`, name: 'overview', component: OverviewView },
  { path: `${BASE_PATH}/tenants`, name: 'tenants', component: TenantsView },
  { path: `${BASE_PATH}/tenants/:id`, name: 'tenant-detail', component: TenantDetailView },
  { path: `${BASE_PATH}/members`, name: 'members', component: MembersView },
  { path: `${BASE_PATH}/flags`, name: 'flags', component: FlagsView },
  { path: `${BASE_PATH}/audit`, name: 'audit', component: AuditView },
  { path: `${BASE_PATH}/search`, name: 'search', component: SearchView },
  { path: `${BASE_PATH}/settings`, name: 'settings', component: SettingsView },
  { path: '/:pathMatch(.*)*', redirect: `${BASE_PATH}/overview` },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
