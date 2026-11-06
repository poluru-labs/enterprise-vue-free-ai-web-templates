import { createRouter, createWebHistory } from 'vue-router'
import { BASE_PATH } from '@/constants/navigation'
import PlaceholderView from '@/views/PlaceholderView.vue'

export const routes = [
  { path: '/', redirect: `${BASE_PATH}/partners` },
  { path: BASE_PATH, redirect: `${BASE_PATH}/partners` },
  { path: `${BASE_PATH}/partners`, name: 'partners', component: PlaceholderView, meta: { title: 'Partners' } },
  { path: `${BASE_PATH}/deals`, name: 'deals', component: PlaceholderView, meta: { title: 'Deals' } },
  { path: `${BASE_PATH}/enablement`, name: 'enablement', component: PlaceholderView, meta: { title: 'Enablement' } },
  { path: `${BASE_PATH}/contacts`, name: 'contacts', component: PlaceholderView, meta: { title: 'Contacts' } },
  { path: `${BASE_PATH}/settings`, name: 'settings', component: PlaceholderView, meta: { title: 'Settings' } },
  { path: '/:pathMatch(.*)*', redirect: `${BASE_PATH}/partners` },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.afterEach((to) => {
  const title = typeof to.meta.title === 'string' ? to.meta.title : 'Partners'
  document.title = `${title} · Allyard`
})

export default router
