<script setup>
import { computed, onBeforeUnmount, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import AppHeader from './AppHeader.vue';
import AppSidebar from './AppSidebar.vue';
import CommandPalette from '../widgets/CommandPalette.vue';
import ExpenseComposer from '../widgets/ExpenseComposer.vue';
import { useCommandPalette } from '../../composables/useCommandPalette.js';
import { useFinanceStore } from '../../stores/finance.js';

const route = useRoute();
const store = useFinanceStore();
const { bindShortcut } = useCommandPalette();

const sidebarOpen = computed(() => store.sidebarOpen);

onMounted(() => {
  const unbind = bindShortcut();
  onBeforeUnmount(unbind);
});

watch(
  () => route.fullPath,
  () => store.setSidebarOpen(false),
);

watch(sidebarOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : '';
});

onBeforeUnmount(() => {
  document.body.style.overflow = '';
});
</script>

<template>
  <div class="mint-shell">
    <a class="mint-skip" href="#mint-main">Skip to content</a>
    <AppSidebar />
    <button
      v-if="sidebarOpen"
      type="button"
      class="mint-backdrop"
      aria-label="Close navigation"
      @click="store.setSidebarOpen(false)"
    />
    <div class="mint-frame">
      <AppHeader />
      <main id="mint-main" class="mint-main">
        <router-view />
      </main>
    </div>
    <CommandPalette />
    <ExpenseComposer />
  </div>
</template>
