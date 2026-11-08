import { createRouter, createWebHistory } from 'vue-router'
import { BASE_PATH } from '@/constants/navigation'
import { findOrder } from '@/data/tower'
import OrderView from '@/views/OrderView.vue'
import OrdersView from '@/views/OrdersView.vue'
import PlaceholderView from '@/views/PlaceholderView.vue'
import SitesView from '@/views/SitesView.vue'
import SuppliersView from '@/views/SuppliersView.vue'
import TowerView from '@/views/TowerView.vue'

export const routes = [
  { path: '/', redirect: `${BASE_PATH}/tower` },
  { path: BASE_PATH, redirect: `${BASE_PATH}/tower` },
  { path: `${BASE_PATH}/tower`, name: 'tower', component: TowerView, meta: { title: 'Tower' } },
  { path: `${BASE_PATH}/orders`, name: 'orders', component: OrdersView, meta: { title: 'Orders' } },
  { path: `${BASE_PATH}/orders/:id`, name: 'order', component: OrderView, meta: { title: 'Order' } },
  { path: `${BASE_PATH}/suppliers`, name: 'suppliers', component: SuppliersView, meta: { title: 'Suppliers' } },
  { path: `${BASE_PATH}/sites`, name: 'sites', component: SitesView, meta: { title: 'Sites' } },
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
  if (to.name === 'order') {
    const order = findOrder(String(to.params.id ?? ''))
    document.title = `${order?.number ?? 'Order'} · Stockwell`
    return
  }
  const title = typeof to.meta.title === 'string' ? to.meta.title : 'Tower'
  document.title = `${title} · Stockwell`
})

export default router
