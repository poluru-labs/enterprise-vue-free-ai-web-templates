import { createRouter, createWebHistory } from 'vue-router';
import OverviewView from '../views/OverviewView.vue';
import ActivationView from '../views/ActivationView.vue';
import RetentionView from '../views/RetentionView.vue';
import UsageView from '../views/UsageView.vue';
import CohortsView from '../views/CohortsView.vue';
import ExperimentsView from '../views/ExperimentsView.vue';
import RequestsView from '../views/RequestsView.vue';
import SearchView from '../views/SearchView.vue';
import SettingsView from '../views/SettingsView.vue';

export const routes = [
  { path: '/', name: 'overview', component: OverviewView, meta: { title: 'Overview' } },
  { path: '/activation', name: 'activation', component: ActivationView, meta: { title: 'Activation' } },
  { path: '/retention', name: 'retention', component: RetentionView, meta: { title: 'Retention' } },
  { path: '/usage', name: 'usage', component: UsageView, meta: { title: 'Usage' } },
  { path: '/cohorts', name: 'cohorts', component: CohortsView, meta: { title: 'Cohorts' } },
  { path: '/experiments', name: 'experiments', component: ExperimentsView, meta: { title: 'Experiments' } },
  { path: '/requests', name: 'requests', component: RequestsView, meta: { title: 'Requests' } },
  { path: '/search', name: 'search', component: SearchView, meta: { title: 'Search' } },
  { path: '/settings', name: 'settings', component: SettingsView, meta: { title: 'Settings' } },
  { path: '/:pathMatch(.*)*', redirect: '/' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.afterEach((to) => {
  const page = to.meta?.title ? `${to.meta.title} · Pulse` : 'Pulse · Product analytics';
  document.title = page;
});

export default router;
