import { createRouter, createWebHistory } from 'vue-router'
import { BASE_PATH } from '@/constants/navigation'
import PlaceholderView from '@/views/PlaceholderView.vue'

export const routes = [
  { path: '/', redirect: `${BASE_PATH}/roles` },
  { path: BASE_PATH, redirect: `${BASE_PATH}/roles` },
  { path: `${BASE_PATH}/roles`, name: 'roles', component: PlaceholderView, meta: { title: 'Roles' } },
  { path: `${BASE_PATH}/candidates`, name: 'candidates', component: PlaceholderView, meta: { title: 'Candidates' } },
  { path: `${BASE_PATH}/interviews`, name: 'interviews', component: PlaceholderView, meta: { title: 'Interviews' } },
  { path: `${BASE_PATH}/offers`, name: 'offers', component: PlaceholderView, meta: { title: 'Offers' } },
  { path: `${BASE_PATH}/settings`, name: 'settings', component: PlaceholderView, meta: { title: 'Settings' } },
  { path: '/:pathMatch(.*)*', redirect: `${BASE_PATH}/roles` },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.afterEach((to) => {
  const title = typeof to.meta.title === 'string' ? to.meta.title : 'Roles'
  document.title = `${title} · Hirewell`
})

export default router
