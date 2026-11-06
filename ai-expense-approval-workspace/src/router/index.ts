import { createRouter, createWebHistory } from 'vue-router'
import { BASE_PATH } from '@/constants/navigation'
import InboxView from '@/views/InboxView.vue'
import MineView from '@/views/MineView.vue'
import ReportsView from '@/views/ReportsView.vue'
import SettingsView from '@/views/SettingsView.vue'
import VendorsView from '@/views/VendorsView.vue'

export const routes = [
  { path: '/', redirect: `${BASE_PATH}/inbox` },
  { path: BASE_PATH, redirect: `${BASE_PATH}/inbox` },
  { path: `${BASE_PATH}/inbox`, name: 'inbox', component: InboxView, meta: { title: 'Inbox' } },
  { path: `${BASE_PATH}/mine`, name: 'mine', component: MineView, meta: { title: 'Mine' } },
  { path: `${BASE_PATH}/reports`, name: 'reports', component: ReportsView, meta: { title: 'Reports' } },
  { path: `${BASE_PATH}/vendors`, name: 'vendors', component: VendorsView, meta: { title: 'Vendors' } },
  { path: `${BASE_PATH}/settings`, name: 'settings', component: SettingsView, meta: { title: 'Settings' } },
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
