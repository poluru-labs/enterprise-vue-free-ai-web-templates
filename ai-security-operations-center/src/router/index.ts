import { createRouter, createWebHistory } from 'vue-router'
import { BASE_PATH } from '@/constants/navigation'
import { findIncident } from '@/data/watch'
import IncidentView from '@/views/IncidentView.vue'
import IncidentsView from '@/views/IncidentsView.vue'
import PlaceholderView from '@/views/PlaceholderView.vue'

export const routes = [
  { path: '/', redirect: `${BASE_PATH}/incidents` },
  { path: BASE_PATH, redirect: `${BASE_PATH}/incidents` },
  { path: `${BASE_PATH}/incidents`, name: 'incidents', component: IncidentsView, meta: { title: 'Incidents' } },
  { path: `${BASE_PATH}/incidents/:id`, name: 'incident', component: IncidentView, meta: { title: 'Incident' } },
  { path: `${BASE_PATH}/assets`, name: 'assets', component: PlaceholderView, meta: { title: 'Assets' } },
  { path: `${BASE_PATH}/access`, name: 'access', component: PlaceholderView, meta: { title: 'Access' } },
  { path: `${BASE_PATH}/changes`, name: 'changes', component: PlaceholderView, meta: { title: 'Changes' } },
  { path: `${BASE_PATH}/settings`, name: 'settings', component: PlaceholderView, meta: { title: 'Settings' } },
  { path: '/:pathMatch(.*)*', redirect: `${BASE_PATH}/incidents` },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.afterEach((to) => {
  if (to.name === 'incident') {
    const incident = findIncident(String(to.params.id ?? ''))
    document.title = `${incident?.number ?? 'Incident'} · Watchline`
    return
  }
  const title = typeof to.meta.title === 'string' ? to.meta.title : 'Incidents'
  document.title = `${title} · Watchline`
})

export default router
