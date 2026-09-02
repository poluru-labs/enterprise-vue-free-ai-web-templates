import { createRouter, createWebHistory } from 'vue-router';
import { BASE_PATH } from '../constants/navigation.js';
import OverviewView from '../views/OverviewView.vue';
import InboxView from '../views/InboxView.vue';
import TicketsView from '../views/TicketsView.vue';
import TicketDetailView from '../views/TicketDetailView.vue';
import CustomersView from '../views/CustomersView.vue';
import MacrosView from '../views/MacrosView.vue';
import KnowledgeView from '../views/KnowledgeView.vue';
import SlaView from '../views/SlaView.vue';
import AgentsView from '../views/AgentsView.vue';
import SearchView from '../views/SearchView.vue';
import SettingsView from '../views/SettingsView.vue';

const routes = [
  { path: '/', redirect: `${BASE_PATH}/overview` },
  { path: BASE_PATH, redirect: `${BASE_PATH}/overview` },
  { path: `${BASE_PATH}/overview`, name: 'overview', component: OverviewView },
  { path: `${BASE_PATH}/inbox`, name: 'inbox', component: InboxView },
  { path: `${BASE_PATH}/tickets`, name: 'tickets', component: TicketsView },
  { path: `${BASE_PATH}/tickets/:id`, name: 'ticket-detail', component: TicketDetailView },
  { path: `${BASE_PATH}/customers`, name: 'customers', component: CustomersView },
  { path: `${BASE_PATH}/macros`, name: 'macros', component: MacrosView },
  { path: `${BASE_PATH}/knowledge`, name: 'knowledge', component: KnowledgeView },
  { path: `${BASE_PATH}/sla`, name: 'sla', component: SlaView },
  { path: `${BASE_PATH}/agents`, name: 'agents', component: AgentsView },
  { path: `${BASE_PATH}/search`, name: 'search', component: SearchView },
  { path: `${BASE_PATH}/settings`, name: 'settings', component: SettingsView },
  { path: '/:pathMatch(.*)*', redirect: `${BASE_PATH}/overview` },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
