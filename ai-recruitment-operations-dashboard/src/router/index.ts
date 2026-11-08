import { createRouter, createWebHistory } from 'vue-router'
import { BASE_PATH } from '@/constants/navigation'
import { findRole } from '@/data/desk'
import PlaceholderView from '@/views/PlaceholderView.vue'
import RoleView from '@/views/RoleView.vue'
import RolesView from '@/views/RolesView.vue'

export const routes = [
  { path: '/', redirect: `${BASE_PATH}/roles` },
  { path: BASE_PATH, redirect: `${BASE_PATH}/roles` },
  { path: `${BASE_PATH}/roles`, name: 'roles', component: RolesView, meta: { title: 'Roles' } },
  { path: `${BASE_PATH}/roles/:id`, name: 'role', component: RoleView, meta: { title: 'Role' } },
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
  if (to.name === 'role') {
    const role = findRole(String(to.params.id ?? ''))
    document.title = `${role?.title ?? 'Role'} · Hirewell`
    return
  }
  const title = typeof to.meta.title === 'string' ? to.meta.title : 'Roles'
  document.title = `${title} · Hirewell`
})

export default router
