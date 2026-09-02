<script setup>
import AppHeader from './AppHeader.vue';
import AppSidebar from './AppSidebar.vue';
import CommandPalette from './CommandPalette.vue';
import RequestModal from './RequestModal.vue';
</script>

<template>
  <div class="pulse-shell">
    <a class="pulse-skip" href="#main">Skip to content</a>
    <AppHeader />
    <div class="pulse-body">
      <AppSidebar />
      <main id="main" class="pulse-main">
        <RouterView />
      </main>
    </div>
    <CommandPalette />
    <RequestModal />
  </div>
</template>
