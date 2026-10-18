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
  <div class="hrt-shell">
    <AppHeader @menu-toggle="sidebarOpen = !sidebarOpen" />
    <div class="hrt-body">
      <AppSidebar :open="sidebarOpen" @navigate="sidebarOpen = false" />
      <button
        v-if="sidebarOpen"
        type="button"
        class="hrt-backdrop"
        aria-label="Close navigation"
        @click="sidebarOpen = false"
      />
      <div class="hrt-main">
        <main id="main" class="hrt-content">
          <router-view />
        </main>
        <AppFooter />
      </div>
    </div>
  </div>
</template>
