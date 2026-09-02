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
  <div class="hbr-shell">
    <AppHeader @menu-toggle="sidebarOpen = !sidebarOpen" />
    <div class="hbr-body">
      <AppSidebar :open="sidebarOpen" @navigate="sidebarOpen = false" />
      <button
        v-if="sidebarOpen"
        type="button"
        class="hbr-backdrop"
        aria-label="Close navigation"
        @click="sidebarOpen = false"
      />
      <main id="main" class="hbr-content">
        <router-view />
      </main>
    </div>
  </div>
</template>
