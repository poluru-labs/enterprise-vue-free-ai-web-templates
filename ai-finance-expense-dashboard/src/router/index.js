import { createRouter, createWebHistory } from 'vue-router';
import { BASE_PATH } from '../constants/navigation.js';
import Overview from '../views/Overview.vue';
import Expenses from '../views/Expenses.vue';
import ExpenseDetail from '../views/ExpenseDetail.vue';
import Invoices from '../views/Invoices.vue';
import Budgets from '../views/Budgets.vue';
import Analytics from '../views/Analytics.vue';
import Vendors from '../views/Vendors.vue';
import Search from '../views/Search.vue';
import Settings from '../views/Settings.vue';

const routes = [
  { path: '/', redirect: `${BASE_PATH}/overview` },
  { path: BASE_PATH, redirect: `${BASE_PATH}/overview` },
  { path: `${BASE_PATH}/overview`, name: 'overview', component: Overview, meta: { title: 'Overview' } },
  { path: `${BASE_PATH}/expenses`, name: 'expenses', component: Expenses, meta: { title: 'Expenses' } },
  {
    path: `${BASE_PATH}/expenses/:id`,
    name: 'expense-detail',
    component: ExpenseDetail,
    meta: { title: 'Expense' },
  },
  { path: `${BASE_PATH}/invoices`, name: 'invoices', component: Invoices, meta: { title: 'Invoices' } },
  { path: `${BASE_PATH}/budgets`, name: 'budgets', component: Budgets, meta: { title: 'Budgets' } },
  { path: `${BASE_PATH}/analytics`, name: 'analytics', component: Analytics, meta: { title: 'Analytics' } },
  { path: `${BASE_PATH}/vendors`, name: 'vendors', component: Vendors, meta: { title: 'Vendors' } },
  { path: `${BASE_PATH}/search`, name: 'search', component: Search, meta: { title: 'Search' } },
  { path: `${BASE_PATH}/settings`, name: 'settings', component: Settings, meta: { title: 'Settings' } },
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
