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
  <div class="nl-shell" :class="{ 'is-nav-open': navOpen }">
    <AppSidebar :open="navOpen" @navigate="navOpen = false" />
    <button
      v-if="navOpen"
      type="button"
      class="nl-backdrop"
      aria-label="Close navigation"
      @click="navOpen = false"
    />
    <div class="nl-main">
      <div class="nl-topbar">
        <button type="button" class="nl-menu" @click="navOpen = !navOpen">
          <VisuallyHidden>{{ navOpen ? 'Close navigation' : 'Open navigation' }}</VisuallyHidden>
          <span aria-hidden="true">Menu</span>
        </button>
        <p>Northline</p>
      </div>
      <main id="main" class="nl-content">
        <router-view />
      </main>
      <AppFooter />
    </div>
  </div>
</template>
