import { createRouter, createWebHistory } from 'vue-router'
import { BASE_PATH } from '@/constants/navigation'
import { findProperty } from '@/data/portfolio'
import PlaceholderView from '@/views/PlaceholderView.vue'
import PortfolioView from '@/views/PortfolioView.vue'
import PropertyView from '@/views/PropertyView.vue'

export const routes = [
  { path: '/', redirect: `${BASE_PATH}/portfolio` },
  { path: BASE_PATH, redirect: `${BASE_PATH}/portfolio` },
  { path: `${BASE_PATH}/portfolio`, name: 'portfolio', component: PortfolioView, meta: { title: 'Portfolio' } },
  { path: `${BASE_PATH}/properties`, name: 'properties', component: PlaceholderView, meta: { title: 'Properties' } },
  { path: `${BASE_PATH}/properties/:id`, name: 'property', component: PropertyView, meta: { title: 'Property' } },
  { path: `${BASE_PATH}/leases`, name: 'leases', component: PlaceholderView, meta: { title: 'Leases' } },
  { path: `${BASE_PATH}/maintenance`, name: 'maintenance', component: PlaceholderView, meta: { title: 'Maintenance' } },
  { path: `${BASE_PATH}/settings`, name: 'settings', component: PlaceholderView, meta: { title: 'Settings' } },
  { path: '/:pathMatch(.*)*', redirect: `${BASE_PATH}/portfolio` },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.afterEach((to) => {
  if (to.name === 'property') {
    const property = findProperty(String(to.params.id ?? ''))
    document.title = `${property?.name ?? 'Property'} · Lotwell`
    return
  }
  const title = typeof to.meta.title === 'string' ? to.meta.title : 'Portfolio'
  document.title = `${title} · Lotwell`
})

export default router
