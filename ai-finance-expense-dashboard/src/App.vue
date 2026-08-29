<script setup>
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { EdsThemeProvider, ToastProvider } from '@poluru-labs/enterprise-design-system-vue';

const router = useRouter();
const route = useRoute();

const navLinks = [
  { path: '/', name: 'Overview', icon: 'graph-up' },
  { path: '/expenses', name: 'Expenses', icon: 'receipt' },
  { path: '/invoices', name: 'Invoices', icon: 'file-text' },
  { path: '/budgets', name: 'Budgets', icon: 'percent' },
  { path: '/analytics', name: 'Analytics', icon: 'bar-chart' },
];

const isActive = (path) => route.path === path;

function navigate(path) {
  router.push(path);
}
</script>

<template>
  <EdsThemeProvider default-theme="light">
    <ToastProvider>
      <div class="app-container">
        <!-- Sticky Header -->
        <header class="sticky-header">
          <div class="header-content">
            <div class="header-logo">
              <i class="bi bi-cash-stack"></i>
              <span class="logo-text">AI Finance</span>
            </div>
            <nav class="header-nav">
              <a
                v-for="link in navLinks"
                :key="link.path"
                class="nav-link"
                :class="{ active: isActive(link.path) }"
                @click.prevent="navigate(link.path)"
                href="#"
              >
                <i :class="`bi bi-${link.icon}`"></i>
                {{ link.name }}
              </a>
            </nav>
            <div class="header-actions">
              <button class="action-btn" title="Settings">
                <i class="bi bi-gear"></i>
              </button>
              <div class="user-avatar">P</div>
            </div>
          </div>
        </header>

        <div class="main-layout">
          <!-- Simple Sidebar -->
          <aside class="sidebar">
            <div class="sidebar-content">
              <div class="sidebar-section">
                <p class="sidebar-label">Navigation</p>
                <a
                  v-for="link in navLinks"
                  :key="link.path"
                  class="sidebar-link"
                  :class="{ active: isActive(link.path) }"
                  @click.prevent="navigate(link.path)"
                  href="#"
                >
                  <i :class="`bi bi-${link.icon}`"></i>
                  {{ link.name }}
                </a>
              </div>
            </div>
          </aside>

          <!-- Main Content -->
          <main class="main-content">
            <router-view />
          </main>
        </div>
      </div>
    </ToastProvider>
  </EdsThemeProvider>
</template>
