import { createRouter, createWebHistory } from 'vue-router'
import { BASE_PATH } from '@/constants/navigation'
import { findCourse } from '@/data/school'
import CatalogView from '@/views/CatalogView.vue'
import CourseView from '@/views/CourseView.vue'
import PathsView from '@/views/PathsView.vue'
import PeopleView from '@/views/PeopleView.vue'
import PlaceholderView from '@/views/PlaceholderView.vue'
import SessionsView from '@/views/SessionsView.vue'

const page = (title: string) => ({
  component: PlaceholderView,
  meta: { title },
})

export const routes = [
  { path: '/', redirect: `${BASE_PATH}/catalog` },
  { path: BASE_PATH, redirect: `${BASE_PATH}/catalog` },
  { path: `${BASE_PATH}/catalog`, name: 'catalog', component: CatalogView, meta: { title: 'Catalog' } },
  {
    path: `${BASE_PATH}/catalog/:id`,
    name: 'course',
    component: CourseView,
    meta: { title: 'Course' },
  },
  { path: `${BASE_PATH}/paths`, name: 'paths', component: PathsView, meta: { title: 'Paths' } },
  { path: `${BASE_PATH}/people`, name: 'people', component: PeopleView, meta: { title: 'People' } },
  { path: `${BASE_PATH}/sessions`, name: 'sessions', component: SessionsView, meta: { title: 'Sessions' } },
  { path: `${BASE_PATH}/settings`, name: 'settings', ...page('Settings') },
  { path: '/:pathMatch(.*)*', redirect: `${BASE_PATH}/catalog` },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.afterEach((to) => {
  if (to.name === 'course') {
    const course = findCourse(String(to.params.id ?? ''))
    document.title = `${course?.title ?? 'Course'} · Courtyard`
    return
  }
  const title = typeof to.meta.title === 'string' ? to.meta.title : 'Catalog'
  document.title = `${title} · Courtyard`
})

export default router
