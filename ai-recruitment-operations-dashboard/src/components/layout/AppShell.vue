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
  <div class="hw-shell">
    <AppSidebar :open="navOpen" @navigate="navOpen = false" />
    <button
      v-if="navOpen"
      type="button"
      class="hw-backdrop"
      aria-label="Close navigation"
      @click="navOpen = false"
    />
    <div class="hw-main">
      <div class="hw-topbar">
        <button type="button" class="hw-menu" @click="navOpen = !navOpen">
          <VisuallyHidden>{{ navOpen ? 'Close navigation' : 'Open navigation' }}</VisuallyHidden>
          <span aria-hidden="true">Menu</span>
        </button>
        <p>Hirewell</p>
      </div>
      <div class="hw-page">
        <main id="main">
          <router-view />
        </main>
        <AppFooter />
      </div>
    </div>
  </div>
</template>
