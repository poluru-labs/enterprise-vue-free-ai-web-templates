import { createRouter, createWebHistory } from 'vue-router'
import { BASE_PATH } from '@/constants/navigation'
import CarriersView from '@/views/CarriersView.vue'
import ExceptionsView from '@/views/ExceptionsView.vue'
import HubsView from '@/views/HubsView.vue'
import { findLoad } from '@/data/yard'
import LoadView from '@/views/LoadView.vue'
import LoadsView from '@/views/LoadsView.vue'
import SettingsView from '@/views/SettingsView.vue'

export const routes = [
  { path: '/', redirect: `${BASE_PATH}/loads` },
  { path: BASE_PATH, redirect: `${BASE_PATH}/loads` },
  { path: `${BASE_PATH}/loads`, name: 'loads', component: LoadsView, meta: { title: 'Loads' } },
  {
    path: `${BASE_PATH}/loads/:id`,
    name: 'load',
    component: LoadView,
    meta: { title: 'Load' },
  },
  { path: `${BASE_PATH}/hubs`, name: 'hubs', component: HubsView, meta: { title: 'Hubs' } },
  { path: `${BASE_PATH}/carriers`, name: 'carriers', component: CarriersView, meta: { title: 'Carriers' } },
  { path: `${BASE_PATH}/exceptions`, name: 'exceptions', component: ExceptionsView, meta: { title: 'Exceptions' } },
  { path: `${BASE_PATH}/settings`, name: 'settings', component: SettingsView, meta: { title: 'Settings' } },
  { path: '/:pathMatch(.*)*', redirect: `${BASE_PATH}/loads` },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.afterEach((to) => {
  if (to.name === 'load') {
    const load = findLoad(String(to.params.id ?? ''))
    document.title = `${load?.number ?? 'Load'} · Waybill`
    return
  }
  const title = typeof to.meta.title === 'string' ? to.meta.title : 'Loads'
  document.title = `${title} · Waybill`
})

export default router
