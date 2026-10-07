import { createRouter, createWebHistory } from 'vue-router';
import { BASE_PATH } from '../constants/navigation.js';
import AccountsView from '../views/AccountsView.vue';
import AccountDetailView from '../views/AccountDetailView.vue';
import ActivitiesView from '../views/ActivitiesView.vue';
import OnboardingView from '../views/OnboardingView.vue';
import OverviewView from '../views/OverviewView.vue';
import RenewalsView from '../views/RenewalsView.vue';
import SearchView from '../views/SearchView.vue';
import SettingsView from '../views/SettingsView.vue';

export const routes = [
  { path: '/', redirect: `${BASE_PATH}/overview` },
  { path: BASE_PATH, redirect: `${BASE_PATH}/overview` },
  { path: `${BASE_PATH}/overview`, name: 'overview', component: OverviewView, meta: { title: 'Overview' } },
  { path: `${BASE_PATH}/accounts`, name: 'accounts', component: AccountsView, meta: { title: 'Accounts' } },
  { path: `${BASE_PATH}/accounts/:id`, name: 'account-detail', component: AccountDetailView, meta: { title: 'Account' } },
  { path: `${BASE_PATH}/renewals`, name: 'renewals', component: RenewalsView, meta: { title: 'Renewals' } },
  { path: `${BASE_PATH}/onboarding`, name: 'onboarding', component: OnboardingView, meta: { title: 'Onboarding' } },
  { path: `${BASE_PATH}/activities`, name: 'activities', component: ActivitiesView, meta: { title: 'Activities' } },
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
  const page = to.meta?.title ? `${to.meta.title} · Marigold` : 'Marigold · Customer success';
  document.title = page;
});

export default router;
