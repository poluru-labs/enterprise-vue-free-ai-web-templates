import { createRouter, createWebHistory } from 'vue-router'
import { BASE_PATH } from '@/constants/navigation'
import PlaceholderView from '@/views/PlaceholderView.vue'

export const routes = [
  { path: '/', redirect: `${BASE_PATH}/orders` },
  { path: BASE_PATH, redirect: `${BASE_PATH}/orders` },
  { path: `${BASE_PATH}/orders`, name: 'orders', component: PlaceholderView, meta: { title: 'Orders' } },
  { path: `${BASE_PATH}/suppliers`, name: 'suppliers', component: PlaceholderView, meta: { title: 'Suppliers' } },
  { path: `${BASE_PATH}/approvals`, name: 'approvals', component: PlaceholderView, meta: { title: 'Approvals' } },
  { path: `${BASE_PATH}/receipts`, name: 'receipts', component: PlaceholderView, meta: { title: 'Receipts' } },
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
  const title = typeof to.meta.title === 'string' ? to.meta.title : 'Orders'
  document.title = `${title} · Purchasewell`
})

export default router
