import { createRouter, createWebHistory } from 'vue-router'
import { BASE_PATH } from '@/constants/navigation'
import CalendarView from '@/views/CalendarView.vue'
import ContractsView from '@/views/ContractsView.vue'
import CounselView from '@/views/CounselView.vue'
import { findMatter } from '@/data/ledger'
import MatterView from '@/views/MatterView.vue'
import MattersView from '@/views/MattersView.vue'
import PlaceholderView from '@/views/PlaceholderView.vue'

const page = (title: string) => ({
  component: PlaceholderView,
  meta: { title },
})

export const routes = [
  { path: '/', redirect: `${BASE_PATH}/matters` },
  { path: BASE_PATH, redirect: `${BASE_PATH}/matters` },
  { path: `${BASE_PATH}/matters`, name: 'matters', component: MattersView, meta: { title: 'Matters' } },
  {
    path: `${BASE_PATH}/matters/:id`,
    name: 'matter',
    component: MatterView,
    meta: { title: 'Matter' },
  },
  { path: `${BASE_PATH}/contracts`, name: 'contracts', component: ContractsView, meta: { title: 'Contracts' } },
  { path: `${BASE_PATH}/calendar`, name: 'calendar', component: CalendarView, meta: { title: 'Calendar' } },
  { path: `${BASE_PATH}/counsel`, name: 'counsel', component: CounselView, meta: { title: 'Counsel' } },
  { path: `${BASE_PATH}/settings`, name: 'settings', ...page('Settings') },
  { path: '/:pathMatch(.*)*', redirect: `${BASE_PATH}/matters` },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.afterEach((to) => {
  if (to.name === 'matter') {
    const matter = findMatter(String(to.params.id ?? ''))
    document.title = `${matter?.number ?? 'Matter'} · Briefwell`
    return
  }
  const title = typeof to.meta.title === 'string' ? to.meta.title : 'Matters'
  document.title = `${title} · Briefwell`
})

export default router
