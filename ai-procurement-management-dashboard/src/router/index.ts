import { createRouter, createWebHistory } from 'vue-router'
import { BASE_PATH } from '@/constants/navigation'
import { findOrder } from '@/data/ledger'
import ApprovalsView from '@/views/ApprovalsView.vue'
import OrderView from '@/views/OrderView.vue'
import OrdersView from '@/views/OrdersView.vue'
import PlaceholderView from '@/views/PlaceholderView.vue'
import ReceiptsView from '@/views/ReceiptsView.vue'
import SuppliersView from '@/views/SuppliersView.vue'

export const routes = [
  { path: '/', redirect: `${BASE_PATH}/orders` },
  { path: BASE_PATH, redirect: `${BASE_PATH}/orders` },
  { path: `${BASE_PATH}/orders`, name: 'orders', component: OrdersView, meta: { title: 'Orders' } },
  {
    path: `${BASE_PATH}/orders/:id`,
    name: 'order',
    component: OrderView,
    meta: { title: 'Order' },
  },
  { path: `${BASE_PATH}/suppliers`, name: 'suppliers', component: SuppliersView, meta: { title: 'Suppliers' } },
  { path: `${BASE_PATH}/approvals`, name: 'approvals', component: ApprovalsView, meta: { title: 'Approvals' } },
  { path: `${BASE_PATH}/receipts`, name: 'receipts', component: ReceiptsView, meta: { title: 'Receipts' } },
  { path: `${BASE_PATH}/settings`, name: 'settings', component: PlaceholderView, meta: { title: 'Settings' } },
  { path: '/:pathMatch(.*)*', redirect: `${BASE_PATH}/orders` },
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
    document.title = `${order?.number ?? 'Order'} · Purchasewell`
    return
  }
  const title = typeof to.meta.title === 'string' ? to.meta.title : 'Orders'
  document.title = `${title} · Purchasewell`
})

export default router
