import { createRouter, createWebHistory } from 'vue-router'
import { BASE_PATH } from '@/constants/navigation'
import BoardView from '@/views/BoardView.vue'
import DirectoryView from '@/views/DirectoryView.vue'
import PlaceholderView from '@/views/PlaceholderView.vue'
import ShiftsView from '@/views/ShiftsView.vue'
import SuppliesView from '@/views/SuppliesView.vue'
import UnitDetailView from '@/views/UnitDetailView.vue'
import UnitsView from '@/views/UnitsView.vue'

const page = (title: string) => ({
  component: PlaceholderView,
  meta: { title },
})

export const routes = [
  { path: '/', redirect: `${BASE_PATH}/board` },
  { path: BASE_PATH, redirect: `${BASE_PATH}/board` },
  { path: `${BASE_PATH}/board`, name: 'board', component: BoardView, meta: { title: 'Board' } },
  { path: `${BASE_PATH}/units`, name: 'units', component: UnitsView, meta: { title: 'Units' } },
  { path: `${BASE_PATH}/units/:id`, name: 'unit', component: UnitDetailView, meta: { title: 'Unit' } },
  { path: `${BASE_PATH}/shifts`, name: 'shifts', component: ShiftsView, meta: { title: 'Shifts' } },
  { path: `${BASE_PATH}/supplies`, name: 'supplies', component: SuppliesView, meta: { title: 'Supplies' } },
  { path: `${BASE_PATH}/directory`, name: 'directory', component: DirectoryView, meta: { title: 'Directory' } },
  { path: `${BASE_PATH}/settings`, name: 'settings', ...page('Settings') },
  { path: '/:pathMatch(.*)*', redirect: `${BASE_PATH}/board` },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.afterEach((to) => {
  const title = typeof to.meta.title === 'string' ? to.meta.title : 'Board'
  document.title = `${title} · Wardline`
})

export default router
