import { createRouter, createWebHistory } from 'vue-router';
import Overview from './pages/Overview.vue';
import Tenants from './pages/Tenants.vue';
import Members from './pages/Members.vue';
import Flags from './pages/Flags.vue';
import Settings from './pages/Settings.vue';

const routes = [
  { path: '/', name: 'Overview', component: Overview },
  { path: '/tenants', name: 'Tenants', component: Tenants },
  { path: '/members', name: 'Members', component: Members },
  { path: '/flags', name: 'Flags', component: Flags },
  { path: '/settings', name: 'Settings', component: Settings },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
