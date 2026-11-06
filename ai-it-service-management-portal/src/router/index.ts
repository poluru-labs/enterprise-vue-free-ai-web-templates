import { createRouter, createWebHistory } from 'vue-router'
import { BASE_PATH } from '@/constants/navigation'
import PlaceholderView from '@/views/PlaceholderView.vue'
import QueueView from '@/views/QueueView.vue'

const page = (title: string) => ({
  component: PlaceholderView,
  meta: { title },
})

export const routes = [
  { path: '/', redirect: `${BASE_PATH}/queue` },
  { path: BASE_PATH, redirect: `${BASE_PATH}/queue` },
  { path: `${BASE_PATH}/queue`, name: 'queue', component: QueueView, meta: { title: 'Queue' } },
  { path: `${BASE_PATH}/changes`, name: 'changes', ...page('Changes') },
  { path: `${BASE_PATH}/assets`, name: 'assets', ...page('Assets') },
  { path: `${BASE_PATH}/catalog`, name: 'catalog', ...page('Catalog') },
  { path: `${BASE_PATH}/settings`, name: 'settings', ...page('Settings') },
  { path: '/:pathMatch(.*)*', redirect: `${BASE_PATH}/queue` },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.afterEach((to) => {
  const title = typeof to.meta.title === 'string' ? to.meta.title : 'Queue'
  document.title = `${title} · Deskline`
})

export default router
