import { createRouter, createWebHistory } from 'vue-router'
import { BASE_PATH } from '@/constants/navigation'
import PlaceholderView from '@/views/PlaceholderView.vue'

const page = (title: string) => ({
  component: PlaceholderView,
  meta: { title },
})

export const routes = [
  { path: '/', redirect: `${BASE_PATH}/board` },
  { path: BASE_PATH, redirect: `${BASE_PATH}/board` },
  { path: `${BASE_PATH}/board`, name: 'board', ...page('Board') },
  { path: `${BASE_PATH}/units`, name: 'units', ...page('Units') },
  { path: `${BASE_PATH}/shifts`, name: 'shifts', ...page('Shifts') },
  { path: `${BASE_PATH}/supplies`, name: 'supplies', ...page('Supplies') },
  { path: `${BASE_PATH}/directory`, name: 'directory', ...page('Directory') },
  { path: `${BASE_PATH}/settings`, name: 'settings', ...page('Settings') },
  { path: '/:pathMatch(.*)*', redirect: `${BASE_PATH}/board` },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.afterEach((to) => {
  const title = typeof to.meta.title === 'string' ? to.meta.title : 'Board'
  document.title = `${title} · Wardline`
})

export default router
