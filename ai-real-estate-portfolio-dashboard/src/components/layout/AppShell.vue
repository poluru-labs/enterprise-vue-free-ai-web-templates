<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { VisuallyHidden } from '@poluru-labs/enterprise-design-system-vue'
import AppFooter from './AppFooter.vue'
import AppSidebar from './AppSidebar.vue'

const route = useRoute()
const navOpen = ref(false)

watch(
  () => route.path,
  () => {
    navOpen.value = false
  },
)
</script>

<template>
  <div class="lw-shell">
    <AppSidebar :open="navOpen" @navigate="navOpen = false" />
    <button
      v-if="navOpen"
      type="button"
      class="lw-backdrop"
      aria-label="Close navigation"
      @click="navOpen = false"
    />
    <div class="lw-main">
      <div class="lw-topbar">
        <button type="button" class="lw-menu" @click="navOpen = !navOpen">
          <VisuallyHidden>{{ navOpen ? 'Close navigation' : 'Open navigation' }}</VisuallyHidden>
          <span aria-hidden="true">Menu</span>
        </button>
        <p>Lotwell</p>
      </div>
      <div class="lw-page">
        <main id="main">
          <router-view />
        </main>
        <AppFooter />
      </div>
    </div>
  </div>
</template>
