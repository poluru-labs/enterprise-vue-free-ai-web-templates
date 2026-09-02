import { createRouter, createWebHistory } from 'vue-router';
import OverviewView from '../views/OverviewView.vue';
import ForecastView from '../views/ForecastView.vue';
import CoverageView from '../views/CoverageView.vue';
import PipelineView from '../views/PipelineView.vue';
import HygieneView from '../views/HygieneView.vue';
import TeamsView from '../views/TeamsView.vue';
import PlaybooksView from '../views/PlaybooksView.vue';
import SearchView from '../views/SearchView.vue';
import SettingsView from '../views/SettingsView.vue';

export const routes = [
  { path: '/', name: 'overview', component: OverviewView, meta: { title: 'Overview' } },
  { path: '/forecast', name: 'forecast', component: ForecastView, meta: { title: 'Forecast' } },
  { path: '/coverage', name: 'coverage', component: CoverageView, meta: { title: 'Coverage' } },
  { path: '/pipeline', name: 'pipeline', component: PipelineView, meta: { title: 'Pipeline' } },
  { path: '/hygiene', name: 'hygiene', component: HygieneView, meta: { title: 'Hygiene' } },
  { path: '/teams', name: 'teams', component: TeamsView, meta: { title: 'Teams' } },
  { path: '/playbooks', name: 'playbooks', component: PlaybooksView, meta: { title: 'Playbooks' } },
  { path: '/search', name: 'search', component: SearchView, meta: { title: 'Search' } },
  { path: '/settings', name: 'settings', component: SettingsView, meta: { title: 'Settings' } },
  { path: '/:pathMatch(.*)*', redirect: '/' },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.afterEach((to) => {
  const page = to.meta?.title ? `${to.meta.title} · Quota` : 'Quota · Sales operations';
  document.title = page;
});

export default router;
