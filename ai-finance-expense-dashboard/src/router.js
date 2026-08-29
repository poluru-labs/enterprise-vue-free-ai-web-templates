import { createRouter, createWebHistory } from 'vue-router';
import Overview from './pages/Overview.vue';
import Expenses from './pages/Expenses.vue';
import Invoices from './pages/Invoices.vue';
import Budgets from './pages/Budgets.vue';
import Analytics from './pages/Analytics.vue';

const routes = [
  { path: '/', name: 'Overview', component: Overview },
  { path: '/expenses', name: 'Expenses', component: Expenses },
  { path: '/invoices', name: 'Invoices', component: Invoices },
  { path: '/budgets', name: 'Budgets', component: Budgets },
  { path: '/analytics', name: 'Analytics', component: Analytics },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
