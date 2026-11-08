import { createRouter, createWebHistory } from 'vue-router'
import { BASE_PATH } from '@/constants/navigation'
import PlaceholderView from '@/views/PlaceholderView.vue'

export const routes = [
  { path: '/', redirect: `${BASE_PATH}/tower` },
  { path: BASE_PATH, redirect: `${BASE_PATH}/tower` },
  { path: `${BASE_PATH}/tower`, name: 'tower', component: PlaceholderView, meta: { title: 'Tower' } },
  { path: `${BASE_PATH}/orders`, name: 'orders', component: PlaceholderView, meta: { title: 'Orders' } },
  { path: `${BASE_PATH}/suppliers`, name: 'suppliers', component: PlaceholderView, meta: { title: 'Suppliers' } },
  { path: `${BASE_PATH}/sites`, name: 'sites', component: PlaceholderView, meta: { title: 'Sites' } },
  { path: `${BASE_PATH}/settings`, name: 'settings', component: PlaceholderView, meta: { title: 'Settings' } },
  { path: '/:pathMatch(.*)*', redirect: `${BASE_PATH}/tower` },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.afterEach((to) => {
  const title = typeof to.meta.title === 'string' ? to.meta.title : 'Tower'
  document.title = `${title} · Stockwell`
})

export default router
