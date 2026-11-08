import { createRouter, createWebHistory } from 'vue-router'
import { BASE_PATH } from '@/constants/navigation'
import PlaceholderView from '@/views/PlaceholderView.vue'

export const routes = [
  { path: '/', redirect: `${BASE_PATH}/roadmap` },
  { path: BASE_PATH, redirect: `${BASE_PATH}/roadmap` },
  { path: `${BASE_PATH}/roadmap`, name: 'roadmap', component: PlaceholderView, meta: { title: 'Roadmap' } },
  { path: `${BASE_PATH}/specs`, name: 'specs', component: PlaceholderView, meta: { title: 'Specs' } },
  { path: `${BASE_PATH}/backlog`, name: 'backlog', component: PlaceholderView, meta: { title: 'Backlog' } },
  { path: `${BASE_PATH}/releases`, name: 'releases', component: PlaceholderView, meta: { title: 'Releases' } },
  { path: `${BASE_PATH}/settings`, name: 'settings', component: PlaceholderView, meta: { title: 'Settings' } },
  { path: '/:pathMatch(.*)*', redirect: `${BASE_PATH}/roadmap` },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.afterEach((to) => {
  const title = typeof to.meta.title === 'string' ? to.meta.title : 'Roadmap'
  document.title = `${title} · Specboard`
})

export default router
