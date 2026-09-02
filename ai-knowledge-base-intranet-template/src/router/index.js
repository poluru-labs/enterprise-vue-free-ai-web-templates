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
    path: `${BASE_PATH}/spaces`,
    name: 'spaces',
    component: () => import('../views/SpacesView.vue'),
  },
  {
    path: `${BASE_PATH}/spaces/:id`,
    name: 'space',
    component: () => import('../views/SpaceDetailView.vue'),
  },
  {
    path: `${BASE_PATH}/articles`,
    name: 'articles',
    component: () => import('../views/ArticlesView.vue'),
  },
  {
    path: `${BASE_PATH}/articles/:id`,
    name: 'article',
    component: () => import('../views/ArticleDetailView.vue'),
  },
  {
    path: `${BASE_PATH}/how-tos`,
    name: 'how-tos',
    component: () => import('../views/HowTosView.vue'),
  },
  {
    path: `${BASE_PATH}/policies`,
    name: 'policies',
    component: () => import('../views/PoliciesView.vue'),
  },
  {
    path: `${BASE_PATH}/search`,
    name: 'search',
    component: () => import('../views/SearchView.vue'),
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
