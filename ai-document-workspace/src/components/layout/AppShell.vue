<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import AppHeader from './AppHeader.vue';
import AppSidebar from './AppSidebar.vue';
import UploadModal from '../widgets/UploadModal.vue';

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
  <div class="vault-shell">
    <AppHeader @toggle-sidebar="sidebarOpen = !sidebarOpen" />
    <div class="vault-body">
      <div v-if="sidebarOpen" class="vault-backdrop" @click="sidebarOpen = false"></div>
      <AppSidebar :open="sidebarOpen" />
      <main class="vault-main">
        <router-view />
      </main>
    </div>
    <UploadModal />
  </div>
</template>
