import { createRouter, createWebHistory } from 'vue-router'
import { BASE_PATH } from '@/constants/navigation'
import PlaceholderView from '@/views/PlaceholderView.vue'

const page = (title: string) => ({
  component: PlaceholderView,
  meta: { title },
})

export const routes = [
  { path: '/', redirect: `${BASE_PATH}/catalog` },
  { path: BASE_PATH, redirect: `${BASE_PATH}/catalog` },
  { path: `${BASE_PATH}/catalog`, name: 'catalog', ...page('Catalog') },
  { path: `${BASE_PATH}/paths`, name: 'paths', ...page('Paths') },
  { path: `${BASE_PATH}/people`, name: 'people', ...page('People') },
  { path: `${BASE_PATH}/sessions`, name: 'sessions', ...page('Sessions') },
  { path: `${BASE_PATH}/settings`, name: 'settings', ...page('Settings') },
  { path: '/:pathMatch(.*)*', redirect: `${BASE_PATH}/catalog` },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.afterEach((to) => {
  const title = typeof to.meta.title === 'string' ? to.meta.title : 'Catalog'
  document.title = `${title} · Courtyard`
})

export default router
