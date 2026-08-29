<script setup>
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { EdsThemeProvider, ToastProvider } from '@poluru-labs/enterprise-design-system-vue';

const router = useRouter();
const route = useRoute();

const navLinks = [
  { path: '/', name: 'Overview', icon: 'graph-up' },
  { path: '/tenants', name: 'Tenants', icon: 'building' },
  { path: '/members', name: 'Members', icon: 'people' },
  { path: '/flags', name: 'Flags', icon: 'flag' },
  { path: '/settings', name: 'Settings', icon: 'gear' },
];

const isActive = (path) => route.path === path;

function navigate(path) {
  router.push(path);
}
</script>

<template>
  <EdsThemeProvider default-theme="light">
    <ToastProvider>
      <div class="shell">
        <aside class="sidebar">
          <a class="brand" href="/">
            <i class="bi bi-grid-1x2" aria-hidden="true"></i>
            <strong>AI Admin</strong>
          </a>
          <nav class="side-nav" aria-label="Primary">
            <a
              v-for="link in navLinks"
              :key="link.path"
              class="side-link"
              :class="{ 'is-active': isActive(link.path) }"
              @click.prevent="navigate(link.path)"
              href="#"
            >
              <i :class="`bi bi-${link.icon}`" aria-hidden="true"></i>
              {{ link.name }}
            </a>
          </nav>
          <div class="sidebar-footer">
            <hr class="divider" />
            <div class="user-info">
              <div class="user-avatar">A</div>
              <div class="user-details">
                <p class="user-name">Admin User</p>
                <p class="user-email">admin@example.com</p>
              </div>
            </div>
          </div>
        </aside>
        <main class="main">
          <router-view />
        </main>
      </div>
    </ToastProvider>
  </EdsThemeProvider>
</template>
