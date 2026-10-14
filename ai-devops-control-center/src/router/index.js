import { createRouter, createWebHistory } from 'vue-router';
import { BASE_PATH } from '../constants/navigation.js';
import DeploymentsView from '../views/DeploymentsView.vue';
import EnvironmentsView from '../views/EnvironmentsView.vue';
import InfrastructureView from '../views/InfrastructureView.vue';
import OverviewView from '../views/OverviewView.vue';
import PipelineDetailView from '../views/PipelineDetailView.vue';
import PipelinesView from '../views/PipelinesView.vue';
import SearchView from '../views/SearchView.vue';
import SettingsView from '../views/SettingsView.vue';
import UptimeView from '../views/UptimeView.vue';

export const routes = [
  { path: '/', redirect: `${BASE_PATH}/overview` },
  { path: BASE_PATH, redirect: `${BASE_PATH}/overview` },
  { path: `${BASE_PATH}/overview`, name: 'overview', component: OverviewView, meta: { title: 'Overview' } },
  { path: `${BASE_PATH}/pipelines`, name: 'pipelines', component: PipelinesView, meta: { title: 'Pipelines' } },
  { path: `${BASE_PATH}/pipelines/:id`, name: 'pipeline-detail', component: PipelineDetailView, meta: { title: 'Pipeline' } },
  { path: `${BASE_PATH}/environments`, name: 'environments', component: EnvironmentsView, meta: { title: 'Environments' } },
  { path: `${BASE_PATH}/deployments`, name: 'deployments', component: DeploymentsView, meta: { title: 'Deployments' } },
  { path: `${BASE_PATH}/uptime`, name: 'uptime', component: UptimeView, meta: { title: 'Uptime' } },
  { path: `${BASE_PATH}/infrastructure`, name: 'infrastructure', component: InfrastructureView, meta: { title: 'Infrastructure' } },
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
  document.title = to.meta?.title ? `${to.meta.title} · Tide` : 'Tide · DevOps control';
});

export default router;
