import { createRouter, createWebHistory } from 'vue-router';
import { BASE_PATH } from '../constants/navigation.js';
import AccessView from '../views/AccessView.vue';
import AssetDetailView from '../views/AssetDetailView.vue';
import CatalogView from '../views/CatalogView.vue';
import OverviewView from '../views/OverviewView.vue';
import OwnersView from '../views/OwnersView.vue';
import PoliciesView from '../views/PoliciesView.vue';
import QualityView from '../views/QualityView.vue';
import SearchView from '../views/SearchView.vue';
import SettingsView from '../views/SettingsView.vue';

export const routes = [
  { path: '/', redirect: `${BASE_PATH}/overview` },
  { path: BASE_PATH, redirect: `${BASE_PATH}/overview` },
  { path: `${BASE_PATH}/overview`, name: 'overview', component: OverviewView, meta: { title: 'Overview' } },
  { path: `${BASE_PATH}/catalog`, name: 'catalog', component: CatalogView, meta: { title: 'Catalog' } },
  { path: `${BASE_PATH}/catalog/:id`, name: 'asset-detail', component: AssetDetailView, meta: { title: 'Asset' } },
  { path: `${BASE_PATH}/owners`, name: 'owners', component: OwnersView, meta: { title: 'Owners' } },
  { path: `${BASE_PATH}/quality`, name: 'quality', component: QualityView, meta: { title: 'Quality' } },
  { path: `${BASE_PATH}/policies`, name: 'policies', component: PoliciesView, meta: { title: 'Policies' } },
  { path: `${BASE_PATH}/access`, name: 'access', component: AccessView, meta: { title: 'Access' } },
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
  document.title = to.meta?.title ? `${to.meta.title} · Cobalt` : 'Cobalt · Data governance';
});

export default router;
