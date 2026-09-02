<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import AppHeader from './AppHeader.vue';
import AppSidebar from './AppSidebar.vue';
import PublishModal from '../widgets/PublishModal.vue';

const route = useRoute();
const sidebarOpen = ref(false);

watch(
  () => route.fullPath,
  () => {
    sidebarOpen.value = false;
  },
);
</script>

<template>
  <div class="atlas-shell">
    <AppHeader @toggle-sidebar="sidebarOpen = !sidebarOpen" />
    <div class="atlas-body">
      <div v-if="sidebarOpen" class="atlas-backdrop" @click="sidebarOpen = false"></div>
      <AppSidebar :open="sidebarOpen" />
      <main class="atlas-main">
        <router-view />
      </main>
    </div>
    <PublishModal />
  </div>
</template>
