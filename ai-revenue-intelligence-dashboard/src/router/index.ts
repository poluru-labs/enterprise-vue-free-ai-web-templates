import { createRouter, createWebHistory } from 'vue-router'
import { BASE_PATH } from '@/constants/navigation'
import AccountsView from '@/views/AccountsView.vue'
import OverviewView from '@/views/OverviewView.vue'
import PlaceholderView from '@/views/PlaceholderView.vue'

export const routes = [
  { path: '/', redirect: `${BASE_PATH}/overview` },
  { path: BASE_PATH, redirect: `${BASE_PATH}/overview` },
  { path: `${BASE_PATH}/overview`, name: 'overview', component: OverviewView, meta: { title: 'Overview' } },
  { path: `${BASE_PATH}/accounts`, name: 'accounts', component: AccountsView, meta: { title: 'Accounts' } },
  { path: `${BASE_PATH}/invoices`, name: 'invoices', component: PlaceholderView, meta: { title: 'Invoices' } },
  { path: `${BASE_PATH}/reps`, name: 'reps', component: PlaceholderView, meta: { title: 'Reps' } },
  { path: `${BASE_PATH}/settings`, name: 'settings', component: PlaceholderView, meta: { title: 'Settings' } },
  { path: '/:pathMatch(.*)*', redirect: `${BASE_PATH}/overview` },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.afterEach((to) => {
  const title = typeof to.meta.title === 'string' ? to.meta.title : 'Overview'
  document.title = `${title} · Ledgerline`
})

export default router
