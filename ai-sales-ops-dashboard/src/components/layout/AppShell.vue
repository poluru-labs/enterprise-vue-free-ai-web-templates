<script setup>
import AppHeader from './AppHeader.vue';
import AppSidebar from './AppSidebar.vue';
import CommandPalette from './CommandPalette.vue';
import ActivityModal from './ActivityModal.vue';
</script>

<template>
  <div class="quota-shell">
    <a class="quota-skip" href="#main">Skip to content</a>
    <AppHeader />
    <div class="quota-body">
      <AppSidebar />
      <main id="main" class="quota-main">
        <RouterView />
      </main>
    </div>
    <CommandPalette />
    <ActivityModal />
  </div>
</template>
