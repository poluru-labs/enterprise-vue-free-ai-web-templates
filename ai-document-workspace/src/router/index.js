import { createRouter, createWebHistory } from 'vue-router';
import { BASE_PATH } from '../constants/navigation.js';

const routes = [
  { path: '/', redirect: `${BASE_PATH}/overview` },
  { path: BASE_PATH, redirect: `${BASE_PATH}/overview` },
  {
    path: `${BASE_PATH}/overview`,
    name: 'overview',
    component: () => import('../views/OverviewView.vue'),
  },
  {
    path: `${BASE_PATH}/library`,
    name: 'library',
    component: () => import('../views/LibraryView.vue'),
  },
  {
    path: `${BASE_PATH}/library/:id`,
    name: 'document',
    component: () => import('../views/DocumentDetailView.vue'),
  },
  {
    path: `${BASE_PATH}/reviews`,
    name: 'reviews',
    component: () => import('../views/ReviewsView.vue'),
  },
  {
    path: `${BASE_PATH}/search`,
    name: 'search',
    component: () => import('../views/SearchView.vue'),
  },
  {
    path: `${BASE_PATH}/sources`,
    name: 'sources',
    component: () => import('../views/SourcesView.vue'),
  },
  {
    path: `${BASE_PATH}/settings`,
    name: 'settings',
    component: () => import('../views/SettingsView.vue'),
  },
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
