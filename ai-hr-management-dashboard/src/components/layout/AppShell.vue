<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import AppHeader from './AppHeader.vue';
import AppSidebar from './AppSidebar.vue';

const route = useRoute();
const sidebarOpen = ref(false);

watch(
  () => route.path,
  () => {
    sidebarOpen.value = false;
  },
);
</script>

<template>
  <div class="grove-shell">
    <AppHeader @menu-toggle="sidebarOpen = !sidebarOpen" />
    <div class="grove-body">
      <AppSidebar :open="sidebarOpen" @navigate="sidebarOpen = false" />
      <button
        v-if="sidebarOpen"
        type="button"
        class="grove-backdrop"
        aria-label="Close navigation"
        @click="sidebarOpen = false"
      />
      <main id="main" class="grove-content">
        <router-view />
      </main>
    </div>
  </div>
</template>
