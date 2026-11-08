import { createRouter, createWebHistory } from 'vue-router'
import { BASE_PATH } from '@/constants/navigation'
import { findStudy } from '@/data/shelf'
import PlaceholderView from '@/views/PlaceholderView.vue'
import StudiesView from '@/views/StudiesView.vue'
import StudyView from '@/views/StudyView.vue'

export const routes = [
  { path: '/', redirect: `${BASE_PATH}/studies` },
  { path: BASE_PATH, redirect: `${BASE_PATH}/studies` },
  { path: `${BASE_PATH}/studies`, name: 'studies', component: StudiesView, meta: { title: 'Studies' } },
  { path: `${BASE_PATH}/studies/:id`, name: 'study', component: StudyView, meta: { title: 'Study' } },
  { path: `${BASE_PATH}/papers`, name: 'papers', component: PlaceholderView, meta: { title: 'Papers' } },
  { path: `${BASE_PATH}/grants`, name: 'grants', component: PlaceholderView, meta: { title: 'Grants' } },
  { path: `${BASE_PATH}/labs`, name: 'labs', component: PlaceholderView, meta: { title: 'Labs' } },
  { path: `${BASE_PATH}/settings`, name: 'settings', component: PlaceholderView, meta: { title: 'Settings' } },
  { path: '/:pathMatch(.*)*', redirect: `${BASE_PATH}/studies` },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.afterEach((to) => {
  if (to.name === 'study') {
    const study = findStudy(String(to.params.id ?? ''))
    document.title = `${study?.title ?? 'Study'} · Studyhall`
    return
  }
  const title = typeof to.meta.title === 'string' ? to.meta.title : 'Studies'
  document.title = `${title} · Studyhall`
})

export default router
