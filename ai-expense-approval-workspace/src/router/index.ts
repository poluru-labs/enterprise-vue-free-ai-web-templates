import { createRouter, createWebHistory } from 'vue-router'
import { BASE_PATH } from '@/constants/navigation'
import InboxView from '@/views/InboxView.vue'
import PlaceholderView from '@/views/PlaceholderView.vue'

const page = (title: string) => ({
  component: PlaceholderView,
  meta: { title },
})

export const routes = [
  { path: '/', redirect: `${BASE_PATH}/inbox` },
  { path: BASE_PATH, redirect: `${BASE_PATH}/inbox` },
  { path: `${BASE_PATH}/inbox`, name: 'inbox', component: InboxView, meta: { title: 'Inbox' } },
  { path: `${BASE_PATH}/mine`, name: 'mine', ...page('Mine') },
  { path: `${BASE_PATH}/reports`, name: 'reports', ...page('Reports') },
  { path: `${BASE_PATH}/vendors`, name: 'vendors', ...page('Vendors') },
  { path: `${BASE_PATH}/settings`, name: 'settings', ...page('Settings') },
  { path: '/:pathMatch(.*)*', redirect: `${BASE_PATH}/inbox` },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.afterEach((to) => {
  const title = typeof to.meta.title === 'string' ? to.meta.title : 'Inbox'
  document.title = `${title} · Copperlane`
})

export default router
