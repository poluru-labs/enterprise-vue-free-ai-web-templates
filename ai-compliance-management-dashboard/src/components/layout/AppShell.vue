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
  <div class="aeg-shell">
    <AppHeader @menu-toggle="sidebarOpen = !sidebarOpen" />
    <div class="aeg-body">
      <AppSidebar :open="sidebarOpen" @navigate="sidebarOpen = false" />
      <button
        v-if="sidebarOpen"
        type="button"
        class="aeg-backdrop"
        aria-label="Close navigation"
        @click="sidebarOpen = false"
      />
      <div class="aeg-main">
        <main id="main" class="aeg-content">
          <router-view />
        </main>
        <AppFooter />
      </div>
    </div>
  </div>
</template>
