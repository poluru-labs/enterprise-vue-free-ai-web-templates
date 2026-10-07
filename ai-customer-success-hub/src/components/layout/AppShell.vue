<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import AppFooter from './AppFooter.vue';
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
  <div class="mrg-shell">
    <AppHeader @menu-toggle="sidebarOpen = !sidebarOpen" />
    <div class="mrg-body">
      <AppSidebar :open="sidebarOpen" @navigate="sidebarOpen = false" />
      <button
        v-if="sidebarOpen"
        type="button"
        class="mrg-backdrop"
        aria-label="Close navigation"
        @click="sidebarOpen = false"
      />
      <div class="mrg-main">
        <main id="main" class="mrg-content">
          <router-view />
        </main>
        <AppFooter />
      </div>
    </div>
  </div>
</template>
