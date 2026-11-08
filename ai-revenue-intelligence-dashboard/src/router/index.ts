import { createRouter, createWebHistory } from 'vue-router'
import { findAccount } from '@/data/book'
import { BASE_PATH } from '@/constants/navigation'
import AccountView from '@/views/AccountView.vue'
import AccountsView from '@/views/AccountsView.vue'
import InvoicesView from '@/views/InvoicesView.vue'
import OverviewView from '@/views/OverviewView.vue'
import RepsView from '@/views/RepsView.vue'
import SettingsView from '@/views/SettingsView.vue'

export const routes = [
  { path: '/', redirect: `${BASE_PATH}/overview` },
  { path: BASE_PATH, redirect: `${BASE_PATH}/overview` },
  { path: `${BASE_PATH}/overview`, name: 'overview', component: OverviewView, meta: { title: 'Overview' } },
  { path: `${BASE_PATH}/accounts`, name: 'accounts', component: AccountsView, meta: { title: 'Accounts' } },
  { path: `${BASE_PATH}/accounts/:id`, name: 'account', component: AccountView, meta: { title: 'Account' } },
  { path: `${BASE_PATH}/invoices`, name: 'invoices', component: InvoicesView, meta: { title: 'Invoices' } },
  { path: `${BASE_PATH}/reps`, name: 'reps', component: RepsView, meta: { title: 'Reps' } },
  { path: `${BASE_PATH}/settings`, name: 'settings', component: SettingsView, meta: { title: 'Settings' } },
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
  if (to.name === 'account') {
    const account = findAccount(String(to.params.id ?? ''))
    document.title = `${account?.name ?? 'Account'} · Ledgerline`
    return
  }
  const title = typeof to.meta.title === 'string' ? to.meta.title : 'Overview'
  document.title = `${title} · Ledgerline`
})

export default router
