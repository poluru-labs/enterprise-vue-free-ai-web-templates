import { createRouter, createWebHistory } from 'vue-router';
import { BASE_PATH } from '../constants/navigation.js';
import AppShell from '../components/layout/AppShell.vue';
import OverviewView from '../views/OverviewView.vue';
import PipelineView from '../views/PipelineView.vue';
import DealsView from '../views/DealsView.vue';
import DealDetailView from '../views/DealDetailView.vue';
import LeadsView from '../views/LeadsView.vue';
import AccountsView from '../views/AccountsView.vue';
import AccountDetailView from '../views/AccountDetailView.vue';
import ActivitiesView from '../views/ActivitiesView.vue';
import ReportsView from '../views/ReportsView.vue';
import SearchView from '../views/SearchView.vue';
import SettingsView from '../views/SettingsView.vue';

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior() {
    return { top: 0 };
  },
  routes: [
    { path: '/', redirect: `${BASE_PATH}/overview` },
    {
      path: BASE_PATH,
      component: AppShell,
      children: [
        { path: '', redirect: `${BASE_PATH}/overview` },
        { path: 'overview', name: 'overview', component: OverviewView },
        { path: 'pipeline', name: 'pipeline', component: PipelineView },
        { path: 'deals', name: 'deals', component: DealsView },
        { path: 'deals/:id', name: 'deal', component: DealDetailView },
        { path: 'leads', name: 'leads', component: LeadsView },
        { path: 'accounts', name: 'accounts', component: AccountsView },
        { path: 'accounts/:id', name: 'account', component: AccountDetailView },
        { path: 'activities', name: 'activities', component: ActivitiesView },
        { path: 'reports', name: 'reports', component: ReportsView },
        { path: 'search', name: 'search', component: SearchView },
        { path: 'settings', name: 'settings', component: SettingsView },
      ],
    },
    { path: '/:pathMatch(.*)*', redirect: `${BASE_PATH}/overview` },
  ],
});

export default router;
