import { createRouter, createWebHistory } from 'vue-router'
import { BASE_PATH } from '@/constants/navigation'
import DeploysView from '@/views/DeploysView.vue'
import IncidentsView from '@/views/IncidentsView.vue'
import OverviewView from '@/views/OverviewView.vue'
import PlaceholderView from '@/views/PlaceholderView.vue'
import ServiceDetailView from '@/views/ServiceDetailView.vue'
import ServicesView from '@/views/ServicesView.vue'

export const routes = [
  { path: '/', redirect: `${BASE_PATH}/overview` },
  { path: BASE_PATH, redirect: `${BASE_PATH}/overview` },
  {
    path: `${BASE_PATH}/overview`,
    name: 'overview',
    component: OverviewView,
    meta: { title: 'Overview' },
  },
  {
    path: `${BASE_PATH}/services`,
    name: 'services',
    component: ServicesView,
    meta: { title: 'Services' },
  },
  {
    path: `${BASE_PATH}/services/:id`,
    name: 'service-detail',
    component: ServiceDetailView,
    meta: { title: 'Service' },
  },
  {
    path: `${BASE_PATH}/deploys`,
    name: 'deploys',
    component: DeploysView,
    meta: { title: 'Deploys' },
  },
  {
    path: `${BASE_PATH}/incidents`,
    name: 'incidents',
    component: IncidentsView,
    meta: { title: 'Incidents' },
  },
  {
    path: `${BASE_PATH}/people`,
    name: 'people',
    component: PlaceholderView,
    meta: { title: 'People' },
  },
  {
    path: `${BASE_PATH}/settings`,
    name: 'settings',
    component: PlaceholderView,
    meta: { title: 'Settings' },
  },
  { path: '/:pathMatch(.*)*', redirect: `${BASE_PATH}/overview` },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.afterEach((to) => {
  const title = typeof to.meta.title === 'string' ? to.meta.title : 'Desk'
  document.title = `${title} · Northline`
})

export default router
