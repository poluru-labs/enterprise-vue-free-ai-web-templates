import { createRouter, createWebHistory } from 'vue-router'
import { BASE_PATH } from '@/constants/navigation'
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
  { path: `${BASE_PATH}/contracts`, name: 'contracts', ...page('Contracts') },
  { path: `${BASE_PATH}/calendar`, name: 'calendar', ...page('Calendar') },
  { path: `${BASE_PATH}/counsel`, name: 'counsel', ...page('Counsel') },
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
