import { createRouter, createWebHistory } from 'vue-router'
import { BASE_PATH } from '@/constants/navigation'
import { findSpec } from '@/data/board'
import BacklogView from '@/views/BacklogView.vue'
import NewSpecView from '@/views/NewSpecView.vue'
import ReleasesView from '@/views/ReleasesView.vue'
import SettingsView from '@/views/SettingsView.vue'
import SpecsView from '@/views/SpecsView.vue'
import RoadmapView from '@/views/RoadmapView.vue'
import SpecView from '@/views/SpecView.vue'

export const routes = [
  { path: '/', redirect: `${BASE_PATH}/roadmap` },
  { path: BASE_PATH, redirect: `${BASE_PATH}/roadmap` },
  { path: `${BASE_PATH}/roadmap`, name: 'roadmap', component: RoadmapView, meta: { title: 'Roadmap' } },
  { path: `${BASE_PATH}/specs`, name: 'specs', component: SpecsView, meta: { title: 'Specs' } },
  { path: `${BASE_PATH}/specs/new`, name: 'new-spec', component: NewSpecView, meta: { title: 'New spec' } },
  {
    path: `${BASE_PATH}/specs/:id`,
    name: 'spec',
    component: SpecView,
    meta: { title: 'Spec' },
  },
  { path: `${BASE_PATH}/backlog`, name: 'backlog', component: BacklogView, meta: { title: 'Backlog' } },
  { path: `${BASE_PATH}/releases`, name: 'releases', component: ReleasesView, meta: { title: 'Releases' } },
  { path: `${BASE_PATH}/settings`, name: 'settings', component: SettingsView, meta: { title: 'Settings' } },
  { path: '/:pathMatch(.*)*', redirect: `${BASE_PATH}/roadmap` },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.afterEach((to) => {
  if (to.name === 'spec') {
    const spec = findSpec(String(to.params.id ?? ''))
    document.title = `${spec?.number ?? 'Spec'} · Specboard`
    return
  }
  const title = typeof to.meta.title === 'string' ? to.meta.title : 'Roadmap'
  document.title = `${title} · Specboard`
})

export default router
