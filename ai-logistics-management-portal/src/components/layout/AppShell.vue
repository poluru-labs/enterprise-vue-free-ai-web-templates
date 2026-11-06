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
  <div class="wy-shell">
    <AppSidebar :open="navOpen" @navigate="navOpen = false" />
    <button
      v-if="navOpen"
      type="button"
      class="wy-backdrop"
      aria-label="Close navigation"
      @click="navOpen = false"
    />
    <div class="wy-main">
      <div class="wy-topbar">
        <button type="button" class="wy-menu" @click="navOpen = !navOpen">
          <VisuallyHidden>{{ navOpen ? 'Close navigation' : 'Open navigation' }}</VisuallyHidden>
          <span aria-hidden="true">Menu</span>
        </button>
        <p>Waybill</p>
      </div>
      <div class="wy-page">
        <main id="main">
          <router-view />
        </main>
        <AppFooter />
      </div>
    </div>
  </div>
</template>
