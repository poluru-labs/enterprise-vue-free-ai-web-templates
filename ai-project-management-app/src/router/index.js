import { createRouter, createWebHistory } from 'vue-router';
import { BASE_PATH } from '../constants/navigation.js';
import AppShell from '../components/layout/AppShell.vue';
import OverviewView from '../views/OverviewView.vue';
import BoardView from '../views/BoardView.vue';
import BacklogView from '../views/BacklogView.vue';
import SprintView from '../views/SprintView.vue';
import RoadmapView from '../views/RoadmapView.vue';
import TeamsView from '../views/TeamsView.vue';
import RisksView from '../views/RisksView.vue';
import SearchView from '../views/SearchView.vue';
import SettingsView from '../views/SettingsView.vue';

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior() {
    return { top: 0 };
  },
  routes: [
    { path: '/', redirect: `${BASE_PATH}/overview` },
    {
      path: BASE_PATH,
      component: AppShell,
      children: [
        { path: '', redirect: `${BASE_PATH}/overview` },
        { path: 'overview', name: 'overview', component: OverviewView },
        { path: 'board', name: 'board', component: BoardView },
        { path: 'backlog', name: 'backlog', component: BacklogView },
        { path: 'sprint', name: 'sprint', component: SprintView },
        { path: 'roadmap', name: 'roadmap', component: RoadmapView },
        { path: 'teams', name: 'teams', component: TeamsView },
        { path: 'risks', name: 'risks', component: RisksView },
        { path: 'search', name: 'search', component: SearchView },
        { path: 'settings', name: 'settings', component: SettingsView },
      ],
    },
    { path: '/:pathMatch(.*)*', redirect: `${BASE_PATH}/overview` },
  ],
});

export default router;
