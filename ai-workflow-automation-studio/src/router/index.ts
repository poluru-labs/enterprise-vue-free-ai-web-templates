import { createRouter, createWebHistory } from 'vue-router'
import { BASE_PATH } from '@/constants/navigation'
import { findProcess } from '@/data/studio'
import PlaceholderView from '@/views/PlaceholderView.vue'
import ProcessView from '@/views/ProcessView.vue'
import ProcessesView from '@/views/ProcessesView.vue'

export const routes = [
  { path: '/', redirect: `${BASE_PATH}/processes` },
  { path: BASE_PATH, redirect: `${BASE_PATH}/processes` },
  {
    path: `${BASE_PATH}/processes`,
    name: 'processes',
    component: ProcessesView,
    meta: { title: 'Processes' },
  },
  {
    path: `${BASE_PATH}/processes/:id`,
    name: 'process',
    component: ProcessView,
    meta: { title: 'Process' },
  },
  {
    path: `${BASE_PATH}/runs`,
    name: 'runs',
    component: PlaceholderView,
    props: { title: 'Runs', lede: 'In progress and finished.' },
    meta: { title: 'Runs' },
  },
  {
    path: `${BASE_PATH}/forms`,
    name: 'forms',
    component: PlaceholderView,
    props: { title: 'Forms', lede: 'Fields used by the processes.' },
    meta: { title: 'Forms' },
  },
  {
    path: `${BASE_PATH}/owners`,
    name: 'owners',
    component: PlaceholderView,
    props: { title: 'Owners', lede: 'Who approves each process.' },
    meta: { title: 'Owners' },
  },
  {
    path: `${BASE_PATH}/settings`,
    name: 'settings',
    component: PlaceholderView,
    props: { title: 'Settings', lede: 'Process naming and the archive rule.' },
    meta: { title: 'Settings' },
  },
  { path: '/:pathMatch(.*)*', redirect: `${BASE_PATH}/processes` },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.afterEach((to) => {
  if (to.name === 'process') {
    const process = findProcess(String(to.params.id ?? ''))
    document.title = `${process?.name ?? 'Process'} · Flowwell`
    return
  }
  const title = typeof to.meta.title === 'string' ? to.meta.title : 'Processes'
  document.title = `${title} · Flowwell`
})

export default router
