import { createRouter, createWebHistory } from 'vue-router'
import { BASE_PATH } from '@/constants/navigation'
import { findPartner } from '@/data/directory'
import PartnerView from '@/views/PartnerView.vue'
import PartnersView from '@/views/PartnersView.vue'
import PlaceholderView from '@/views/PlaceholderView.vue'

export const routes = [
  { path: '/', redirect: `${BASE_PATH}/partners` },
  { path: BASE_PATH, redirect: `${BASE_PATH}/partners` },
  { path: `${BASE_PATH}/partners`, name: 'partners', component: PartnersView, meta: { title: 'Partners' } },
  {
    path: `${BASE_PATH}/partners/:id`,
    name: 'partner',
    component: PartnerView,
    meta: { title: 'Partner' },
  },
  { path: `${BASE_PATH}/deals`, name: 'deals', component: PlaceholderView, meta: { title: 'Deals' } },
  { path: `${BASE_PATH}/enablement`, name: 'enablement', component: PlaceholderView, meta: { title: 'Enablement' } },
  { path: `${BASE_PATH}/contacts`, name: 'contacts', component: PlaceholderView, meta: { title: 'Contacts' } },
  { path: `${BASE_PATH}/settings`, name: 'settings', component: PlaceholderView, meta: { title: 'Settings' } },
  { path: '/:pathMatch(.*)*', redirect: `${BASE_PATH}/partners` },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.afterEach((to) => {
  if (to.name === 'partner') {
    const partner = findPartner(String(to.params.id ?? ''))
    document.title = `${partner?.firm ?? 'Partner'} · Allyard`
    return
  }
  const title = typeof to.meta.title === 'string' ? to.meta.title : 'Partners'
  document.title = `${title} · Allyard`
})

export default router
