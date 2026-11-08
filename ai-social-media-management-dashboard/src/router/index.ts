import { createRouter, createWebHistory } from 'vue-router'
import { BASE_PATH } from '@/constants/navigation'
import PlaceholderView from '@/views/PlaceholderView.vue'

export const routes = [
  { path: '/', redirect: `${BASE_PATH}/calendar` },
  { path: BASE_PATH, redirect: `${BASE_PATH}/calendar` },
  { path: `${BASE_PATH}/calendar`, name: 'calendar', component: PlaceholderView, meta: { title: 'Calendar' } },
  { path: `${BASE_PATH}/drafts`, name: 'drafts', component: PlaceholderView, meta: { title: 'Drafts' } },
  { path: `${BASE_PATH}/channels`, name: 'channels', component: PlaceholderView, meta: { title: 'Channels' } },
  { path: `${BASE_PATH}/library`, name: 'library', component: PlaceholderView, meta: { title: 'Library' } },
  { path: `${BASE_PATH}/settings`, name: 'settings', component: PlaceholderView, meta: { title: 'Settings' } },
  { path: '/:pathMatch(.*)*', redirect: `${BASE_PATH}/calendar` },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.afterEach((to) => {
  const title = typeof to.meta.title === 'string' ? to.meta.title : 'Calendar'
  document.title = `${title} · Postwell`
})

export default router
